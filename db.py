from pymongo import MongoClient
import certifi

ca = certifi.where()

client = MongoClient('mongodb+srv://Luxury:hanghae99@luxury.uhfyrvo.mongodb.net/Luxury?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.Luxury

# doc = {'username':'username',
#        'item_id': 1,
#        'imgUrl':'http://brunt.godohosting.com/gd5replace/bruntco2/data/assets/images/visuals/collectionb/brands/artemide/1000020407/2.jpg',
#        'start_date': '2022-02-01',
#        'installment_period': 24}
#
# db.test.insert_one(doc)