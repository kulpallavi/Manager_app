from django.http.response import JsonResponse,HttpResponse
from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.http import Http404
from datetime import datetime,timedelta

from django.views.generic.list import ListView
from .models import SubscriptionPlan,UserSubscription


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework import mixins
from rest_framework import generics

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


from .serializers import (SubscriptionPlanSerializer,
                        UserSerializer,UserSerializerWithToken,
                        UserSubscriptionSerializer)

User = get_user_model()



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    To Create new token for login
    """

    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterUser(APIView):
    """
    To Create a new user
    """
    def post(self, request, format=None):
        data = request.data
        
        try:
            user = User.objects.create(
                first_name=data['name'],
                username=data['email'],
                email=data['email'],
                password=make_password(data['password'])
            )
            serializer = UserSerializerWithToken(user, many=False)
            return Response(serializer.data)
        except:
            message = {'detail': 'User with this email already exists'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


class UserProfile(APIView):
    """
    Get User Profile
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user=request.user
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)


class UserList(APIView):
    """
    Get User List for admin
    """
    permission_classes = [IsAuthenticated,IsAdminUser]

    def get(self, request, format=None):
        users=User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

class UpdateUserProfile(APIView):
    """
    Update User Profile
    """
    permission_classes = [IsAuthenticated]
    
    def put(self, request,format=None):
        user=request.user
        serializer=UserSerializerWithToken(user,many=False)
        data = request.data
        user.first_name = data['name']
        user.username = data['email']
        user.email = data['email']
        

        if data['password'] != '':
            user.password = make_password(data['password'])
            user.save()
            print(data)
            return Response(serializer.data)



class BecomePro(APIView):
    """
    To become Premium user
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):      
        data = request.data
        user = request.user
        plan=SubscriptionPlan.objects.get(name=data['plan'])
        paymentMethod=data['pm']
        price=plan.price
        plan_name=plan.name
        user_details= user.email
        print(data)
        print(user)
        try:
            usersub = UserSubscription.objects.create(
                user = user,
                user_details=user_details,
                plan = plan,
                plan_name=plan_name,
                price=price,
                paymentMethod=paymentMethod
            )

            print(usersub)
            serializer = UserSubscriptionSerializer(usersub, many=False)
            return Response(serializer.data)
        except:
            message = {'detail': 'Subscription with this email already exists'}
            return Response(message,status=status.HTTP_400_BAD_REQUEST)
            

class GetUserSubscription(APIView):

    """
    Get User Subscription
    """

    permission_classes = [IsAuthenticated]

    def get(self, request,pk, format=None):
        user = request.user
        print(user)
        try:
            order =UserSubscription.objects.get(_id=pk)
            print(order)
            print(user.is_staff)
            if user.is_staff or order.user==user:
                serializer = UserSubscriptionSerializer(order, many=False)
                return Response(serializer.data)
            else:
                Response({'detail':'Not authorized to view this order'},
                        status=status.HTTP_400_BAD_REQUEST)
        except:
            Response({'detail':'Order does not exis'},status=status.HTTP_404_NOT_FOUND)

class UpdateSubscriptionToPaid(APIView):
    """
    Update the Subscription to Paid
    """
    permission_classes = [IsAuthenticated]

    def put(self, request,pk, format=None):
        order = UserSubscription.objects.get(_id=pk)
        print(order)
        order.isPaid = True
        order.paidAt = datetime.now()
        order.endDate=datetime.now()+timedelta(30)
        order.save()
        return Response('Order was paid')


# class GetMyOrder(APIView):

#     """
#     Get My Order /Subscription
#     """
#     permission_classes = [IsAuthenticated]
#     def get(self, request,format=None):
#         user = request.user
#         order = UserSubscription.objects.get(user)
#         serializer = UserSubscriptionSerializer(order, many=False)
#         return Response(serializer.data)


class SubscriptionsListView(APIView):
    
    def get(self,request):
        subscriptions=SubscriptionPlan.objects.all()
        serializer = SubscriptionPlanSerializer(subscriptions,many=True)
        return Response(serializer.data)


class SubscriptionView(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, pk):
        try:
            return SubscriptionPlan.objects.get(_id=pk)
        except SubscriptionPlan.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        SubscriptionPlan = self.get_object(pk)
        serializer = SubscriptionPlanSerializer(SubscriptionPlan)
        return Response(serializer.data)







