from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Post
from .serializers import PostSerializer, RegisterSerializer
from .permissions import IsAuthorOrReadOnly
from rest_framework.permissions import AllowAny

# List all posts or create a new post
class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthorOrReadOnly]

    def perform_create(self, serializer):
        # Automatically set the author as the current authenticated user
        serializer.save(author=self.request.user)

# Retrieve, update, or delete a post
class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthorOrReadOnly]


# Register a new user
class RegisterUserView(generics.CreateAPIView):
    """
    Register a new user and return JWT tokens.
    """
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request):
        # Use the serializer to validate and create the user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Generate JWT tokens for the new user
        refresh = RefreshToken.for_user(user)
        
        # Customize the response to include the tokens
        response_data = {
            'user': serializer.data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

        return Response(response_data, status=status.HTTP_201_CREATED)