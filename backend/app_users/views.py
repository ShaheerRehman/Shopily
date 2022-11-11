from rest_framework import views, response
from django.contrib.auth import get_user_model
from rest_framework import permissions
from custom_auth.serializers import UserSerializer



class GetUsers(views.APIView):
    permission_classes = [permissions.IsAdminUser]
    def get(self, request):
        users = get_user_model().objects.all()
        serializer = UserSerializer(users, many=True)
        return response.Response(serializer.data)

class GetProfile(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        user = request.user
        serializer = UserSerializer(user, many=False)
        return response.Response(serializer.data)

