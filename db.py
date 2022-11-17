from pymongo import MongoClient
import certifi
from dotenv import load_dotenv
import os

ca = certifi.where()

load_dotenv()
DB = os.getenv('DB')
client = MongoClient(DB, tlsCAFile=certifi.where())

db = client.hhluxury1

print("success")

# doc = {'username':'username',
#        'item_id': 1,
#        'imgUrl':'http://brunt.godohosting.com/gd5replace/bruntco2/data/assets/images/visuals/collectionb/brands/artemide/1000020407/2.jpg',
#        'start_date': '2022-02-01',
#        'installment_period': 24}
#
# db.test.insert_one(doc)