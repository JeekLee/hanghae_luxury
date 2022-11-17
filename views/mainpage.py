from flask import Blueprint, render_template, request, jsonify

from db import db
from dotenv import load_dotenv
import os
import certifi
import jwt

ca = certifi.where()

mainpage = Blueprint("mainpage", __name__, template_folder="templates")

global user
global tmp


@mainpage.route('/')
def question():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, os.getenv('SECRET_KEY'), algorithms=['HS256'])
        print(payload)
        return render_template("mainpage.html")

    except jwt.ExpiredSignatureError:
        print("Token Expired")
        return redirect(url_for('login.index', status="expired_token"))
    except jwt.exceptions.DecodeError:
        print("Token decoding failed")
        return redirect(url_for('login.index', status="invalid_token"))


@mainpage.route("/getitems", methods=["GET"])
def all_items_get():
    token_receive = request.cookies.get('mytoken')
    payload = jwt.decode(token_receive, os.getenv('SECRET_KEY'), algorithms=['HS256'])
    print(payload)

    items = list(db.items.find({'userid': payload['id']}))
    for i in items:
        i['_id'] = str(i['_id'])
    return jsonify({'result': 'success', 'items': items})
