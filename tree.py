import serial
import ConfigParser
import json
from tweepy import Stream
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener


config = ConfigParser.ConfigParser()
config.read("config.ini")
#ser = serial.Serial(port = "/dev/ttyUSB0", baudrate=57600)
#ser.close()
#ser.open()


class listener(StreamListener):

	def on_data(s,data):
		
		tweet = json.loads(data)
		print tweet["user"]["screen_name"] + ":" + tweet["text"].encode('utf-8').decode('ascii', 'ignore')
		#if (ser.isOpen()):
		#	ser.write(1)	
		return True

	def on_error(s,status):
		print status


auth = OAuthHandler(	config.get('TWITTER', 'ckey'),
						config.get('TWITTER', 'csecret'))
auth.set_access_token(	config.get('TWITTER','atoken'),
						config.get('TWITTER','asecret'))
twitterStream = Stream(auth, listener())
twitterStream.filter(track=["navidad"])
