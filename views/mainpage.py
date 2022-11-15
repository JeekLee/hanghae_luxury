from flask import Blueprint, render_template, jsonify
from pymongo import MongoClient
import certifi
from datetime import date, timedelta

ca = certifi.where()

client = MongoClient('mongodb+srv://Luxury:hanghae99@luxury.uhfyrvo.mongodb.net/Luxury?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.Luxury

mainpage = Blueprint("mainpage", __name__, template_folder="templates")

@mainpage.route('/')
def question():
    return render_template("mainpage.html")

@mainpage.route("/getitems", methods=["GET"])
def all_items_get():
    items = list(db.items.find({}, {'_id': False}))
    return jsonify({'items': items })


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)