from qdrant_client.models import PointStruct
import uuid
from qdrant_client import QdrantClient

class qDrantDatabase:
    def __init__(self, client : QdrantClient):
        self.collection_name = "voice_notes"
        self.client = client

    async def search_embeds(self, final_embeddings):

        try:

            search_result = await self.client.query_points(
                collection_name=self.collection_name,
                query=final_embeddings,
                limit=5,
                with_payload=True
            )
            return search_result

        except Exception as e:
            print(f"An error occurred during Qdrant search: {e}")
            return None

    async def insert_embeds(self, final_embeddings):

        try: 

            id = str(uuid.uuid4())

            await self.client.upsert(
                collection_name=self.collection_name,
                points=[
                    PointStruct(
                        id = id,
                        vector= final_embeddings
                    )
                ]
            )
            return id
        
        except Exception as e:
            print(f"Upsert qDrant: {e}")
            return None
        
