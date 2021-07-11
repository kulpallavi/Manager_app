from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import UserManager

class User(AbstractUser):
    email=models.EmailField(max_length=255, unique=True)
    address=models.CharField(max_length=200,null=True, blank=True)
    company=models.CharField(max_length=200,null=True, blank=True)
    dob=models.DateField(auto_now=False,null=True, blank=True)

    objects=UserManager()

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=[]
    
class SubscriptionPlan(models.Model):  
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True,
                              default='/placeholder.png')
    description = models.CharField(max_length=200, null=True, blank=True)
    is_premium=models.BooleanField(default=False)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    duration=models.IntegerField(null=True, blank=True)
    features = models.TextField(null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name


class UserSubscription(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True,related_name="subscriber")
    plan = models.ForeignKey(SubscriptionPlan, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    user_details= models.CharField(max_length=200, null=True, blank=True)
    plan_name= models.CharField(max_length=200, null=True, blank=True)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    endDate=models.DateTimeField(auto_now_add=False, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return f"{self.user}-{self.plan}"


