from rest_framework import permissions

class IsAuthorOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow authors of a post to edit or delete it.
    Other users will have read-only access.
    """

    def has_object_permission(self, request, view, obj):
        # SAFE_METHODS are GET, HEAD, and OPTIONS (read-only requests)
        if request.method in permissions.SAFE_METHODS:
            return True  # Allow read-only access for non-authors

        # Write permissions are only allowed to the author of the post
        return obj.author == request.user  # Allow write access if the user is the author
