from aredis_om import get_redis_connection, HashModel
from datetime import datetime


redis = get_redis_connection(
    host="redis-15108.c299.asia-northeast1-1.gce.cloud.redislabs.com",
    port=15108,
    password="EzeYA5jIgb9UgeSxGv7acfdmy3kqiQqg",
    decode_responses=True
)

class Todo(HashModel):
    title: str
    description: str
    completed: bool
    time: str

    class Meta:
        database = redis



