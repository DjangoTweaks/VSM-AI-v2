import os 
import shutil
from app.utility.speechbrain_embeddings import get_single_speechbrain_embedding
from app.utility.qdrant_db import qDrantDatabase
import os 
from qdrant_client import QdrantClient
import anyio


RECORDINGS_DIR = "temp_recordings"
os.makedirs(RECORDINGS_DIR, exist_ok=True)

class EmbeddingService:

    def __init__(self, file, db: QdrantClient):
        self.file = file
        self.db = db

    async def _processing_audio(self):
        should_delete = False

        if hasattr(self.file, "filename") and hasattr(self.file, "file"):
            file_location = f"{RECORDINGS_DIR}/{self.file.filename}"

            with open(file_location, "wb+") as file_object:
                shutil.copyfileobj(self.file.file, file_object)

            should_delete = True

        elif isinstance(self.file, str):
            file_location = self.file
            should_delete = True

        else:
            print(f"Unsupported file type: {type(self.file)}")
            return None

        try:
            res = await anyio.to_thread.run_sync(get_single_speechbrain_embedding, file_location)
            return res
        finally:
            if should_delete and os.path.exists(file_location):
                os.remove(file_location)
        

    async def register_voice(self):
        data = self._processing_audio()

        if data is not None:
            dbWrapper = qDrantDatabase(self.db)
            return await dbWrapper.insert_embeds(data)
        return None
    

    async def verify_voice(self):
        data = self._processing_audio()

        if data is not None:
            dbWrapper = qDrantDatabase(self.db)
            return await dbWrapper.search_embeds(data)
        return None