from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Message
from .serializers import MessageSerializer


class MessageViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciar mensagens do chat.
    Fornece endpoints para criar mensagens e obter histórico por usuário.
    """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    
    def create(self, request, *args, **kwargs):
        """
        Cria uma nova mensagem e retorna uma resposta simulada.
        A resposta é personalizada para cada usuário.
        """
        user = request.data.get('user')
        message_text = request.data.get('message')
        
        # Gerar resposta mockada baseada no usuário
        if user == 'A':
            response_text = f"Obrigado por seu contato, Usuário A! Recebi sua mensagem: '{message_text}'. Em breve responderemos."
        elif user == 'B':
            response_text = f"Olá, Usuário B! Sua mensagem '{message_text}' foi registrada. Retornaremos em breve."
        else:
            response_text = "Obrigado por seu contato. Em breve responderemos."
        
        # Criar a mensagem no banco de dados
        message = Message.objects.create(
            user=user,
            message=message_text,
            response=response_text
        )
        
        serializer = self.get_serializer(message)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['get'])
    def history(self, request):
        """
        Retorna o histórico de mensagens filtrado por usuário.
        Query parameter: user (A ou B)
        """
        user = request.query_params.get('user')
        
        if not user:
            return Response(
                {'error': 'Parâmetro "user" é obrigatório'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        messages = Message.objects.filter(user=user).order_by('-created_at')
        serializer = self.get_serializer(messages, many=True)
        return Response(serializer.data)
