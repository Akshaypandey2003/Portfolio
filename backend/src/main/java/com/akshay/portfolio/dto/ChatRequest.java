package com.akshay.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRequest {
    private String conversationId;

    @NotBlank(message = "Message query cannot be blank")
    @Size(max = 2000, message = "Message query cannot exceed 2000 characters")
    private String message;
}
