from django.urls import path
from django.conf import settings
from . import views
from django.conf.urls.static import static
from django.views.generic import TemplateView #для статических страничек сайта

app_name = 'comments'

urlpatterns = [
    path('', views.comments_firsrt, name="index"),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 