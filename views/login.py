from flask import Blueprint, render_template, request, jsonify, url_for, redirect
from pymongo import MongoClient
import hashlib
import datetime
import jwt
import certifi

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

client = MongoClient('mongodb+srv://Luxury:hanghae99@luxury.uhfyrvo.mongodb.net/Luxury?retryWrites=true&w=majority')
db = client.Luxury

SECRET_KEY = 'SPARTA'

login = Blueprint("login", __name__, template_folder="templates")

@login.route('/login')
def index():
    return render_template('login.html')


@login.route('/register')
def register():
    return render_template('register.html')

@login.route("/login/api/tklogin", methods=["POST"])
def api_login():
    id_receive = request.form['id_give']
    pw_receive = request.form['pw_give']

    # 회원가입 때와 같은 방법으로 PW를 암호화
    pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()

    # id, 암호화 된 pw를 가지고 해당 유저를 찾는다.
    result = db.user.find_one({'id': id_receive, 'pwd': pw_hash})

    # 찾으면 JWT 토큰을 만들어 발급
    if result is not None:

        payload = {
            'id': id_receive,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=5)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        # token을 준다.
        return jsonify({'result': 'success', 'token': token})
    # 찾지 못하면
    else:
        return jsonify({'result': 'fail', 'msg': '아이디/비밀번호가 일치하지 않습니다.'})


@login.route('/login/api/id', methods=['GET'])
def api_valid():
    token_receive = request.cookies.get('mytoken')

    try:
        # token을 시크릿키로 디코딩합니다.
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])

        userinfo = db.user.find_one({'id': payload['id']}, {'_id': 0})
        return jsonify({'result': 'success', 'user_id': userinfo['id']})
    except jwt.ExpiredSignatureError:
        # 위를 실행했는데 만료시간이 지났으면 에러가 납니다.
        return jsonify({'result': 'fail', 'msg': '로그인 시간이 만료되었습니다.'})
    except jwt.exceptions.DecodeError:
        return jsonify({'result': 'fail', 'msg': '로그인 정보가 존재하지 않습니다.'})

@login.route('/')
def home():
    token_receive = request.cookies.get('mytoken')

    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])

        user_info = db.user.find_one({"id": payload['id']})
        return render_template('mainpage.html', ID=user_info["id"])
    except jwt.ExpiredSignatureError:
        return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))


