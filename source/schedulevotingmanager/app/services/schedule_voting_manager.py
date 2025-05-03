import uuid
from app.services.mongoDBconfig import DatabaseManager
from app.services.cache_manager import CacheManager

class ScheduleVotingManager:
    def __init__(self):
        self.db_manager = DatabaseManager()
        self.cache_manager = CacheManager()
    
    def get_all_schedules(self):
        return self.db_manager.get_all_schedules()
    
    def vote_for_schedule(self, user_id, schedule_id):
        success = self.db_manager.add_vote(user_id, schedule_id)
        if success:
            cache_data = self._update_schedule_cache(schedule_id)
            return True, cache_data
        return False, None
    
    def like_schedule(self, user_id, schedule_id):
        success = self.db_manager.add_like(user_id, schedule_id)
        if success:
            cache_data = self._update_schedule_cache(schedule_id)
            return True, cache_data
        return False, None
    
    def dislike_schedule(self, user_id, schedule_id):
        success = self.db_manager.add_dislike(user_id, schedule_id)
        if success:
            cache_data = self._update_schedule_cache(schedule_id)
            return True, cache_data
        return False, None
    
    def add_comment(self, user_id, schedule_id, comment_text):
        comment_id = str(uuid.uuid4())
        self.db_manager.add_comment(comment_id, user_id, schedule_id, comment_text)
        cache_data = self._update_schedule_cache(schedule_id)
        return cache_data
    
    def get_schedule_data(self, schedule_id):
        cached_data = self.cache_manager.get_cached_data(schedule_id)
        if cached_data:
            return cached_data
        return self._update_schedule_cache(schedule_id)
    
    def _update_schedule_cache(self, schedule_id):
        vote_count = self.db_manager.get_vote_count(schedule_id)
        like_count = self.db_manager.get_like_count(schedule_id)
        dislike_count = self.db_manager.get_dislike_count(schedule_id)
        comments = self.db_manager.get_comments(schedule_id)
        
        cache_data = {
            'votes': vote_count,
            'likes': like_count,
            'dislikes': dislike_count,
            'comments': comments
        }
        self.cache_manager.update_cache(schedule_id, cache_data)
        return cache_data