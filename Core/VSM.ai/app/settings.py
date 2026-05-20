import os
from dotenv import load_dotenv

load_dotenv()

QDRANT_TOKEN = os.getenv("QDRANT_TOKEN")
QDRANT_URL = os.getenv("QDRANT_URL")
HUGGING_FACE = os.getenv("HUGGING_FACE")
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_NUMBER = os.getenv("TWILIO_NUMBER")
AGENT = os.getenv("AGENT")
DOMAIN = os.getenv("DOMAIN")