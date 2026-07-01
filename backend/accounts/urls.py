from django.urls import path
from .views import (
    AccountListCreateView,
    AccountDetailView,
    AccountLoginView,
    AccountLogoutView,
)

urlpatterns = [
    path('', AccountListCreateView.as_view(), name='account-list-create'),
    path('<int:pk>/', AccountDetailView.as_view(), name='account-detail'),
    path('login/', AccountLoginView.as_view(), name='account-login'),
    path('logout/', AccountLogoutView.as_view(), name='account-logout'),
]