package com.akshay.portfolio.service;

import com.akshay.portfolio.ai.prompt.PortfolioPrompts;
import com.akshay.portfolio.dto.ChatRequest;
import com.akshay.portfolio.dto.ChatResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AiChatService {

    private final ChatClient chatClient;
    private final VectorStore vectorStore;

    public ChatResponse processChat(ChatRequest request) {
        String conversationId = request.getConversationId() != null ? 
                request.getConversationId() : UUID.randomUUID().toString();

        log.info("Processing AI Chat query for conversationId [{}]: {}", conversationId, request.getMessage());

        // 1. Semantic retrieval from PGVector Store
        List<Document> similarDocuments = vectorStore.similaritySearch(
                SearchRequest.builder().query(request.getMessage())
                        .topK(4)
                        .similarityThreshold(0.65)
                        .build()
        );

        String context = similarDocuments.stream()
        .map(doc -> String.format("[Source: %s]\n%s",
                doc.getMetadata().getOrDefault("source", "knowledge_doc"),
                doc.getText()))
        .collect(Collectors.joining("\n\n---\n\n"));

        // 2. Format RAG prompt
        String userPrompt = PortfolioPrompts.RAG_USER_PROMPT_TEMPLATE
                .replace("{context}", context.isBlank() ? "No specific documents found. Rely on verified baseline data." : context)
                .replace("{question}", request.getMessage());

        // 3. Generate answer from LLM (Ollama/Qwen or OpenAI)
        String answer = chatClient.prompt()
                .system(PortfolioPrompts.SYSTEM_PROMPT)
                .user(userPrompt)
                .call()
                .content();

        // 4. Map sources DTO
        List<ChatResponse.SourceDto> sources = similarDocuments.stream()
                .map(doc -> ChatResponse.SourceDto.builder()
                        .title(String.valueOf(doc.getMetadata().getOrDefault("title", "Portfolio Knowledge")))
                        .section(String.valueOf(doc.getMetadata().getOrDefault("section", "General")))
                        .source(String.valueOf(doc.getMetadata().getOrDefault("source", "portfolio.md")))
                        .metadata(doc.getMetadata())
                        .build())
                .collect(Collectors.toList());

        return ChatResponse.builder()
                .conversationId(conversationId)
                .answer(answer)
                .sources(sources)
                .timestamp(Instant.now())
                .build();
    }
}
