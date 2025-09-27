import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Mail, Clock, CheckCircle, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Notification {
  title: string;
  description: string;
  type: 'document' | 'system' | 'alert';
  date: string;
  read: boolean;
}

interface AutoDocumentFetcherProps {
  onDocumentFetched: () => void;
  onNotification: (notification: Notification) => void;
  onStartProcessing: (fileName: string, file: File) => void;
}

export function AutoDocumentFetcher({ onDocumentFetched, onNotification, onStartProcessing }: AutoDocumentFetcherProps) {
  const [hasFetched, setHasFetched] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (!hasFetched) {
      // Start the automatic fetch process after 3 seconds
      const initialDelay = setTimeout(() => {
        startEmailFetchProcess();
      }, 3000);

      return () => clearTimeout(initialDelay);
    }
  }, [hasFetched]);

  const startEmailFetchProcess = async () => {
    // Step 1: Document received notification (immediate)
    onNotification({
      title: t('documentReceivedEmail'),
      description: t('kmrlAuctionNoticeReceived'),
      type: 'document',
      date: new Date().toISOString(),
      read: false
    });

    toast.success(t('documentReceivedEmail'), {
      description: t('kmrlAuctionNoticeReceived'),
      icon: <Mail className="h-4 w-4" />,
      duration: 4000,
      position: 'top-center',
      style: {
        background: 'hsl(var(--card))',
        color: 'hsl(var(--card-foreground))',
        border: '1px solid hsl(var(--primary))'
      }
    });

    // Step 2: Start fetching after first toast finishes (5 seconds)
    setTimeout(() => {
      onNotification({
        title: t('fetchingDocument'),
        description: t('retrievingFromEmailServer'),
        type: 'system',
        date: new Date().toISOString(),
        read: false
      });

      toast.loading(t('fetchingDocument'), {
        description: t('retrievingFromEmailServer'),
        icon: <Clock className="h-4 w-4 animate-spin" />,
        id: 'fetching',
        duration: 15000,
        position: 'top-center',
        style: {
          background: 'hsl(var(--card))',
          color: 'hsl(var(--card-foreground))',
          border: '1px solid hsl(var(--primary))'
        }
      });

      // Step 3: Complete fetching after loading toast finishes (15 seconds)
      setTimeout(() => {
        toast.dismiss('fetching');
        
        onNotification({
          title: t('documentFetched'),
          description: t('auctionNoticeProcessed'),
          type: 'system',
          date: new Date().toISOString(),
          read: false
        });

        toast.success(t('documentFetched'), {
          description: t('auctionNoticeReady'),
          icon: <CheckCircle className="h-4 w-4" />,
          duration: 4000,
          position: 'top-center',
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--card-foreground))',
            border: '1px solid hsl(var(--success))'
          }
        });

        // Start processing with LLAMA after success toast finishes (2 seconds)
        setTimeout(async () => {
          // Create a mock file for the KMRL PDF
          try {
            const response = await fetch('/Auction_notice_KMLR.pdf');
            const blob = await response.blob();
            const file = new File([blob], 'Auction_notice_KMLR.pdf', { type: 'application/pdf' });
            
            setHasFetched(true);
            onStartProcessing('Auction_notice_KMLR.pdf', file);
          } catch (error) {
            console.error('Error loading PDF file:', error);
            // Fallback: create a mock file
            const mockContent = new Blob(['Mock KMRL Auction Notice content'], { type: 'application/pdf' });
            const file = new File([mockContent], 'Auction_notice_KMLR.pdf', { type: 'application/pdf' });
            
            setHasFetched(true);
            onStartProcessing('Auction_notice_KMLR.pdf', file);
          }
        }, 2000);

      }, 15000);
    }, 5000);
  };

  // This component doesn't render anything visible
  return null;
}