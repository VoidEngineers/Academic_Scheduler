import json
import redis

class CacheManager:
    def __init__(self, host='localhost', port=6379, db=0):
        self.redis_client = redis.Redis(host=host, port=port, db=db)
        self.expiry_time = 3600  # 1 hour cache expiry
    
    def update_cache(self, schedule_id, data):
        self.redis_client.setex(
            f'schedule:{schedule_id}',
            self.expiry_time,
            json.dumps(data)
        )
    
    def get_cached_data(self, schedule_id):
        cached = self.redis_client.get(f'schedule:{schedule_id}')
        if cached:
            return json.loads(cached)
        return None