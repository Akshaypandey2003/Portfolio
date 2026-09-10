export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  yearsOfExperience: string;
  summary: string;
  philosophy: {
    title: string;
    description: string;
    icon: string;
  }[];
  metrics: {
    label: string;
    value: string;
    description: string;
  }[];
  socialLinks: {
    platform: string;
    url: string;
    username: string;
  }[];
}

export interface ProjectData {
  id: string;
  title: string;
  tagline: string;
  category: string;
  featured: boolean;
  technologies: string[];
  summary: string;
  problem: string;
  solution: string;
  architecture: {
    flow: string[];
    description: string;
  };
  keyFeatures: string[];
  metrics: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    proficiency: number;
    highlight?: boolean;
    description: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  type: string;
  impactMetrics: {
    metric: string;
    label: string;
  }[];
  responsibilities: string[];
  technologies: string[];
}

export interface ArchitectureComponent {
  id: string;
  name: string;
  type: "client" | "gateway" | "service" | "messaging" | "cache" | "database" | "ai";
  description: string;
  rationale: string;
  connections: string[];
}

export const PROFILE_DATA: ProfileData = {
  name: "Akshay Pandey",
  title: "Full Stack Java Developer | Software Engineer",
  tagline: "Building scalable distributed systems and intelligent RAG applications.",
  yearsOfExperience: "~2 Years",
  summary:
    "Full Stack Java Developer with ~2 years of experience building scalable distributed applications using Java 21, Spring Boot, Microservices, and React.js. Experienced in event-driven architectures with Apache Kafka, sub-second caching with Redis, resilience patterns, Spring AI RAG pipelines, and high-performance database optimization.",
  philosophy: [
    {
      title: "Build with Intent",
      description: "Write clean, modular code with strict adherence to SOLID principles, Design Patterns, and OOP rigor.",
      icon: "Code2",
    },
    {
      title: "Scale Proactively",
      description: "Design decoupled microservice architectures using Kafka event-driven buses, connection pooling, and horizontal sharding.",
      icon: "Cpu",
    },
    {
      title: "Optimize Rigorously",
      description: "Eliminate latency bottlenecks via multi-level Redis caching, database index profiling, and asynchronous I/O.",
      icon: "Zap",
    },
    {
      title: "Learn & Integrate AI",
      description: "Harness modern Spring AI, vector embeddings, and RAG pipelines to make software intuitively intelligent.",
      icon: "Sparkles",
    },
  ],
  metrics: [
    {
      label: "Latency Reduction",
      value: "40%",
      description: "Across microservice data pipelines via query tuning and async Kafka decoupling.",
    },
    {
      label: "API Response Boost",
      value: "25%",
      description: "Improvement in latency through distributed Redis caching strategies.",
    },
    {
      label: "DSA Problems Solved",
      value: "800+",
      description: "Across LeetCode, GeeksforGeeks, and HackerRank mastering graph, DP, and system design.",
    },
    {
      label: "Cloud Certified",
      value: "AWS",
      description: "AWS Certified Cloud Practitioner with deep VPC, IAM, EC2, and S3 knowledge.",
    },
  ],
  socialLinks: [
    {
      platform: "Email",
      url: "mailto:rakshaypandey@gmail.com",
      username: "rakshaypandey@gmail.com",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/akshay-pandey-547829221",
      username: "akshay-pandey",
    },
    {
      platform: "GitHub",
      url: "https://github.com/Akshaypandey2003",
      username: "Akshaypandey2003",
    },
  ],
};

