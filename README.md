# Akshay Pandey – Full-Stack AI-Powered Developer Portfolio

A production-grade, full-stack developer portfolio application architected for **Akshay Pandey (Full Stack Java Developer | Software Engineer)**. Features a live AI Portfolio Assistant with Retrieval-Augmented Generation (RAG), interactive system architecture visualizer ("How I Think About Systems"), deep-dive microservices case studies (TRAVO & Industrial Root Cause Drill-Through), and complete Java Spring Boot backend source code with PGVector integration.

---

## 🌟 Architecture Highlights

1. **AI Portfolio Assistant (RAG Pipeline)**:
   - Automated document chunking, semantic context retrieval, and cosine similarity ranking.
   - Grounded strictly in Akshay's knowledge documents (`profile.md`, `experience.md`, `skills.md`, `projects.md`, `achievements.md`, `education.md`, `faq.md`).
   - Real-time Server-Sent Events (SSE) streaming responses with source attribution.
2. **Interactive System Design Showcase**:
   - Visualizes request lifecycle from React client through API Gateway, Microservices, Kafka Event Bus, Redis Cache, and PostgreSQL / MongoDB databases.
   - Clickable nodes revealing engineering rationale and trade-offs.
3. **Engineering Depth & Metrics**:
   - Highlights 40% reduction in processing latency and 25% API response time improvement at TCS.
   - Highlights 800+ solved algorithmic problems (LeetCode/GFG) and AWS Certified Cloud Practitioner credentials.
4. **Dual Backend Implementation**:
   - **Live Production Applet**: Fast Express + Vite + Gemini/RAG server running on port 3000.
   - **Java Spring Boot Backend**: Complete Java 21, Spring Boot 3.3, Spring AI, Spring Security, JPA, and PGVector code in `/backend`.

---

## 🚀 Quickstart

### Prerequisites
- Node.js 20+
- (Optional for Java backend): Java 21 & Maven 3.9+
- (Optional for local container): Docker & Docker Compose

### 1. Running the Live Web Application
```bash
# Install dependencies
npm install

# Start the full-stack server on port 3000
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

### 2. Running with Docker Compose
```bash
# Start PostgreSQL (pgvector) and web application
docker compose up --build
```

---

### 3. Java Spring Boot + Spring AI Backend (Optional)
```bash
cd backend
mvn clean spring-boot:run
```

> Note: the project uses PostgreSQL on port 5433 by default to avoid conflicts with any existing local PostgreSQL instance already using 5432. If you have a different local Postgres running, stop it or set `SPRING_DATASOURCE_URL` to the correct database host and port.

The Spring Boot REST API will be available at `http://localhost:8080`.

---

## 📡 REST API Documentation

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/profile` | Developer summary, philosophies, and impact metrics |
| `GET` | `/api/v1/projects` | Detailed project case studies (TRAVO, Drill-down, RAG) |
| `GET` | `/api/v1/skills` | Categorized tech stack & proficiency data |
| `GET` | `/api/v1/experience` | Work history & metrics at TCS |
| `GET` | `/api/v1/achievements` | DSA counts, AWS certification, academic standing |
| `GET` | `/api/v1/architecture` | Microservices architecture nodes and relationship graph |
| `POST` | `/api/v1/contact` | Submits contact messages with validation |
| `POST` | `/api/v1/ai/chat` | AI query with semantic RAG retrieval (JSON response) |
| `POST` | `/api/v1/ai/stream` | AI query with Server-Sent Events (SSE) stream |
| `POST` | `/api/v1/knowledge/ingest` | Triggers document ingestion and chunk indexing |
| `GET` | `/api/v1/knowledge/status` | Current knowledge base and vector index stats |

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Motion (Framer Motion), Lucide React, Canvas Confetti.
- **Backend (Node/Express)**: Express 4, `@google/genai` (Gemini 3.7 Flash), Vector Search Engine, SSE Streaming.
- **Backend (Java/Spring)**: Java 21, Spring Boot 3.3, Spring AI, Spring Security, Spring Data JPA, PostgreSQL (pgvector), Apache Kafka, Redis.
- **DevOps**: Docker, Docker Compose, Multi-stage builds, G1GC tuning.
