# 🤖 Company Internal AI Assistant

A **Retrieval-Augmented Generation (RAG)** based AI assistant that allows users to ask questions about internal company documents and receive context-aware answers.

The application retrieves relevant information from company documents using **vector similarity search** and passes that context to an LLM to generate grounded responses.

---

## 🚀 Features

- 📄 PDF document ingestion
- ✂️ Recursive document chunking
- 🧠 Vector embeddings using Mistral AI
- 🔎 Semantic similarity search
- 🗄️ Pinecone vector database
- 🤖 RAG-based question answering
- ⚡ Groq-powered LLM inference
- 💬 Interactive React chat interface
- 🎨 Tailwind CSS UI
- 🔗 REST API using Express.js
- 🔐 Environment-based API key management
- 📚 Retrieval of relevant document chunks before generation

---

## 🧠 What is RAG?

**Retrieval-Augmented Generation (RAG)** combines information retrieval with Large Language Models.

Instead of asking an LLM to answer solely from its existing knowledge, the application first retrieves relevant information from the company's documents and provides that information as context to the LLM.

This helps produce answers grounded in the provided documents.

### RAG Pipeline

```text
User Question
      │
      ▼
Generate Query Embedding
      │
      ▼
Pinecone Vector Search
      │
      ▼
Retrieve Relevant Chunks
      │
      ▼
Question + Retrieved Context
      │
      ▼
Groq LLM
      │
      ▼
Generated Answer
```

---

# 🏗️ Architecture

The project is divided into two major parts:

```text
Company_Internal_AI_Assistant/
│
├── client/                 # React frontend
│
└── server/                 # Node.js + Express backend
```

The complete request flow is:

```text
┌─────────────────────┐
│   React Frontend    │
└──────────┬──────────┘
           │
           │ POST /api/v1/chat
           ▼
┌─────────────────────┐
│   Express Backend   │
└──────────┬──────────┘
           │
           ▼
     Chat Controller
           │
           ▼
       RAG Service
           │
           ├───────────────┐
           ▼               ▼
   Mistral Embedding    Pinecone
           │               │
           └───────┬───────┘
                   ▼
          Relevant Chunks
                   │
                   ▼
          Question + Context
                   │
                   ▼
               Groq LLM
                   │
                   ▼
             Final Answer
                   │
                   ▼
             React Chat UI
```

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Axios

## Backend

- Node.js
- Express.js
- Groq SDK
- LangChain

## AI / RAG

- Retrieval-Augmented Generation
- Mistral AI Embeddings
- Groq LLM
- Recursive Character Text Splitting
- Semantic Search

## Vector Database

- Pinecone

---

# 📁 Project Structure

```text
Company_Internal_AI_Assistant/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   │
│   │   ├── components/
│   │   │   ├── ChatInput.jsx
│   │   │   └── ChatMessage.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── ChatPage.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env
│   └── package.json
│
└── server/
    ├── controllers/
    │   └── chat.controller.js
    │
    ├── routes/
    │   └── chat.routes.js
    │
    ├── services/
    │   ├── rag.service.js
    │   └── vector.service.js
    │
    ├── scripts/
    │   └── indexDocuments.js
    │
    ├── documents/
    │   └── cg-internal-docs.pdf
    │
    ├── app.js
    ├── server.js
    ├── .env
    └── package.json
```

---

# ⚙️ How It Works

The application operates in two main phases.

## Phase 1 — Document Indexing

The indexing process is performed before users start asking questions.

```text
PDF Document
     │
     ▼
PDF Loader
     │
     ▼
Document Chunking
     │
     ▼
Mistral Embeddings
     │
     ▼
Vector Embeddings
     │
     ▼
Pinecone
```

### Step 1 — Load Documents

Company PDF documents are loaded using LangChain's PDF loader.

### Step 2 — Chunk Documents

Large documents are divided into smaller chunks using:

```text
RecursiveCharacterTextSplitter
```

This makes retrieval more precise and prevents the entire document from being sent to the LLM.

### Step 3 — Generate Embeddings

Each text chunk is converted into a numerical vector using:

```text
Mistral AI Embeddings
```

### Step 4 — Store in Pinecone

The embeddings, original text, and associated metadata are stored inside the Pinecone vector database.

---

# 🔎 Phase 2 — Retrieval and Generation

When the user asks a question:

```text
"What is the company's leave policy?"
```

the question is converted into an embedding using the same embedding model.

```text
Question
   │
   ▼
Mistral Embedding
   │
   ▼
Query Vector
   │
   ▼
Pinecone Similarity Search
   │
   ▼
Top Relevant Chunks
```

The retrieved chunks are then combined with the user's question:

```text
System Prompt
      +
User Question
      +
Retrieved Context
```

