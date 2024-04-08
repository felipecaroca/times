from flask import Flask, request
from dotenv import load_dotenv
from flask_basicauth import BasicAuth
import os
from services.anthropic_service import Anthropic_Service

load_dotenv()

app = Flask(__name__)

isDebug = os.getenv('FLASK_ENV') == 'development'

app.config['BASIC_AUTH_USERNAME'] = os.getenv('BASIC_USER_NAME')
app.config['BASIC_AUTH_PASSWORD'] = os.getenv('BASIC_USER_PASS')


basic_auth = BasicAuth(app)

@app.route("/")
def home():
  return "it works!"

@app.route("/<name>", methods=['POST'])
@basic_auth.required
def time_from_image(name):
  body = request.get_json()

  model = Anthropic_Service()
  answer = model.query_to_vision(body['b64'], body['media_type'], body['user_alias'])

  return answer

if(__name__ == '__main__'):
  app.run(debug=isDebug, host='0.0.0.0', port=5000)