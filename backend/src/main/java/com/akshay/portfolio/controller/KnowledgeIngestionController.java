package com.akshay.portfolio.controller;

import com.akshay.portfolio.dto.ApiResponse;
import com.akshay.portfolio.service.KnowledgeIngestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/knowledge")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class KnowledgeIngestionController {

    private final KnowledgeIngestionService knowledgeIngestionService;

    @PostMapping("/ingest")
    public ResponseEntity<ApiResponse<Map<String, Object>>> ingestKnowledge() {
        Map<String, Object> result = knowledgeIngestionService.ingestAllDocuments();
        return ResponseEntity.ok(ApiResponse.ok(result, "Knowledge documents successfully ingested into vector store"));
    }
}
