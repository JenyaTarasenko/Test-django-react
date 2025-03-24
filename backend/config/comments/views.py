from django.shortcuts import render,redirect
from .models import Comment
from .forms import CommentForm



def comments_firsrt(request):
    comments = Comment.objects.filter(parent__isnull=True).order_by('-created_at')
    form = CommentForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        form.save()
        return redirect('comments:index')
    return render(request, 'index.html', {'comments': comments, 'form': form})
    
