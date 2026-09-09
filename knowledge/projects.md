# Featured Projects: Akshay Pandey

## Project 1: TRAVO – Distributed Travel & Social Network Platform
- **Tagline:** "Find Your Way, Find Your Buddy"
- **Role:** Lead Full-Stack & Systems Architect
- **Tech Stack:** React, TypeScript, Spring Boot 3, Spring Security 6, Spring Cloud Gateway, Apache Kafka, Redis, MongoDB, PostgreSQL, WebSockets (STOMP), Resilience4j, Docker.

### Architectural Overview & Features:
1. **Microservices Decomposition:**
   - **API Gateway Service:** Centralized routing, rate limiting, request validation, and SSL termination.
   - **Auth Service:** Issues signed JWT tokens, handles user authentication, password resets, and role verification.
   - **User & Social Service:** Manages travel profiles, buddy requests, companion matchmaking algorithms, and interest tags stored in MongoDB.
   - **Trip Management Service:** Manages multi-destination itineraries, live booking statuses, cost-splitting, and relational travel records in PostgreSQL.
   - **Real-time Chat & Notification Service:** Full-duplex WebSocket communication for group chats and instant travel notifications.
2. **Event-Driven Communication with Kafka:**
   - Asynchronous trip booking confirmations and social buddy request events broadcast through high-throughput Kafka topics (`trip-events`, `buddy-notifications`).
   - Consumer groups handle async analytics and push notifications without stalling the main transaction thread.
3. **Multi-Level Redis Caching:**
   - Cached hot trip listings and buddy recommendations with intelligent TTL expiration, reducing database query frequency by 60%.
4. **Resilience & Fault Tolerance:**
   - Resilience4j circuit breakers prevent cascading failures when external map or weather APIs experience timeouts.

---

## Project 2: Root Cause Drill-Through Industrial Monitoring System
- **Role:** Full-Stack Java Engineer
- **Tech Stack:** Java 21, Spring Boot, React, PostgreSQL (with Timescale partition concepts), Apache Kafka, WebSockets, Docker, Docker Compose, Tailwind CSS.

### Architectural Overview & Features:
1. **High-Throughput Ingestion Pipeline:**
   - Ingests thousands of telemetry events per second from industrial sensor streams via Kafka topics.
   - Microservices filter, sanitize, and aggregate raw metric spikes in real time.
2. **Interactive Drill-Down & Anomaly Inspection:**
   - Developed an interactive frontend dashboard enabling multi-level root-cause drill-through from plant-wide telemetry down to specific machine sensor micro-anomalies.
3. **Live WebSocket Feeds:**
   - Sub-second push updates to connected operator dashboards using Spring WebSockets with STOMP protocol.
4. **Optimized Query Engine:**
   - Partitioned PostgreSQL tables with composite B-Tree and BRIN indexing to execute multi-million row time-range queries in under 50ms.

---

## Project 3: AI-Powered Knowledge Assistant & RAG Engine
- **Role:** AI & Backend Engineer
- **Tech Stack:** Spring Boot, Spring AI, PostgreSQL + pgvector, React, TypeScript, Ollama (Qwen/Llama3), Google Gemini API.

### Architectural Overview & Features:
1. **Modular Vector Retrieval:**
   - Implemented an end-to-end ETL ingestion pipeline that parses markdown and PDF documents, extracts text, generates dense vector embeddings, and stores them in PGVector.
2. **Semantic Similarity & Context Injection:**
   - Uses cosine similarity search with threshold filtering to retrieve the top-k most relevant knowledge chunks.
3. **Strict System Prompt Guardrails:**
   - Injects retrieved portfolio context into the LLM system prompt, enforcing zero-hallucination policies and professional portfolio attribution.
