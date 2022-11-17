from flask import Blueprint, render_template, request, jsonify, url_for, redirect
from db import db
from dotenv import load_dotenv
import os
import hashlib
import datetime
import jwt
import certifi

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
        # JWT 토큰에는, payload와 시크릿 키가 필요
        # 시크릿키가 있어야 토큰을 디코딩(=인코딩 된 암호 풀기)해서 payload 값을 볼 수 있다.
        # 아래에선 id와 exp를 담는다. 즉 JWT토큰을 풀어 유저 ID 값을 알 수 있다.
        # exp에는 만료 시간을 넣는다. 만료시간이 지나면, 시크릿 키로 토큰을 풀 때 만료되었다고 에러가 난다.
        payload = {
            'id': id_receive,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=15)  #나중에 minute 로 변경
        }
        token = jwt.encode(payload, os.getenv('SECRET_KEY'), algorithm='HS256')

        # token을 준다.
        return jsonify({'result': 'success', 'token': token})
    # 찾지 못하면
    else:
        return jsonify({'result': 'fail', 'msg': '아이디/비밀번호가 일치하지 않습니다.'})
