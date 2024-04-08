from flask import Flask, request
from dotenv import load_dotenv
import os
from services.anthropic_service import Anthropic_Service

load_dotenv()

app = Flask(__name__)

isDebug = os.getenv('FLASK_ENV') == 'development'

@app.route("/<name>", methods=['POST'])
def time_from_image(name):
  body = request.get_json()

  model = Anthropic_Service()
  answer = model.query_to_vision(body['b64'], body['media_type'], body['user_alias'])

  return answer

if(__name__ == '__main__'):
  app.run(debug=isDebug, host='0.0.0.0', port=5000)