This augmented prompt is sent to the LLM through Groq.

The generated answer is then returned to the React frontend.

---

# 🔌 API

## Chat

### Endpoint

```http
POST /api/v1/chat
```

### Request

```json
{
  "question": "What is the company's leave policy?"
}
```

### Response

```json
{
  "success": true,
  "answer": "According to the provided company documents...",
  "sources": [
    {
      "content": "Relevant document content...",
      "metadata": {}
    }
  ]
}
```

---

# 🔐 Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=5000

GROQ_API_KEY=your_groq_api_key

MISTRAL_API_KEY=your_mistral_api_key

PINECONE_API_KEY=your_pinecone_api_key

PINECONE_INDEX_NAME=your_pinecone_index_name
```

Create another `.env` inside the `client` directory.

```env
VITE_API_URL=http://localhost:5000/api/v1
```

> Never commit `.env` files or API keys to GitHub.

---

# 📦 Installation

## 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>

cd Company_Internal_AI_Assistant
```

---

## 2. Install Backend Dependencies

```bash
cd server

npm install
```

---

## 3. Install Frontend Dependencies

Open another terminal:

```bash
cd client

npm install
```

---

# 📄 Index Company Documents

Place your PDF inside:

```text
server/documents/
```

For example:

```text
server/documents/cg-internal-docs.pdf
```

Then run:

```bash
cd server

node scripts/indexDocuments.js
```

This performs:

```text
Load PDF
   ↓
Chunk PDF
   ↓
Generate Embeddings
   ↓
Store in Pinecone
```

You only need to index documents when new documents are added or existing documents need to be re-indexed.

---

# ▶️ Running the Application

## Start Backend

```bash
cd server

node server.js
```

The backend will run on:

```text
http://localhost:5000
```

---

## Start Frontend

In another terminal:

```bash
cd client

npm run dev
```

The frontend will typically run on:

```text
http://localhost:5173
```

---

# 🔄 Complete Application Flow

```text
User
 │
 │ asks question
 ▼
React Frontend
 │
 │ POST /api/v1/chat
 ▼
Express Backend
 │
 ▼
Chat Controller
 │
 ▼
RAG Service
 │
 ├──── Generate query embedding
 │
 ▼
Pinecone
 │
 │ Similarity Search
 ▼
Top Relevant Document Chunks
 │
 ▼
Question + Context
 │
 ▼
Groq LLM
 │
 ▼
Generated Answer
 │
 ▼
Express Response
 │
 ▼
React Frontend
 │
 ▼
User
```

---

# 🧩 Core Concepts Used

This project demonstrates practical implementation of several Generative AI concepts:

- Large Language Models
- Retrieval-Augmented Generation
- Vector Embeddings
- Vector Databases
- Semantic Search
- Similarity Search
- Prompt Engineering
- Document Chunking
- Context Augmentation
- REST API Integration
- Full-Stack AI Application Development

---

# 🔮 Future Improvements

The current application implements the core RAG pipeline. Future improvements can include:

- [ ] Conversation history
- [ ] Multi-turn contextual conversations
- [ ] User authentication
- [ ] Admin dashboard
- [ ] PDF upload through frontend
- [ ] Multiple document support
- [ ] Document management
- [ ] Source citations
- [ ] Page-number references
- [ ] Similarity-score threshold
- [ ] Streaming LLM responses
- [ ] Reranking retrieved documents
- [ ] Hybrid search
- [ ] Query rewriting
- [ ] MongoDB chat history
- [ ] Role-based document access
- [ ] Docker support
- [ ] Production deployment

---

# 🔒 Security

Sensitive API credentials are stored using environment variables.

The following files should never be committed:

```gitignore
.env
node_modules/
```

The frontend should never contain private API keys such as:

```text
GROQ_API_KEY
MISTRAL_API_KEY
PINECONE_API_KEY
```

All AI and vector-database requests should be handled by the backend.

---

# 🎯 Purpose

This project demonstrates how Generative AI can be integrated into a modern full-stack application to build an internal knowledge assistant.

Instead of manually searching through large company documents, employees can ask questions using natural language and receive responses grounded in relevant internal information.

---

# 👨‍💻 Author

**Priyanshu Singh**

Computer Science & Engineering  
Ramdeobaba University, Nagpur

### Connect

- GitHub: `<YOUR_GITHUB_URL>`
- LinkedIn: `<YOUR_LINKEDIN_URL>`
- Email: `<YOUR_EMAIL>`

---

# ⭐ Support

If you found this project useful, consider giving the repository a ⭐.

---

## 📌 Disclaimer

This project is intended for educational and development purposes. For production use with real internal company data, additional authentication, authorization, encryption, access control, monitoring, and data-governance measures should be implemented.
