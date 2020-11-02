from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path('accounts/', include('accounts.urls')),
    path('api/', include('api.urls')),
    path('superadmin/', admin.site.urls),
    re_path(r'^home/',
            TemplateView.as_view(template_name='frontend/index.html')),
    path('', TemplateView.as_view(template_name='frontend/index.html')),
]
urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL,
                      document_root=settings.MEDIA_ROOT)
