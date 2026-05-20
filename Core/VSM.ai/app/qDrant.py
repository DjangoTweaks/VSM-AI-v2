from qdrant_client import AsyncQdrantClient
from qdrant_client.http.models import Distance, VectorParams
import app.settings as settings
from fastapi import FastAPI, Depends
from typing import Annotated
from contextlib import asynccontextmanager


client = AsyncQdrantClient(url=settings.QDRANT_URL, api_key=settings.QDRANT_TOKEN)

async def create_collections():
    COLLECTION_NAME = "voice_notes"
    EMBEDDING_DIM = 512 


    if not await client.collection_exists(collection_name=COLLECTION_NAME):
        await client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(size=EMBEDDING_DIM, distance=Distance.COSINE),
        )

async def get_qdrant_client():
    return client

QdrantDep = Annotated[AsyncQdrantClient, Depends(get_qdrant_client)]

@asynccontextmanager
async def lifespan(app:FastAPI):
    await create_collections()
    print("qDrant vector database has been loaded")

    yield 
    print("Closing resources")