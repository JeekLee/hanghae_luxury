from flask import Blueprint, render_template, request, jsonify, url_for, redirect
from pymongo import MongoClient
import hashlib
import datetime
import jwt

client = MongoClient('mongodb+srv://Luxury:hanghae99@luxury.uhfyrvo.mongodb.net/Luxury?retryWrites=true&w=majority')
db = client.Luxury

SECRET_KEY = 'SPARTA'

login = Blueprint("login", __name__, template_folder="templates")


@login.route('/home')
def index():
    return render_template('login.html')


@login.route('/register')
def register():
    return render_template('register.html')


@login.route('/')
def home():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.user.find_one({"id": payload['id']})
        return render_template('mainpage.html', ID=user_info["id"])    #메인페이지로
    except jwt.ExpiredSignatureError:
        return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))


@login.route('/api/login', methods=['POST'])
def api_login():
    id_receive = request.form['id_give']
    pw_receive = request.form['pw_give']

    # 회원가입 때와 같은 방법으로 PW를 암호화
    pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()

    # id, 암호화 된 pw를 가지고 해당 유저를 찾는다.
    result = db.user.find_one({'id': id_receive, 'pwd': pw_hash})

    # 찾으면 JWT 토큰을 만들어 발급
    if result is not None:
        # JWT 토큰에는, payload와 시크릿 키가 필요
        # 시크릿키가 있어야 토큰을 디코딩(=인코딩 된 암호 풀기)해서 payload 값을 볼 수 있다.
        # 아래에선 id와 exp를 담는다. 즉 JWT토큰을 풀어 유저 ID 값을 알 수 있다.
        # exp에는 만료 시간을 넣는다. 만료시간이 지나면, 시크릿 키로 토큰을 풀 때 만료되었다고 에러가 난다.
        payload = {
            'id': id_receive,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=15)  #나중에 minute 로 변경
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        # token을 준다.
        return jsonify({'result': 'success', 'token': token})
    # 찾지 못하면
    else:
        return jsonify({'result': 'fail', 'msg': '아이디/비밀번호가 일치하지 않습니다.'})


@login.route('/api/id', methods=['GET'])
def api_valid():
    token_receive = request.cookies.get('mytoken')

    try:
        # token을 시크릿키로 디코딩합니다.
        # 보실 수 있도록 payload를 print 해두었습니다. 우리가 로그인 시 넣은 그 payload와 같은 것이 나옵니다.
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        print(payload)

        # payload 안에 id가 들어있습니다. 이 id로 유저정보를 찾습니다.
        userinfo = db.user.find_one({'id': payload['id']}, {'_id': 0})
        return jsonify({'result': 'success', 'user_id': userinfo['id']})
    except jwt.ExpiredSignatureError:
        # 위를 실행했는데 만료시간이 지났으면 에러가 납니다.
        return jsonify({'result': 'fail', 'msg': '로그인 시간이 만료되었습니다.'})
    except jwt.exceptions.DecodeError:
        return jsonify({'result': 'fail', 'msg': '로그인 정보가 존재하지 않습니다.'})
