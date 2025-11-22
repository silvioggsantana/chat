from django.db import models


class Message(models.Model):
    """
    Modelo para armazenar as mensagens do chat.
    Cada mensagem está vinculada a um usuário (A ou B) e contém o conteúdo da mensagem,
    a resposta do sistema e o timestamp de criação.
    """
    USER_CHOICES = [
        ('A', 'Usuário A'),
        ('B', 'Usuário B'),
    ]
    
    user = models.CharField(max_length=1, choices=USER_CHOICES)
    message = models.TextField()
    response = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Usuário {self.user}: {self.message[:50]}"
