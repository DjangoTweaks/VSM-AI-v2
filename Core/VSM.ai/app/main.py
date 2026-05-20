from fastapi import FastAPI
from app.routes import (
    embedding_route,
    telephony_route
)
from app.qDrant import lifespan

app = FastAPI(debug= True,lifespan=lifespan)

@app.get("/health",tags=["Health check"])
def health():
    return {"message": "Hello World"}


app.include_router(embedding_route.router)
app.include_router(telephony_route.router)

import os
import warnings

warnings.filterwarnings("ignore", category=FutureWarning)
warnings.filterwarnings("ignore", message=".*weights_only=False.*")

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3" 