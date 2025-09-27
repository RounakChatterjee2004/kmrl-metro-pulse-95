import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Mail, Clock, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FetchSimulationProps {
  onDocumentFetched: () => void;
}

export function FetchSimulation({ onDocumentFetched }: FetchSimulationProps) {
  const { t } = useLanguage();
  const [isSimulating, setIsSimulating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'ready' | 'fetching' | 'processing' | 'complete'>('ready');

  const simulateDocumentFetch = async () => {
    setIsSimulating(true);
    setStage('fetching');
    setProgress(0);

    // Simulate fetching process (15-20 seconds)
    const fetchDuration = 18000; // 18 seconds
    const progressInterval = 100; // Update every 100ms
    const totalSteps = fetchDuration / progressInterval;
    
    let currentStep = 0;
    
    const progressTimer = setInterval(() => {
      currentStep++;
      const newProgress = (currentStep / totalSteps) * 100;
      setProgress(newProgress);
      
      if (currentStep >= totalSteps) {
        clearInterval(progressTimer);
        setStage('processing');
        
        // Brief processing stage
        setTimeout(() => {
          setStage('complete');
          setProgress(100);
          
          // Call completion callback after brief delay
          setTimeout(() => {
            onDocumentFetched();
            setIsSimulating(false);
            setStage('ready');
            setProgress(0);
          }, 2000);
        }, 2000);
      }
    }, progressInterval);
  };

  const getStageText = () => {
    switch (stage) {
      case 'fetching':
        return t('fetchingDocument');
      case 'processing':
        return 'Processing document...';
      case 'complete':
        return t('documentFetched');
      default:
        return '';
    }
  };

  const getStageIcon = () => {
    switch (stage) {
      case 'fetching':
        return <Clock className="h-5 w-5 text-primary animate-spin" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-warning animate-pulse" />;
      case 'complete':
        return <CheckCircle className="h-5 w-5 text-success" />;
      default:
        return <Mail className="h-5 w-5" />;
    }
  };

  if (!isSimulating) {
    return (
      <Card className="border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Mail className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Fetch Document from Email</h3>
          <p className="text-muted-foreground text-center mb-6">
            Simulate fetching the KMRL Auction Notice document from email system
          </p>
          <Button 
            onClick={simulateDocumentFetch}
            className="w-full max-w-xs"
            size="lg"
          >
            <Mail className="h-4 w-4 mr-2" />
            {t('fetchEmail')}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary">
      <CardContent className="py-8">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            {getStageIcon()}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">{getStageText()}</h3>
            <p className="text-sm text-muted-foreground">
              {stage === 'fetching' && 'Connecting to email server and retrieving document...'}
              {stage === 'processing' && 'Analyzing document content and extracting metadata...'}
              {stage === 'complete' && 'Document successfully processed and added to system!'}
            </p>
          </div>
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-xs text-muted-foreground">
              {Math.round(progress)}% complete
            </p>
          </div>
          {stage === 'complete' && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <p className="text-sm text-success font-medium">
                📧 Fetched: Auction_Notice_KMRL.pdf from email
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                File size: 1.65 MB | Type: Legal/Regulatory Document
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}