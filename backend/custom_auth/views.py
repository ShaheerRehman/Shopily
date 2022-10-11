from rest_framework import views, status, response, permissions
from . import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from django.middleware import csrf
from django.contrib.auth import authenticate
from django.conf import settings


class RegisterView(views.APIView):
    def post(self, request, format=None):
        serializer = serializers.UserCreateSerializer(data=request.data)
        if not serializer.is_valid():
            return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        user = serializer.create(serializer.validated_data)
        user = serializers.UserSerializer(user)
        return response.Response(user.data, status=status.HTTP_201_CREATED)


class RetrieveUserView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, format=None):
        user = request.user
        user = serializers.UserSerializer(user)
        return response.Response(user.data, status=status.HTTP_200_OK)


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class LoginView(views.APIView):
    def post(self, request, format=None):
        data = request.data
        res = response.Response()
        email = data.get('email', None)
        password = data.get('password', None)
        user = authenticate(email=email, password=password)
        if user is not None:
            if user.is_active:
                data = get_tokens_for_user(user)
                res.set_cookie(
                    key=settings.SIMPLE_JWT['AUTH_COOKIE'],
                    value=data["access"],
                    expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                    secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                    httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                    samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
                )
                res.set_cookie(
                    key=settings.SIMPLE_JWT['REFRESH_COOKIE'],
                    value=data["refresh"],
                    expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                    secure=settings.SIMPLE_JWT['REFRESH_COOKIE_SECURE'],
                    httponly=settings.SIMPLE_JWT['REFRESH_COOKIE_HTTP_ONLY'],
                    samesite=settings.SIMPLE_JWT['REFRESH_COOKIE_SAMESITE']
                )
                csrf.get_token(request)
                res.data = {"Success": "Login successfully", "data": data}
                return res
            else:
                return response.Response({"No active": "This account is not active!!"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return response.Response({"Invalid": "Invalid username or password!!"}, status=status.HTTP_404_NOT_FOUND)

# class TokenObtainPairView(TokenViewBase):
#     """
#     Takes a set of user credentials and returns an access and refresh JSON web
#     token pair to prove the authentication of those credentials.
#     """
#
#     _serializer_class = api_settings.TOKEN_OBTAIN_SERIALIZER
#
#
# token_obtain_pair = TokenObtainPairView.as_view()

class LogoutView(views.APIView):
    """Blacklist the refresh token: extract token from the header
      during logout request user and refresh token is provided"""
    def post(self, request, format=None):
        try:
            refresh__token = request.data["refresh_token"]
            token = RefreshToken(refresh__token)
            token.blacklist()
            return response.Response("Successful Logout", status=status.HTTP_200_OK)
        except Exception as e:
            return response.Response(status=status.HTTP_400_BAD_REQUEST)