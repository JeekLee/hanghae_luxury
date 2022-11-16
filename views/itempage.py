from flask import Blueprint, render_template, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
import certifi
from flask_jwt_extended import get_jwt_identity, jwt_required


client = MongoClient("mongodb+srv://admin:admin@cluster0.uuxjj5e.mongodb.net/?retryWrites=true&w=majority", tlsCAFile=certifi.where())
db = client.Luxury
itempage = Blueprint("itempage", __name__, template_folder="templates", url_prefix="/itempage")

# Global Variables
global tmp
global user
user = "test01"

@itempage.route('/')
def index():
    global tmp
    global user
    tmp = request.args.get('item')
    return render_template('itempage.html')

@itempage.route('/getitem', methods=["GET"])
def pass_item() :
    global tmp
    item = db.item.find_one({'_id':ObjectId(tmp)}, {'_id':False})
    return jsonify(item)

@itempage.route('/getitemlist', methods=["GET"])
def pass_item_list() :
    item_list = list(db.item.find({'user':user}, {'_id':True}))
    for i in item_list:
        i['_id'] = str(i['_id'])
    return jsonify(item_list)

@itempage.route("/complete", methods=["POST"])
def get_item():
    db.item.update_one({'_id':ObjectId(tmp)}, {'$set': {'complete':True}})
    return jsonify({'msg': '이제 내꺼다!'})

@itempage.route("/delete", methods=["POST"])
def del_item():
    db.item.delete_one({'_id':ObjectId(tmp)})
    return jsonify({'msg': '삭제 완료!'})
