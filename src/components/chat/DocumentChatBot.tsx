import { useState } from 'react';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface DocumentChatBotProps {
  documentData?: any;
}

const auctionQuestions = [
  'What is the reserve price for the KMRL auction?',
  'When is the auction date and time?',
  'What items are included in the auction?'
];

const auctionAnswers = [
  'The reserve price for the KMRL movable property auction is Rs. 25,000/- (Rupees Twenty five thousand only).',
  'The auction is scheduled for 14/03/2024 at 11:30 AM at JLN Stadium Metro Station.',
  'The auction includes various items like kiosk structure, electronic equipment, kitchen items, and 143 glass bottles among others.'
];

export function DocumentChatBot({ documentData }: DocumentChatBotProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: documentData 
        ? `Hello! I'm your DocuMind AI Assistant. I can help you with questions about the uploaded KMRL auction document.`
        : 'Hello! I\'m your DocuMind AI Assistant. I can help you find documents and answer questions.',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getDocumentResponse(message.toLowerCase());
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getDocumentResponse = (query: string): string => {
    if (!documentData) {
      return "I can help you with document queries once you upload or process documents.";
    }

    if (query.includes('reserve price') || query.includes('price')) {
      return auctionAnswers[0];
    }
    if (query.includes('auction date') || query.includes('date') || query.includes('time')) {
      return auctionAnswers[1];
    }
    if (query.includes('items') || query.includes('auction list')) {
      return auctionAnswers[2];
    }

    return `Based on the uploaded KMRL auction document, I can help you with information about the auction details, items, pricing, and procedures.`;
  };

  if (!isOpen) {
    return (
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-large z-50"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-large flex flex-col z-50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center space-x-2">
          <div className="rounded-full bg-primary p-1">
            <Bot className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-sm">DocuMind Assistant</span>
          <Badge variant="secondary" className="text-xs">AI</Badge>
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-3 p-3 overflow-hidden">
        {documentData && (
          <div className="flex flex-wrap gap-1 overflow-hidden">
            {auctionQuestions.slice(0, 3).map((query, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs h-6 flex-shrink-0"
                onClick={() => handleSendMessage(query)}
              >
                {query.length > 25 ? query.substring(0, 25) + '...' : query}
              </Button>
            ))}
          </div>
        )}

        <ScrollArea className="flex-1 pr-2">
          <div className="space-y-3 pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-2 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'bot' && (
                  <div className="rounded-full bg-primary p-1 mt-1 flex-shrink-0">
                    <Bot className="h-3 w-3 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-lg p-2 text-xs break-words ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                {message.sender === 'user' && (
                  <div className="rounded-full bg-secondary p-1 mt-1 flex-shrink-0">
                    <User className="h-3 w-3 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start space-x-2">
                <div className="rounded-full bg-primary p-1 mt-1 flex-shrink-0">
                  <Bot className="h-3 w-3 text-primary-foreground" />
                </div>
                <div className="bg-muted rounded-lg p-2 text-xs">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex space-x-2 flex-shrink-0">
          <Input
            placeholder="Ask me about the document..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
            className="text-xs flex-1"
          />
          <Button size="sm" onClick={() => handleSendMessage(inputValue)} className="flex-shrink-0">
            <Send className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}