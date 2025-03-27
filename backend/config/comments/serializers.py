from rest_framework import serializers
from .models import Comment

class CommentSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'user_name', 'email', 'home_page', 'text', 'created_at', 'parent', 'replies']
        
    
    def get_replies(self, obj):
        # Рекурсивно сериализуем все ответы
        return CommentSerializer(obj.replies.all(), many=True).data
 
       