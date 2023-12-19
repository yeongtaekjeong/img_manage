from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from kaid.views import system_views
from django.urls import re_path as url

urlpatterns = [
    # system_views.py
    path('', system_views.index, name='index'),
    path('alert/', system_views.alert),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# urlpatterns.append(url(r'^media/(?P<path>.*)/$', serve, kwargs={'insecure': True}))
# urlpatterns.append(url(r'^static/(?P<path>.*)/$', serve, kwargs={'insecure': True}))
