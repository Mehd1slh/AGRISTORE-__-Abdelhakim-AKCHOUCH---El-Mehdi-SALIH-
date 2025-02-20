package com.example.llmservice;


import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.QuestionAnswerAdvisor;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/llm")
public class LLMController {

    VectorStore vectorStore;
    ChatClient chatClient;

    public LLMController(ChatClient.Builder  builder, VectorStore vectorStore) {
        this.vectorStore=vectorStore;
        this.chatClient = builder
                .defaultAdvisors(new QuestionAnswerAdvisor((vectorStore)))
                .build();

    }

    @GetMapping(value = "/chatbot/{question}", produces = MediaType.TEXT_MARKDOWN_VALUE)
    public String chat(@PathVariable String question) {
        return chatClient.prompt()
                .system("You are an AI chatbot assistant specialized in agricultural product sales. Provide accurate and helpful responses about our products based off the given product catalog datasource.")
                .user(question)
                .call()
                .content();
    }


}
