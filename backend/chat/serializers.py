from rest_framework import serializers
from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    """
    Serializer para o modelo Message.
    Converte objetos Message em JSON e vice-versa.
    """
    class Meta:
        model = Message
        fields = ['id', 'user', 'message', 'response', 'created_at']
        read_only_fields = ['id', 'response', 'created_at']
