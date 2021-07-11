from django.contrib import admin
from .models import UserSubscription,SubscriptionPlan
from django.contrib.auth import get_user_model

User = get_user_model()

# Register your models here.
admin.site.register(User),
admin.site.register(SubscriptionPlan),
admin.site.register(UserSubscription)