package com.akshay.portfolio.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.document.Document;
import org.springframework.ai.reader.markdown.MarkdownDocumentReader;
import org.springframework.ai.reader.markdown.config.MarkdownDocumentReaderConfig;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class KnowledgeIngestionService {

    private final VectorStore vectorStore;

    @Value("${portfolio.knowledge-path:./knowledge}")
    private String knowledgePath;

    public Map<String, Object> ingestAllDocuments() {
        log.info("Starting knowledge base ingestion from path: {}", knowledgePath);
        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        List<Document> allChunks = new ArrayList<>();
        List<String> ingestedFiles = new ArrayList<>();

        try {
            Resource[] resources = resolver.getResources("file:" + knowledgePath + "/*.md");
            TokenTextSplitter splitter = new TokenTextSplitter(400, 50, 10, 1000, true);

            for (Resource resource : resources) {
                String filename = resource.getFilename();
                log.info("Ingesting document: {}", filename);
                
                MarkdownDocumentReaderConfig config = MarkdownDocumentReaderConfig.builder()
                        .withIncludeCodeBlock(true)
                        .withIncludeBlockquote(true)
                        .build();

                MarkdownDocumentReader reader = new MarkdownDocumentReader(resource, config);
                List<Document> docs = reader.get();

                for (Document doc : docs) {
                    doc.getMetadata().put("source", filename);
                    doc.getMetadata().put("ingested_at", System.currentTimeMillis());
                }

                List<Document> splitDocs = splitter.apply(docs);
                allChunks.addAll(splitDocs);
                ingestedFiles.add(filename);
            }

            if (!allChunks.isEmpty()) {
                log.info("Writing {} embedding chunks to PGVector store...", allChunks.size());
                vectorStore.accept(allChunks);
            }

        } catch (IOException e) {
            log.error("Failed to read knowledge documents", e);
            throw new RuntimeException("Knowledge ingestion failed: " + e.getMessage(), e);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("totalDocuments", ingestedFiles.size());
        response.put("totalChunks", allChunks.size());
        response.put("documents", ingestedFiles);
        response.put("timestamp", System.currentTimeMillis());
        return response;
    }
}
