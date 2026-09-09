package com.akshay.portfolio.controller;

import com.akshay.portfolio.dto.ApiResponse;
import com.akshay.portfolio.dto.ChatRequest;
import com.akshay.portfolio.dto.ChatResponse;
import com.akshay.portfolio.service.AiChatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AiChatController {

    private final AiChatService aiChatService;

    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(@Valid @RequestBody ChatRequest request) {
        ChatResponse response = aiChatService.processChat(request);
        return ResponseEntity.ok(response);
    }
}
