import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LlmService } from '../../services/llm/llm.service';  // Import AI service

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  isOpen = false;
  userInput = '';
  messages: { text: string; sender: 'user' | 'assistant' }[] = [];

  constructor(private llmService: LlmService) {}

  // Toggle chatbot visibility
  toggleChatbot() {
    this.isOpen = !this.isOpen;
  }

  // Send message to AI and get response
  sendMessage() {
    if (!this.userInput.trim()) return; // Don't send empty messages

    const userMessage = this.userInput;
    this.messages.push({ text: userMessage, sender: 'user' });

    // Build conversation history (to send full context)
    const conversation = this.messages.map(msg => `${msg.sender}: ${msg.text}`).join('\n');

    // Call the LLM service to get the response from AI
    this.llmService.getAiResponse(conversation).subscribe(response => {
      this.messages.push({ text: response, sender: 'assistant' });
    });

    this.userInput = ''; // Clear the input field after sending the message
  }
}
