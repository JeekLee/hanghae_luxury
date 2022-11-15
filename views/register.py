from flask import Blueprint, render_template, request, jsonify
from pymongo import MongoClient
import hashlib

client = MongoClient('mongodb+srv://Luxury:hanghae99@luxury.uhfyrvo.mongodb.net/Luxury?retryWrites=true&w=majority')
db = client.Luxury

register = Blueprint("register", __name__, template_folder="templates")

@register.route('/')
def register():
    return render_template('register.html')

@register.route("/check", methods=["GET"])
def check_id():
    # 프론트에서 요청: /register/check?id=값
    id = request.args.get('id')
    print(id)

    result = db.user.find_one({'user_id': id})
    print(result)
    print(type(result))
    print(result == None)

    if (result == None):
        doc = {"message": "사용 가능한 아이디 입니다.", "success": True}
    else:
        doc = {"message": "이미 사용 중인 아이디 입니다.", "success": False}

    return jsonify(doc)

# 회원가입 API
@register.route("/", methods=["POST"])
def join():
    id_receive = request.form['id']
    pw_receive = request.form['pwd']

     # 비밀번호 해쉬
    pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()

    # DB 저장
    db.user.insert_one({'id': id_receive, 'pwd': pw_hash})

    return jsonify({"message": "회원가입 성공!"})

