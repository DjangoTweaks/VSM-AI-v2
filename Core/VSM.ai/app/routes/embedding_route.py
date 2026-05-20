from fastapi import APIRouter, UploadFile, HTTPException, status
from app.service import EmbeddingService
from app.qDrant import QdrantDep

router = APIRouter(
    tags=["Speaker Embedding"],
    prefix="/voice-embeddings"
)

@router.post("/search")
async def search_voice_embeddings(
    file: UploadFile,
    q_client: QdrantDep):

    embed_inst = EmbeddingService(file, q_client)
    res = await embed_inst.verify_voice()

    if res: 
        return res
    
    raise HTTPException(status_code= status.HTTP_404_NOT_FOUND,
                        detail="Not found") 


@router.post("/insert")
async def create_voice_embeddings(
    file: UploadFile,
    q_client: QdrantDep):

    embed_inst = EmbeddingService(file,q_client)
    res = await embed_inst.register_voice()

    if res: 
        return res
    
    raise HTTPException(status_code= status.HTTP_422_UNPROCESSABLE_CONTENT,
                        detail="Audio file cannot be processed") 