export const PROJECTS_DATA: ProjectData[] = [
  {
    id: "travo",
    title: "TRAVO",
    tagline: "Find Your Way, Find Your Buddy – Distributed Travel Social Platform",
    category: "Distributed Microservices & Social Network",
    featured: true,
    technologies: [
      "Java 21",
      "Spring Boot 3",
      "React",
      "TypeScript",
      "Apache Kafka",
      "Redis",
      "Spring Security (JWT)",
      "MongoDB",
      "PostgreSQL",
      "WebSockets",
      "Spring Cloud Gateway",
      "Resilience4j",
      "Docker",
    ],
    summary:
      "A distributed social network platform connecting travelers and solo adventurers. Features smart buddy matchmaking, collaborative itinerary planning, real-time messaging, asynchronous booking pipelines, and circuit breaker resilience.",
    problem:
      "Monolithic travel applications struggle with synchronous lockups during simultaneous itinerary updates, heavy chat volume, and unpredictable external service latencies (like flight/weather APIs).",
    solution:
      "Architected a microservices ecosystem fronted by Spring Cloud Gateway. Utilized Apache Kafka for event-driven booking notifications and friend requests, Redis for hot trip feed caching, and Resilience4j circuit breakers with fallback queues to isolate third-party service outages.",
    architecture: {
      flow: [
        "React Client -> Spring Cloud Gateway (Rate limiting & JWT auth)",
        "Gateway -> Auth, User, Trip, and Notification Services",
        "Services publish events -> Kafka Topics ('trip-events', 'buddy-match')",
        "Redis Cache-Aside Layer accelerates frequent itinerary reads",
        "MongoDB stores flexible user social profiles; PostgreSQL stores relational transactions",
      ],
      description:
        "Decoupled asynchronous event broker with multi-tenant data stores ensuring zero-downtime scalability.",
    },
    keyFeatures: [
      "AI & Interest-based Buddy Matchmaking Algorithm",
      "Real-time Full-Duplex Chat & Push Notifications via WebSockets",
      "Asynchronous Event Sourcing with Kafka for Booking Events",
      "Multi-level Caching Layer with Redis TTL Invalidation",
      "JWT-based Stateless Authentication with Role-Based Security",
      "Circuit Breaker & Fallback Retry Mechanism using Resilience4j",
    ],
    metrics: [
      "60% reduction in database queries with Redis caching",
      "Zero cascading service outages using Resilience4j",
      "<50ms latency on real-time WebSocket chat feeds",
    ],
    githubUrl: "https://github.com/akshaypandey-dev/travo-microservices",
    liveUrl: "https://travo-demo.internal",
  },
  {
    id: "root-cause-monitoring",
    title: "Root Cause Drill-Through System",
    tagline: "High-Throughput Industrial Anomaly Inspection & Telemetry Engine",
    category: "Event Streaming & Real-Time Analytics",
    featured: true,
    technologies: [
      "Java 21",
      "Spring Boot 3",
      "React",
      "PostgreSQL",
      "Apache Kafka",
      "WebSockets (STOMP)",
      "Docker",
      "Tailwind CSS",
      "TimescaleDB / Partitioning",
    ],
    summary:
      "An industrial monitoring and root-cause analysis platform that ingests thousands of sensor telemetry events per second and allows engineers to perform instant hierarchical drill-through from plant-wide metrics down to granular machine micro-anomalies.",
    problem:
      "High-frequency industrial sensor data quickly overwhelms traditional relational databases, making real-time anomaly detection and deep root-cause inspection painfully slow.",
    solution:
      "Designed a streaming pipeline with Apache Kafka buffering raw telemetry, Spring Boot consumer groups aggregating threshold spikes, and WebSocket STOMP broadcasting live alerts to an interactive React dashboard with optimized partitioned PostgreSQL storage.",
    architecture: {
      flow: [
        "Industrial Sensor Streams -> Kafka Ingestion Topics",
        "Spring Boot Stream Processing Engine -> Aggregates & Anomaly Heuristics",
        "Real-Time Alerts -> WebSocket (STOMP) -> React Dashboard",
        "Historical Telemetry -> Partitioned PostgreSQL (Indexed by Time Range & Node)",
      ],
      description:
        "High-throughput event streaming pipeline enabling sub-second root-cause diagnosis across millions of sensor records.",
    },
    keyFeatures: [
      "Sub-second Multi-tier Drill-through Navigation",
      "Real-time Anomaly Detection & Statistical Outlier Alerting",
      "High-throughput Kafka Producer/Consumer Partitioning",
      "Optimized Composite B-Tree & BRIN Table Partitioning",
      "Interactive SVG Waveform & Telemetry Inspector",
    ],
    metrics: [
      "Ingests 10,000+ sensor events/sec with zero packet loss",
      "Historical time-range queries execute in <50ms",
      "Instant push updates via WebSocket connections",
    ],
    githubUrl: "https://github.com/akshaypandey-dev/root-cause-drilldown",
    liveUrl: "https://drilldown-demo.internal",
  },
  {
    id: "spring-ai-rag-assistant",
    title: "Spring AI RAG Knowledge Engine",
    tagline: "Enterprise Context-Aware Assistant with Semantic Vector Retrieval",
    category: "AI & Retrieval-Augmented Generation",
    featured: true,
    technologies: [
      "Java 21",
      "Spring Boot 3",
      "Spring AI",
      "PostgreSQL + pgvector",
      "React",
      "TypeScript",
      "Ollama",
      "Google Gemini API",
      "Docker Compose",
    ],
    summary:
      "A modular RAG (Retrieval-Augmented Generation) pipeline built on Spring AI and pgvector. Ingests structured enterprise documentation, extracts chunks, computes embeddings, and injects relevant semantic context into LLM prompts with zero hallucination.",
    problem:
      "General-purpose LLMs hallucinate internal enterprise data, lack domain-specific grounding, and cannot securely cite proprietary source documents.",
    solution:
      "Engineered an automated ETL pipeline with Spring AI Document Loaders, cosine similarity retrieval in pgvector, and strict system prompt guardrails providing source-backed responses with latency streaming.",
    architecture: {
      flow: [
        "Markdown/PDF Knowledge Docs -> Document Loader & Text Extractor",
        "Semantic Chunking -> Embedding Model (Ollama / Gemini)",
        "Embeddings Store -> PostgreSQL pgvector with HNSW indexing",
        "User Query -> Semantic Search -> Injected System Prompt -> LLM Stream",
      ],
      description:
        "Full ETL and RAG vector pipeline ensuring verifiable, grounded responses.",
    },
    keyFeatures: [
      "Document Loader & Markdown Parsing with Metadata Tagging",
      "Cosine Similarity & Distance Threshold Filtering",
      "Configurable LLM Provider (Ollama / Gemini / OpenAI)",
      "Server-Sent Events (SSE) Progressive Stream Output",
      "Automated Database Vector Ingestion Endpoint",
    ],
    metrics: [
      "99.4% factual grounding on domain knowledge queries",
      "<120ms vector retrieval latency in pgvector",
      "Modular swap between local Ollama and Cloud LLMs",
    ],
    githubUrl: "https://github.com/akshaypandey-dev/spring-ai-rag-engine",
    liveUrl: "https://rag-demo.internal",
  },
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    category: "Backend & Enterprise Java",
    description: "Core distributed backend architecture, enterprise frameworks, and API protocols.",
    skills: [
      { name: "Java 21 / Modern Java", proficiency: 95, highlight: true, description: "Records, Pattern Matching, Virtual Threads, Streams, Generics, Concurrency" },
      { name: "Spring Boot 3.x", proficiency: 92, highlight: true, description: "Auto-configuration, Actuator, Web MVC, Layered Service Architecture" },
      { name: "Spring Security 6", proficiency: 88, highlight: true, description: "JWT, OAuth2/OIDC, RBAC, Filter Chains, Method Security" },
      { name: "Spring Data JPA / Hibernate", proficiency: 90, description: "Entity mappings, Query optimization, N+1 prevention, Criteria API" },
      { name: "RESTful APIs & WebSockets", proficiency: 92, highlight: true, description: "Contract design, STOMP protocol, API versioning, error payloads" },
      { name: "Spring Cloud Gateway", proficiency: 85, description: "Route predicates, filters, rate limiting, request validation" },
    ],
  },
  {
    category: "Distributed Systems & Streaming",
    description: "High-throughput event streaming, distributed caching, and microservice resilience.",
    skills: [
      { name: "Apache Kafka", proficiency: 90, highlight: true, description: "Producers, Consumers, Consumer Groups, Partitioning, Exactly-Once Semantics" },
      { name: "Redis Caching", proficiency: 88, highlight: true, description: "Cache-Aside, Write-Through, TTL strategies, In-memory key-value stores" },
      { name: "Microservices Architecture", proficiency: 90, highlight: true, description: "Decoupled domain boundaries, service discovery, inter-service REST & Events" },
      { name: "Resilience4j", proficiency: 84, description: "Circuit Breakers, Retry policies, Rate limiters, Fallback handlers" },
      { name: "Event-Driven Architecture", proficiency: 88, description: "Asynchronous workflows, Event Sourcing patterns, Pub/Sub mechanisms" },
    ],
  },
  {
    category: "Databases & Storage",
    description: "Relational persistence, query optimization, NoSQL models, and vector stores.",
    skills: [
      { name: "PostgreSQL & pgvector", proficiency: 90, highlight: true, description: "Indexing, Execution Plans, Vector similarity search, Partitioning" },
      { name: "MongoDB", proficiency: 85, description: "Document schemas, Aggregation pipelines, BSON indexing" },
      { name: "MySQL", proficiency: 88, description: "ACID transactions, Schema design, Connection pooling" },
      { name: "Database Query Optimization", proficiency: 88, highlight: true, description: "EXPLAIN ANALYZE, query indexing, query caching, connection tuning" },
    ],
  },
  {
    category: "AI & RAG Engineering",
    description: "Spring AI ecosystem, dense vector retrieval, and LLM orchestration.",
    skills: [
      { name: "Spring AI", proficiency: 88, highlight: true, description: "ChatClient, Prompt Templates, Model Auto-configuration, Function Calling" },
      { name: "RAG Architecture", proficiency: 90, highlight: true, description: "Document ETL, Chunking, Cosine Semantic Retrieval, Context Injection" },
      { name: "Vector Databases", proficiency: 86, description: "pgvector, Qdrant, Chroma, similarity scoring" },
      { name: "LLM Orchestration", proficiency: 88, description: "Ollama (Qwen, Llama 3), Google Gemini API, OpenAI compatibility" },
    ],
  },
  {
    category: "Frontend Development",
    description: "Modern, component-driven reactive web interfaces.",
    skills: [
      { name: "React 19 & TypeScript", proficiency: 88, highlight: true, description: "Hooks, Functional Components, Strict Type Safety, State Management" },
      { name: "Tailwind CSS", proficiency: 92, highlight: true, description: "Design systems, Responsive layouts, Dark mode theming" },
      { name: "Motion (Framer Motion)", proficiency: 86, description: "Layout animations, transition springs, scroll reveals" },
      { name: "State Management", proficiency: 85, description: "Redux Toolkit, Context API, TanStack Query" },
    ],
  },
  {
    category: "Computer Science & Engineering Rigor",
    description: "Algorithms, design principles, multithreading, and DevOps tools.",
    skills: [
      { name: "DSA (800+ Solved)", proficiency: 94, highlight: true, description: "LeetCode, GFG, HackerRank (DP, Graphs, Trees, Heaps, Greedy)" },
      { name: "SOLID & Design Patterns", proficiency: 92, highlight: true, description: "Factory, Strategy, Observer, Builder, Adapter, Singleton" },
      { name: "Multithreading & JVM Internals", proficiency: 88, description: "ExecutorService, CompletableFuture, Thread Pools, Memory Model" },
      { name: "Docker & Containerization", proficiency: 86, description: "Multi-stage builds, Docker Compose, container orchestration" },
      { name: "AWS Fundamentals", proficiency: 85, description: "Certified Cloud Practitioner: EC2, S3, RDS, VPC, IAM" },
      { name: "Git, Maven & CI/CD", proficiency: 90, description: "Branching workflows, Maven lifecycle, Automated testing" },
    ],
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "tcs-java-dev",
    company: "Tata Consultancy Services (TCS)",
    role: "Java Developer / Software Engineer",
    duration: "July 2024 – Present",
    location: "India",
    type: "Full-Time",
    impactMetrics: [
      { metric: "40%", label: "Processing Latency Reduction" },
      { metric: "25%", label: "API Response Time Improvement" },
      { metric: "99.9%", label: "Service Uptime with Circuit Breakers" },
    ],
    responsibilities: [
      "Engineered scalable RESTful microservices and backend services using Java 21, Spring Boot, and Spring Security.",
      "Decoupled synchronous request-response bottlenecks by migrating core workflows to asynchronous, event-driven pipelines using Apache Kafka topics and partition consumer groups.",
      "Engineered distributed caching strategies with Redis (Read-Through, Cache-Aside, and TTL management), reducing database query overhead and boosting API response times by 25%.",
      "Analyzed and tuned complex SQL queries in PostgreSQL and MySQL, achieving a 40% reduction in end-to-end data processing latency.",
      "Implemented Resilience4j Circuit Breaker, Retry, and Rate Limiting patterns to isolate downstream dependencies and eliminate cascading failures.",
      "Built stateless authentication & authorization filters using Spring Security with JSON Web Tokens (JWT) and role-based access control (RBAC).",
      "Developed WebSocket feeds for high-throughput live telemetry monitoring and sub-second anomaly inspection.",
      "Containerized microservice components using multi-stage Docker builds and coordinated automated JUnit 5 & Mockito test suites.",
    ],
    technologies: [
      "Java 21",
      "Spring Boot",
      "Spring Security",
      "Apache Kafka",
      "Redis",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Docker",
      "WebSockets",
      "JUnit 5",
      "Mockito",
    ],
  },
];

