from django import forms
from .models import Comment
from captcha.fields import CaptchaField

class CommentForm(forms.ModelForm):
    captcha = CaptchaField()
    
    class Meta:
        model = Comment
        fields = ['user_name', 'email', 'home_page', 'text', 'parent', 'captcha']
        widgets = {
            'parent': forms.HiddenInput()  # Скрытое поле для ответов на комментарии
        }