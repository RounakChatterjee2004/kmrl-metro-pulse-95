import { useState } from 'react';
import { MessageCircle, Send, X, Bot, User, FileText, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Document-specific Q&A for the KMRL Auction Notice
const documentQA = {
  'auction': 'This is a Public Auction Notice from KMRL for movable property. The auction date is March 14, 2024 at 11:30 AM at JLN Stadium Metro Station.',
  'date': 'The auction is scheduled for March 14, 2024 at 11:30 AM. Inspection dates are March 7 & 11, 2024 between 10:30 AM and 5:30 PM.',
  'price': 'The reserve price is Rs. 25,000/- (Twenty five thousand rupees only). EMD (Earnest Money Deposit) is Rs. 5,000/-.',
  'items': 'The auction includes a KIOSK structure, electrical items (tube lights, fan, bulb), surveillance camera, damaged appliances (ice cream freezer, cooler), kitchen items (glass jars, steel items, electric kettle), and 143 glass bottles of soda/juice.',
  'location': 'The auction will be held at Kochi Metro Rail Ltd., JLN Stadium Metro Station (RHS Ground Floor - near lift), Kaloor - 682017.',
  'inspection': 'Inspection can be done on March 7 & 11, 2024 between 10:30 AM and 5:30 PM after taking prior permission from Estate Officer (0484-2846721).',
  'terms': 'The auction is on "as is where is", "as is what is", "whatever there is" and "without recourse" basis. Bidders must inspect beforehand and cannot raise objections later.',
  'contact': 'For inspection permission, contact Estate Officer at 0484-2846721. The auction is conducted by Kochi Metro Rail Limited.',
  'payment': 'EMD of Rs. 5,000/- is required to participate. The reserve price is Rs. 25,000/-. Sale proceeds will be appropriated towards auction costs.',
  'property': 'The movable property was taken possession by KMRL Estate Officer under Public Premises (Eviction of Unauthorised Occupants) Act, 1971.'
};

const quickQueries = [
  'What is the auction date?',
  'What is the reserve price?',
  'Where is the auction location?',
  'What items are being auctioned?',
  'How can I inspect the items?',
  'What are the terms and conditions?'
];

export function DocumentChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your KMRL Document Assistant. I have information about the Auction Notice document that was just processed. Ask me anything about the auction details, dates, prices, or items!',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

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

    // Simulate bot response
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
    // Check for document-specific keywords
    for (const [key, response] of Object.entries(documentQA)) {
      if (query.includes(key)) {
        return response;
      }
    }

    // Fallback responses
    if (query.includes('hello') || query.includes('hi')) {
      return "Hello! I'm here to help you with information about the KMRL Auction Notice. You can ask me about auction dates, items, prices, or inspection details.";
    }
    
    if (query.includes('help')) {
      return "I can provide information about:\n• Auction date and time\n• Reserve price and EMD\n• Items being auctioned\n• Inspection procedures\n• Location details\n• Terms and conditions\n\nJust ask me anything about the KMRL auction!";
    }

    return "I understand you're asking about the KMRL Auction Notice. Could you be more specific? I can help with auction dates, prices, items, location, inspection details, or terms and conditions.";
  };

  const handleQuickQuery = (query: string) => {
    handleSendMessage(query);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 flex items-end space-x-3">
        {/* Document indicator */}
        <Card className="bg-primary text-primary-foreground animate-pulse">
          <CardContent className="p-3 flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span className="text-sm font-medium">KMRL Document Ready</span>
          </CardContent>
        </Card>
        
        <Button
          className="h-14 w-14 rounded-full shadow-large"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-[420px] h-[600px] shadow-large flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="flex items-center space-x-2">
          <div className="rounded-full bg-primary p-1.5">
            <Bot className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold">KMRL Document Assistant</span>
            <div className="flex items-center space-x-1">
              <Badge variant="secondary" className="text-xs">AI Powered</Badge>
              <Badge variant="outline" className="text-xs">
                <FileText className="h-3 w-3 mr-1" />
                Auction Notice
              </Badge>
            </div>
          </div>
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-4 p-4">
        {/* Document Context Alert */}
        <Alert className="border-primary/30 bg-primary-light/30">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-xs">
            I have full context about the KMRL Auction Notice document. Ask me anything!
          </AlertDescription>
        </Alert>

        {/* Quick Queries */}
        <div className="grid grid-cols-2 gap-2">
          {quickQueries.map((query, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs h-8 justify-start p-2"
              onClick={() => handleQuickQuery(query)}
            >
              <span className="truncate">{query}</span>
            </Button>
          ))}
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 pr-3">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-2 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'bot' && (
                  <div className="rounded-full bg-primary p-1.5 mt-1 flex-shrink-0">
                    <Bot className="h-3 w-3 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-lg p-3 text-sm break-words ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                {message.sender === 'user' && (
                  <div className="rounded-full bg-secondary p-1.5 mt-1 flex-shrink-0">
                    <User className="h-3 w-3 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start space-x-2">
                <div className="rounded-full bg-primary p-1.5 mt-1">
                  <Bot className="h-3 w-3 text-primary-foreground" />
                </div>
                <div className="bg-muted rounded-lg p-3 text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="flex space-x-2">
          <Input
            placeholder="Ask about the auction document..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
            className="text-sm"
          />
          <Button size="sm" onClick={() => handleSendMessage(inputValue)}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}