export const ACHIEVEMENTS_DATA = [
  {
    id: "dsa-800",
    title: "800+ Algorithmic Problems Solved",
    platform: "LeetCode • GeeksforGeeks • HackerRank",
    category: "Data Structures & Algorithms",
    description: "Deep problem solving covering Dynamic Programming, Graph Theory (Dijkstra, DFS/BFS, MST), Trees, Heaps, Sliding Window, and Complex System Design.",
    icon: "Award",
    badge: "800+ Solved",
    highlight: true,
  },
  {
    id: "aws-ccp",
    title: "AWS Certified Cloud Practitioner",
    platform: "Amazon Web Services (AWS)",
    category: "Cloud & Infrastructure",
    description: "Validated competencies in AWS cloud architecture, security & IAM policies, high availability, compute (EC2/Lambda), storage (S3), and VPC networking.",
    icon: "ShieldCheck",
    badge: "AWS Certified",
    highlight: true,
  },
  {
    id: "latency-reduction",
    title: "40% Latency Optimization Benchmark",
    platform: "Tata Consultancy Services",
    category: "Enterprise Performance",
    description: "Achieved measurable 40% reduction in processing latency through query indexing, asynchronous Kafka streaming, and JVM memory tuning.",
    icon: "TrendingUp",
    badge: "40% Faster",
    highlight: false,
  },
  {
    id: "academic-cgpa",
    title: "B.Tech Honors – 8.35 CGPA",
    platform: "LNCT Bhopal",
    category: "Academics",
    description: "Graduated with distinction in Information Technology with comprehensive coursework in Operating Systems, Networks, DBMS, and OOP.",
    icon: "GraduationCap",
    badge: "8.35 CGPA",
    highlight: false,
  },
];

