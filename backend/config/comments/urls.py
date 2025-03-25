from django.urls import path
from django.conf import settings
from . import views
from django.conf.urls.static import static


app_name = 'comments'

urlpatterns = [
    path('comments/', views.CommentListCreate.as_view(), name="comment-list")
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 