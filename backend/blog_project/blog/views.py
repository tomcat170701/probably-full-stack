from rest_framework import generics
from .models import Post
from .serializers import PostSerializer

# List all posts or create a new post
class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

# Retrieve, update, or delete a post
class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

