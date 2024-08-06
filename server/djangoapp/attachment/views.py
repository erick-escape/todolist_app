from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Attachment
from .serializers import AttachmentSerializer
from rest_framework.permissions import IsAuthenticated


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def attachment_create(request):
    serializer = AttachmentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def attachment_list(request):
    attachments = Attachment.objects.filter(user=request.user)
    serializer = AttachmentSerializer(attachments, many=True)
    return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def attachment_detail(request, pk):
    try:
        attachment = Attachment.objects.get(pk=pk)
    except Attachment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if attachment.task.user != request.user:
        return Response(status=status.HTTP_403_FORBIDDEN)

    if request.method == 'GET':
        serializer = AttachmentSerializer(attachment)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = AttachmentSerializer(attachment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        attachment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

