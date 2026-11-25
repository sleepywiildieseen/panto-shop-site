from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


def build_response(user):
    refresh = RefreshToken.for_user(user)
    return {
        "token": str(refresh.access_token),
        "user": {
            "id": user.id,
            "email": user.email,
            "firstName": user.firstName or user.username,
        },
    }


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        email = (data.get("email") or "").strip().lower()
        password = data.get("password") or ""
        first_name = (data.get("firstName") or "").strip()

        if not email or not password or not first_name:
            return Response({"error": "All fields are required"}, status=400)

        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=400)

        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            firstName=first_name,
        )
        return Response(build_response(user))


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = (request.data.get("email") or "").strip().lower()
        password = request.data.get("password") or ""

        if not email or not password:
            return Response({"error": "All fields are required"}, status=400)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "Invalid credentials"}, status=401)

        if not user.check_password(password):
            return Response({"error": "Invalid credentials"}, status=401)

        return Response(build_response(user))