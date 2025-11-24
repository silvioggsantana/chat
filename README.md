# Chatbot de Atendimento Simulado - 4blue

Protótipo fullstack de um sistema de chat desenvolvido como parte do processo seletivo da 4blue.

## 📋 Descrição do Projeto

Este projeto implementa um chatbot de atendimento simulado com as seguintes funcionalidades:

- **Login Mockado**: Seleção entre "Usuário A" ou "Usuário B" sem autenticação complexa
- **Tela de Chat**: Interface para enviar mensagens e receber respostas simuladas do backend
- **Tela de Histórico**: Visualização do histórico de mensagens filtrado por usuário

## 🚀 Tecnologias Utilizadas

### Backend
- **Python 3.11**
- **Django 5.2.8**
- **Django REST Framework 3.16.1**
- **django-cors-headers 4.9.0**
- **SQLite** (banco de dados padrão do Django)

### Frontend
- **React 18**
- **React Router DOM** (navegação entre páginas)
- **Axios** (requisições HTTP)
- **CSS3** (estilização)

### Controle de Versão
- **Git**

## 📁 Estrutura do Projeto

```
chatbot-4blue/
├── backend/
│   ├── chatbot_project/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── ...
│   ├── chat/
│   │   ├── models.py          # Modelo Message
│   │   ├── serializers.py     # Serializer para API
│   │   ├── views.py           # ViewSet com endpoints
│   │   └── urls.py            # Rotas da API
│   ├── manage.py
│   ├── requirements.txt
│   └── db.sqlite3
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js       # Componente de login
│   │   │   ├── Chat.js        # Componente do chat
│   │   │   ├── History.js     # Componente de histórico
│   │   │   └── *.css          # Estilos dos componentes
│   │   ├── App.js
│   │   └── ...
│   ├── package.json
│   └── ...
└── README.md
```

## 🔧 Como Configurar e Rodar o Projeto

### Pré-requisitos
- Python 3.11+
- Node.js 18+
- npm ou yarn
- Git

### 1. Clonar o Repositório

```bash
git clone <url-do-repositorio>
cd chatbot-4blue
```

### 2. Configurar o Backend

```bash
# Navegar para o diretório do backend
cd backend

# Criar ambiente virtual
python3.11 -m venv venv

# Ativar o ambiente virtual
# No Linux/Mac:
source venv/bin/activate
# No Windows:
# venv\Scripts\activate

# Instalar dependências
pip install -r requirements.txt

# Aplicar migrações do banco de dados
python manage.py migrate

# Rodar o servidor Django
python manage.py runserver
```

O backend estará rodando em `http://localhost:8000`

### 3. Configurar o Frontend

```bash
# Em outro terminal, navegar para o diretório do frontend
cd frontend

# Instalar dependências
npm install

# Rodar o servidor de desenvolvimento
npm start
```

O frontend estará rodando em `http://localhost:3000`

## 🎯 Como Usar a Aplicação

1. Acesse `http://localhost:3000` no navegador
2. Selecione um perfil de usuário (A ou B) e clique em "Entrar"
3. Na tela de chat, digite uma mensagem e clique em "Enviar"
4. O sistema retornará uma resposta simulada personalizada para cada usuário
5. Clique em "Ver Histórico" para visualizar todas as mensagens enviadas pelo usuário atual
6. No histórico, você pode ver a data/hora de cada mensagem e suas respectivas respostas

## 📡 Endpoints da API

### POST `/api/messages/`
Cria uma nova mensagem e retorna uma resposta simulada.

**Request Body:**
```json
{
  "user": "A",
  "message": "Olá, preciso de ajuda!"
}
```

**Response:**
```json
{
  "id": 1,
  "user": "A",
  "message": "Olá, preciso de ajuda!",
  "response": "Obrigado por seu contato, Usuário A! Recebi sua mensagem: 'Olá, preciso de ajuda!'. Em breve responderemos.",
  "created_at": "2025-11-21T10:30:00Z"
}
```

### GET `/api/messages/history/?user=A`
Retorna o histórico de mensagens filtrado por usuário.

**Response:**
```json
[
  {
    "id": 2,
    "user": "A",
    "message": "Segunda mensagem",
    "response": "Obrigado por seu contato, Usuário A! Recebi sua mensagem: 'Segunda mensagem'. Em breve responderemos.",
    "created_at": "2025-11-21T10:35:00Z"
  },
  {
    "id": 1,
    "user": "A",
    "message": "Primeira mensagem",
    "response": "Obrigado por seu contato, Usuário A! Recebi sua mensagem: 'Primeira mensagem'. Em breve responderemos.",
    "created_at": "2025-11-21T10:30:00Z"
  }
]
```

## 🏗️ Decisões Técnicas

- O projeto utiliza SQLite por ser o banco de dados padrão do Django, ideal para desenvolvimento e testes
- As respostas são simuladas no backend, mas a estrutura permite fácil integração com sistemas reais de IA ou chatbot
- O código está preparado para expansão futura, como adicionar autenticação real, mais tipos de usuários, ou integração com APIs externas

### Modelagem no Django

Usei apenas um model principal, Message, contendo:

- sender (A ou B)
- content (mensagem do usuário)
- response (resposta mockada gerada pela API)
- timestamp

Mantive tudo em um único model para deixar o backend simples, direto e perfeito para o requisito principal: filtrar mensagens por usuário.

### Estado no React

Gerenciei o estado do usuário ativo (A ou B) no componente principal (App.js) com useState.

Esse estado é passado para:

- Tela de Chat → para enviar mensagens
- Tela de Histórico → para buscar apenas as mensagens do usuário selecionado

Cada página mantém apenas o estado que ela realmente precisa, mantendo o fluxo simples e claro.
