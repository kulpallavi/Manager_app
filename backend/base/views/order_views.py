from django.http.response import JsonResponse,HttpResponse
from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from django.views.generic.list import ListView
from base.models import SubscriptionPlan,SubscriptionPlanOrder


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated,IsAdminUser

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


from base.serializers import SubscriptionPlanSerializer, UserSerializer, UserSerializerWithToken

class GetOrderDetails(APIView):
    """
    To Create a new user
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        user = request.user
        data = request.data

        subItem  = data['subItem ']

        if subItem and len(subItem) == 0:
            return Response({'detail': 'No Subscription choosen'}, status=status.HTTP_400_BAD_REQUEST)
        else:

            # (1) Create order

            order = SubscriptionPlanOrder.objects.create(
                user=user,
                paymentMethod=data['paymentMethod'],
                price=data['price']
            )

            return Response(order)

            