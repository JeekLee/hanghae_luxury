from flask import Blueprint, render_template, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
import certifi


ca = certifi.where()

client = MongoClient('mongodb+srv://Luxury:hanghae99@luxury.uhfyrvo.mongodb.net/Luxury?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.Luxury

mainpage = Blueprint("mainpage", __name__, template_folder="templates")

@mainpage.route('/')
def question():
    return render_template("mainpage.html")

@mainpage.route("/getitems", methods=["GET"])
def all_items_get():
    items = list(db.items.find({}))
    for i in items:
        i['_id'] = str(i['_id'])

    return jsonify({'items': items})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)

