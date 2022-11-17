from datetime import datetime
from flask import Blueprint, Flask, render_template, request, jsonify, url_for, redirect

from db import db
from dotenv import load_dotenv
import os
from pymongo import MongoClient
import requests
from bs4 import BeautifulSoup
import certifi
from bson.objectid import ObjectId
import jwt

addpage = Blueprint("addpage", __name__, template_folder="templates")


@addpage.route('/')
def home():
    return render_template('addpage.html')


@addpage.route('/url', methods=["POST"])
def get_url():
    token_receive = request.cookies.get('mytoken')
    url_receive = request.form.get('url_give')

    try:
        payload = jwt.decode(token_receive, os.getenv(
            'SECRET_KEY'), algorithms=['HS256'])
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
        data = requests.get(url_receive, headers=headers)

        soup = BeautifulSoup(data.text, 'html.parser')

        price = soup.select_one(
            '#content > div > div._2-I30XS1lA > div._2QCa6wHHPy > fieldset > div._1ziwSSdAv8 > div.WrkQhIlUY0 > div > strong > span._1LY7DqCnwR').text
        title = soup.select_one('meta[property="og:title"]')['content']
        image = soup.select_one('meta[property="og:image"]')['content']

        return jsonify({"result": "success", 'data': {'title': title,
                                                      'image': image,
                                                      'price': price}})
    except jwt.ExpiredSignatureError:
        return jsonify({'result': 'fail', 'msg': '로그인 시간이 만료되었습니다.'})
    except jwt.exceptions.DecodeError:
        return jsonify({'result': 'fail', 'msg': '로그인 정보가 존재하지 않습니다.'})


@addpage.route('/adding', methods=["POST"])
def item_post():
    token_receive = request.cookies.get('mytoken')
    print(token_receive)
    img_receive = request.form.get('img_give')
    title_receive = request.form.get('title_give')
    price_receive = int(request.form.get('price_give'))
    date_receive = datetime.strptime(request.form.get('date_give'), '%Y-%m-%d')
    months_receive = request.form.get('months_give')
    try:
        # token을 시크릿키로 디코딩합니다.
        # 보실 수 있도록 payload를 print 해두었습니다. 우리가 로그인 시 넣은 그 payload와 같은 것이 나옵니다.
        payload = jwt.decode(token_receive, os.getenv(
            'SECRET_KEY'), algorithms=['HS256'])
        print(payload)
        doc = {'userid': payload['id'],
               'title': title_receive,
               'image': img_receive,
               'price': price_receive,
               'date': date_receive,
               'months': months_receive,
               'complete': False
               }
        print(doc)
        db.items.insert_one(doc)
        return jsonify({'result': "success"})
    except jwt.ExpiredSignatureError:
        # 위를 실행했는데 만료시간이 지났으면 에러가 납니다.
        return jsonify({'result': 'fail', 'msg': '로그인 시간이 만료되었습니다.'})
    except jwt.exceptions.DecodeError:
        return jsonify({'result': 'fail', 'msg': '로그인 정보가 존재하지 않습니다.'})
