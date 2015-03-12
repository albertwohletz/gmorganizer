from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    url(r'^$', 'frontend.views.home', name='home'),
    url(r'^api/create/', 'api.views.create', name='create'),
    url(r'^api/delete/', 'api.views.delete', name='delete'),
    url(r'^admin/', include(admin.site.urls)),
)
