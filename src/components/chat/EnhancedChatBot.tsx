import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface QuickQuery {
  id: string;
  question: string;
  answer: string;
}

const auctionQA: QuickQuery[] = [
  {
    id: '1',
    question: 'What is this document about?',
    answer: 'This is a public auction notice issued by KMRL (Kochi Metro Rail Limited) for the sale of movable property under the Public Premises (Eviction of Unauthorised Occupants) Act, 1971.'
  },
  {
    id: '2',
    question: 'When is the auction date?',
    answer: 'The auction is scheduled for 14th March 2024 at 11:00 AM at JLN Stadium Metro Station, Kochi.'
  },
  {
    id: '3',
    question: 'What is the reserve price?',
    answer: 'The reserve price is ₹25,000/- (Rupees Twenty Five Thousand Only).'
  },
  {
    id: '4',
    question: 'What is the Earnest Money Deposit (EMD)?',
    answer: 'The Earnest Money Deposit (EMD) required is ₹5,000/- (Rupees Five Thousand Only).'
  },
  {
    id: '5',
    question: 'Who can participate in the auction?',
    answer: 'Any interested party can participate in the auction by paying the required EMD and following the terms and conditions mentioned in the notice.'
  },
  {
    id: '6',
    question: 'What documents are required?',
    answer: 'Participants need to bring valid ID proof, PAN card, and the EMD payment receipt. All documents should be in original along with photocopies.'
  }
];

export function EnhancedChatBot() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Welcome! I'm your KMRL Document Assistant. I can help you with questions about the Auction Notice document. Try asking me about auction details, dates, or requirements.`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const response = getResponse(message);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Check for matches in auction QA
    for (const qa of auctionQA) {
      if (lowerQuery.includes(qa.question.toLowerCase().split(' ').slice(0, 3).join(' '))) {
        return qa.answer;
      }
    }

    // Keyword-based responses
    if (lowerQuery.includes('auction') || lowerQuery.includes('sale')) {
      return auctionQA[0].answer;
    }
    if (lowerQuery.includes('date') || lowerQuery.includes('when')) {
      return auctionQA[1].answer;
    }
    if (lowerQuery.includes('price') || lowerQuery.includes('cost')) {
      return auctionQA[2].answer;
    }
    if (lowerQuery.includes('emd') || lowerQuery.includes('deposit')) {
      return auctionQA[3].answer;
    }
    if (lowerQuery.includes('document') || lowerQuery.includes('paper')) {
      return auctionQA[5].answer;
    }
    if (lowerQuery.includes('participate') || lowerQuery.includes('who')) {
      return auctionQA[4].answer;
    }
    if (lowerQuery.includes('kmrl') || lowerQuery.includes('metro')) {
      return 'KMRL (Kochi Metro Rail Limited) is conducting this auction for movable property disposal. The auction follows strict legal procedures under the Public Premises Act, 1971.';
    }
    if (lowerQuery.includes('location') || lowerQuery.includes('where')) {
      return 'The auction will be held at JLN Stadium Metro Station, Kochi. This is one of the major metro stations in the KMRL network.';
    }

    return "I'm specifically designed to help with the KMRL Auction Notice document. Please ask me about auction details, dates, prices, requirements, or participation procedures.";
  };

  const handleQuickQuery = (qa: QuickQuery) => {
    handleSendMessage(qa.question);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50"
        size="lg"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl border-primary/20 z-50 flex flex-col">
      <CardHeader className="pb-3 bg-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bot className="h-5 w-5" />
            KMRL Assistant
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-primary-foreground hover:bg-primary-foreground/20 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-primary-foreground/80">
          Ask me about the Auction Notice document
        </p>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Quick Query Suggestions */}
        <div className="p-3 border-b bg-muted/30">
          <div className="flex flex-wrap gap-1">
            {auctionQA.slice(0, 3).map((qa) => (
              <Badge
                key={qa.id}
                variant="secondary"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground text-xs px-2 py-1"
                onClick={() => handleQuickQuery(qa)}
              >
                <Sparkles className="h-3 w-3 mr-1" />
                {qa.question.split(' ').slice(0, 3).join(' ')}...
              </Badge>
            ))}
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.sender === 'bot' && <Bot className="h-4 w-4 mt-0.5 text-primary" />}
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    {message.sender === 'user' && <User className="h-4 w-4 mt-0.5" />}
                  </div>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2 max-w-[85%]">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-primary" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="border-t p-3">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about the auction notice..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              className="flex-1"
              disabled={isTyping}
            />
            <Button
              onClick={() => handleSendMessage(inputValue)}
              size="sm"
              disabled={!inputValue.trim() || isTyping}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}