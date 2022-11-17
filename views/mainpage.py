from flask import Blueprint, render_template, request, jsonify, redirect,url_for
from db import db
import os
import certifi
import jwt

ca = certifi.where()

mainpage = Blueprint("mainpage", __name__, template_folder="templates")

@mainpage.route('/')
def question():
    return render_template("mainpage.html")

@mainpage.route("/getitems", methods=["GET"])
def all_items_get():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, os.getenv('SECRET_KEY'), algorithms=['HS256'])

        items = list(db.items.find({'userid': payload['id']}))
        for i in items:
            i['_id'] = str(i['_id'])
        print(1)
        return jsonify({'result': 'success', 'items': items})
    except jwt.ExpiredSignatureError:
        # 위를 실행했는데 만료시간이 지났으면 에러가 납니다.
        print(2)
        return jsonify({'result': 'fail', 'msg': "로그인 시간이 만료되었습니다."})
    except jwt.exceptions.DecodeError:
        print(3)
        return jsonify({'result': 'fail', 'msg': "로그인 시간이 만료되었습니다."})


