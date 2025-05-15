'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HStack, VStack } from '@/components/utilities';
import { MessageCircle, Send, X } from 'lucide-react';
import React, { useRef, useState } from 'react';

type Message = {
  id: string;
  content: string;
  isUser: boolean;
};

const AIChatAssistant = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', content: 'Hello! How can I help you find products today?', isUser: false },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: prompt,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setPrompt('');
    setIsLoading(true);

    // Scroll to bottom after adding user message
    setTimeout(scrollToBottom, 100);

    try {
      // Mock AI response - replace with actual API call
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: `Here are some products matching "${prompt}". You might like our premium collection.`,
          isUser: false,
        };

        setMessages((prev) => [...prev, aiResponse]);
        setIsLoading(false);

        // Scroll to bottom after adding AI response
        setTimeout(scrollToBottom, 100);
      }, 1000);

      // Actual API call would look something like:
      // const response = await fetch('/api/ai-search', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ prompt }),
      // });
      // const data = await response.json();
      // setMessages(prev => [...prev, { id: Date.now().toString(), content: data.message, isUser: false }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), content: 'Sorry, I encountered an error. Please try again.', isUser: false },
      ]);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button className="h-14 w-14 rounded-full bg-primary-500 shadow-lg hover:bg-primary-600" onClick={() => setIsOpen(true)}>
            <MessageCircle className="h-6 w-6 text-white" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-80 rounded-xl border-none p-0 shadow-xl sm:w-96" align="end" side="top" sideOffset={16}>
          <div className="flex h-[450px] flex-col overflow-hidden rounded-xl">
            {/* Header */}
            <HStack className="bg-primary-500 p-3 text-white" pos="apart">
              <h3 className="font-semibold">AI Shopping Assistant</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-white hover:bg-primary-600"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </HStack>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
              <VStack spacing={12}>
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.isUser ? 'rounded-tr-none bg-primary-500 text-white' : 'rounded-tl-none border bg-white shadow-sm'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg rounded-tl-none border bg-white p-3 shadow-sm">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-300" style={{ animationDelay: '0ms' }}></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-300" style={{ animationDelay: '150ms' }}></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-300" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </VStack>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t bg-white p-3">
              <HStack spacing={8}>
                <Input
                  ref={inputRef}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ask about products..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" className="h-10 w-10 rounded-full" disabled={isLoading || !prompt.trim()}>
                  <Send className="h-5 w-5" />
                </Button>
              </HStack>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AIChatAssistant;