export const EDUCATION_DATA = {
  degree: "Bachelor of Technology in Information Technology",
  institution: "Lakshmi Narain College of Technology (LNCT), Bhopal",
  duration: "August 2020 – June 2024",
  cgpa: "8.35 / 10.0",
  coursework: [
    "Data Structures & Algorithms",
    "Object-Oriented Programming (Java)",
    "Database Management Systems & SQL",
    "Operating Systems & Multithreading",
    "Computer Networks & Protocols",
    "Distributed Systems & Cloud Architecture",
    "Software Engineering & Design Patterns",
  ],
};

export const ARCHITECTURE_COMPONENTS: ArchitectureComponent[] = [
  {
    id: "client",
    name: "React 19 + TypeScript Client",
    type: "client",
    description: "Modern Single-Page Application (SPA) with responsive UI, dynamic SSE AI stream reader, and WebSocket telemetry dashboard.",
    rationale: "Component-driven structure with strong typing and fluid motion transitions ensures high interactivity and crisp rendering.",
    connections: ["gateway"],
  },
  {
    id: "gateway",
    name: "Spring Cloud API Gateway",
    type: "gateway",
    description: "Centralized entry point providing SSL termination, path-based routing, JWT verification, and rate limiting.",
    rationale: "Decouples public clients from internal microservices, preventing direct exposure and centralizing cross-cutting security concerns.",
    connections: ["auth-service", "trip-service", "telemetry-service", "ai-service"],
  },
  {
    id: "auth-service",
    name: "Auth & Security Microservice",
    type: "service",
    description: "Issues signed JSON Web Tokens (JWT), manages BCrypt password hashing, and verifies RBAC permissions.",
    rationale: "Stateless security architecture allows horizontal scaling without sticky session overhead.",
    connections: ["redis-cache", "postgres-db"],
  },
  {
    id: "trip-service",
    name: "Core Business & Trip Microservice",
    type: "service",
    description: "Handles itineraries, social companion matching, booking transactions, and Resilience4j circuit breaking.",
    rationale: "Decoupled domain service that interacts asynchronously with downstream event brokers to guarantee high throughput.",
    connections: ["kafka-broker", "redis-cache", "mongo-db", "postgres-db"],
  },
  {
    id: "telemetry-service",
    name: "Industrial Telemetry & Sensor Service",
    type: "service",
    description: "Ingests raw high-frequency sensor events, calculates statistical anomalies, and pushes real-time WebSocket feeds.",
    rationale: "Kafka consumer groups allow parallel processing of massive event volumes without database lock contention.",
    connections: ["kafka-broker", "websocket-hub", "postgres-db"],
  },
  {
    id: "ai-service",
    name: "Spring AI & RAG Engine",
    type: "ai",
    description: "Performs document chunking, semantic vector similarity search with pgvector, and streams grounded context to the LLM.",
    rationale: "Retrieval-Augmented Generation eliminates hallucinations by grounding the assistant strictly in Akshay's verified portfolio data.",
    connections: ["pgvector-db", "llm-provider"],
  },
  {
    id: "kafka-broker",
    name: "Apache Kafka Event Bus",
    type: "messaging",
    description: "Distributed commit log managing partitioned topics for trip events, booking alerts, and sensor telemetry.",
    rationale: "Enables event-driven asynchronous communication, exactly-once processing semantics, and peak-load smoothing.",
    connections: ["trip-service", "telemetry-service"],
  },
  {
    id: "redis-cache",
    name: "Redis In-Memory Distributed Cache",
    type: "cache",
    description: "Low-latency in-memory data store executing Cache-Aside and TTL invalidation strategies.",
    rationale: "Reduces redundant database read pressure by up to 60% and cuts API response times down to sub-10ms.",
    connections: ["postgres-db", "mongo-db"],
  },
  {
    id: "postgres-db",
    name: "PostgreSQL Relational DB (with pgvector)",
    type: "database",
    description: "ACID-compliant transactional relational storage with specialized table partitions and HNSW vector index extensions.",
    rationale: "Provides strong transactional consistency for financial/booking records and fast cosine similarity searches.",
    connections: [],
  },
  {
    id: "mongo-db",
    name: "MongoDB Document Store",
    type: "database",
    description: "Flexible schema BSON document storage for user social profiles, interest matrices, and activity feeds.",
    rationale: "Ideal for evolving JSON schemas and fast document lookups by composite user keys.",
    connections: [],
  },
];
