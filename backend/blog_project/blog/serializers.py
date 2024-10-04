from rest_framework import serializers
from .models import Post
from django.contrib.auth.models import User

# Define a simple serializer for the User model to get the username
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']  # Only include the username field

class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)  # Use the UserSerializer to return the author's username

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'author', 'created_at', 'updated_at']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Make password write-only for security

    class Meta:
        model = User
        fields = ['username', 'password']

    def create(self, validated_data):
        # Create and return a new user
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user