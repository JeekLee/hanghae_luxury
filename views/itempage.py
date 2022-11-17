from flask import Blueprint, render_template, request, jsonify, redirect, url_for

from db import db
from dotenv import load_dotenv
import os
from bson.objectid import ObjectId
import certifi
import jwt

itempage = Blueprint("itempage", __name__, template_folder="templates", url_prefix="/itempage")

# Global Variables
global tmp
global user

@itempage.route('/')
def index():
    global user
    global tmp

    token_receive = request.cookies.get('mytoken')
    try:
        # get user id from token
        payload = jwt.decode(token_receive, os.getenv('SECRET_KEY'), algorithms=['HS256']) # decode token
        user = payload['id'] # save user id at global variable

        # get item name from url parameter
        tmp = request.args.get('name')
        return render_template('itempage.html')

    except jwt.ExpiredSignatureError:
        print("Token Expired")
        return redirect(url_for('login.index', status="expired_token"))
    except jwt.exceptions.DecodeError:
        print("Token decoding failed")
        return redirect(url_for('login.index', status="invalid_token"))



@itempage.route('/getitem', methods=["GET"])
def pass_item() :
    global tmp
    item = db.items.find_one({'_id':ObjectId(tmp)}, {'_id':False})
    return jsonify(item)

@itempage.route('/getitemlist', methods=["GET"])
def pass_item_list() :
    item_list = list(db.items.find({'userid':user}, {'_id':True}))
    for i in item_list:
        i['_id'] = str(i['_id'])
    return jsonify(item_list)

@itempage.route("/complete", methods=["POST"])
def get_item():
    db.items.update_one({'_id':ObjectId(tmp)}, {'$set': {'complete':True}})
    return jsonify({'msg': '이제 내꺼다!'})

@itempage.route("/delete", methods=["POST"])
def del_item():
    db.items.delete_one({'_id':ObjectId(tmp)})
    return jsonify({'msg': '삭제 완료!'})
