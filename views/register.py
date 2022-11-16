from flask import Blueprint, render_template, request, jsonify
from pymongo import MongoClient
import hashlib

client = MongoClient('mongodb+srv://Luxury:hanghae99@luxury.uhfyrvo.mongodb.net/Luxury?retryWrites=true&w=majority')
db = client.Luxury

register = Blueprint("register", __name__, template_folder="templates")

@register.route('/')
def read_register():
    return render_template('register.html')

# 아이디 중복확인 (DB에서 확인)
@register.route("/check", methods=["GET"])
def check_id():
    user_id = request.args.get('id')
    print(user_id)

    result = db.user.find_one({'id': user_id})
    print(result)
    print(type(result))
    print(result == None)

    if (result == None):
        doc = {"message": "사용 가능한 아이디 입니다.", "success": True}
    else:
        doc = {"message": "이미 사용 중인 아이디 입니다.", "success": False}

    return jsonify(doc)

# 회원가입 API
@register.route("/apiregi", methods=["POST"])
def api_register():
    id_receive = request.form['id_give']
    pw_receive = request.form['pw_give']

    user = db.user.find_one({'id': id_receive})

    if(user):
        return jsonify({"message": "다시 시도 해 주세요."})

    else:
        pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()

        # DB 저장
        db.user.insert_one({'id': id_receive, 'pwd': pw_hash})

    return jsonify({"message": "회원가입 성공!"})

