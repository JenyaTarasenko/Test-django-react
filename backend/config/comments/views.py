from django.shortcuts import render,redirect
from .models import Comment
from .forms import CommentForm
from .serializers import CommentSerializer
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
    
class CommentListCreate(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    
    
    def get_queryset(self):
        return Comment.objects.filter(parent=None).order_by('-created_at')