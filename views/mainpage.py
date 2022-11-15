from flask import Blueprint, render_template
from pymongo import MongoClient

client = MongoClient('mongodb+srv://Luxury:hanghae99@luxury.uhfyrvo.mongodb.net/Luxury?retryWrites=true&w=majority')
db = client.Luxury

mainpage = Blueprint("mainpage", __name__, template_folder="templates")

@mainpage.route('/')
def question():
    return render_template("mainpage.html")