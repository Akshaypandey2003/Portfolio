package com.akshay.portfolio.controller;

import com.akshay.portfolio.dto.ApiResponse;
import com.akshay.portfolio.dto.ContactRequest;
import com.akshay.portfolio.entity.ContactMessage;
import com.akshay.portfolio.repository.ContactRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/contact")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class ContactController {

    private final ContactRepository contactRepository;

    @PostMapping
    public ResponseEntity<ApiResponse<ContactMessage>> submitContact(@Valid @RequestBody ContactRequest request) {
        log.info("Received contact form submission from: {} ({})", request.getName(), request.getEmail());

        ContactMessage entity = ContactMessage.builder()
                .name(request.getName())
                .email(request.getEmail())
                .subject(request.getSubject())
                .message(request.getMessage())
                .build();

        ContactMessage saved = contactRepository.save(entity);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok(saved, "Thank you! Your message has been received successfully."));
    }
}
