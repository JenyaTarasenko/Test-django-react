from django.shortcuts import render,redirect
from .models import Comment
from .forms import CommentForm
from .serializers import CommentSerializer
from rest_framework import generics
    
class CommentListCreate(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    
    