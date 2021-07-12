from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . import views


urlpatterns =[
    path('subscriptions/',views.SubscriptionsListView.as_view(), name='sub-list'),
    path('subscriptions/<str:pk>',views.SubscriptionView.as_view(), name='sub'),

    path('orders/add/', views.BecomePro.as_view(), name='user-sub'),
    path('orders/<str:pk>/', views.GetUserSubscription.as_view(), name='get-sub'),
    path('orders/<str:pk>/pay/', views.UpdateSubscriptionToPaid.as_view(), name='paid-sub'),

    
    path('users/register/', views.RegisterUser.as_view(), name='users-register'),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/profile/', views.UserProfile.as_view(), name='users-profile'),
    path('users/profile/update/', views.UpdateUserProfile.as_view(), name='users-update'),
    path('users/', views.UserList.as_view(), name='users-list'),
]

