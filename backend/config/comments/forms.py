from django import forms
from .models import Comment

class CommentForm(forms.ModelForm):
    
    class Meta:
        model = Comment
        fields = ['user_name', 'email', 'home_page', 'text', 'parent']
        widgets = {
            'parent': forms.HiddenInput()  # Скрытое поле для ответов на комментарии
        }