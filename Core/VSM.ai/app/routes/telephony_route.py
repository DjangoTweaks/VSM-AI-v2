from fastapi import APIRouter, Response, Form
from twilio.twiml.voice_response import VoiceResponse
import httpx
import os 
from app.qDrant import QdrantDep
from app.service import EmbeddingService
from twilio.rest import Client
from app.settings import (TWILIO_ACCOUNT_SID, 
                          TWILIO_AUTH_TOKEN,
                          AGENT,
                          TWILIO_NUMBER,
                          DOMAIN)

router = APIRouter(
    tags=["Twilio Telephony"],
    prefix="/telephony"
)

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)


@router.post("/voice-entry")
async def voice_entry():
    response = VoiceResponse()
    response.say("Connecting you to an agent.", voice='alice')
    
    dial = response.dial(
        record='record-from-answer', 
        recording_track='inbound', 
        recording_status_callback= DOMAIN + '/telephony/recording-callback' ,
        caller_id= TWILIO_NUMBER
    )
    dial.number(AGENT) 
    
    return Response(content=str(response), media_type="application/xml")


@router.post("/recording-callback")
async def recording_callback(RecordingUrl: str = Form(...),
                             CallSid: str = Form(...),
                             q_client: QdrantDep = None):
    
    audio_url = f"{RecordingUrl}"
    SAVE_DIR = "temp_recordings"
    file_path = os.path.join(SAVE_DIR, f"{CallSid}.wav")
    auth = (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
    
    async with httpx.AsyncClient() as client:
        audio_res = await client.get(f"{audio_url}.wav",auth=auth, follow_redirects=True)
        
        if audio_res.status_code == 200:
            with open(file_path,"wb") as f:
                f.write(audio_res .content)
            
            embed_inst = EmbeddingService(file_path, q_client)
            res = await embed_inst.verify_voice()

            if res: 
                print(res)
            
            else:
                print("Not found")
            
            return Response(status_code=200)

        else:
            print(f"Failed to download audio. Status: {audio_res.status_code}")

    return Response(status_code=200)
