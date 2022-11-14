from flask import Blueprint, render_template
from pymongo import MongoClient

client = MongoClient('mongodb+srv://Luxury:hanghae99@luxury.uhfyrvo.mongodb.net/Luxury?retryWrites=true&w=majority')
db = client.Luxury

register = Blueprint("register", __name__, template_folder="templates")