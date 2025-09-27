import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Sparkles, FileText, Brain, Search, Database, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

// Mock interface for document analysis
interface DocumentAnalysis {
  title: string;
  type: string;
  department: string;
  date: string;
  language: string;
  urgency: 'low' | 'medium' | 'high';
  summary: string;
  keyPoints: string[];
  entities: {
    names: string[];
    places: string[];
    amounts: string[];
  };
  analyticsReady: boolean;
}

interface ProcessingModalProps {
  isOpen: boolean;
  fileName: string;
  file?: File;
  onProcessingComplete: (document: any) => void;
}

export function ProcessingModal({ isOpen, fileName, file, onProcessingComplete }: ProcessingModalProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);

  const steps = [
    { icon: FileText, label: 'Extracting text from document', duration: 2000 },
    { icon: Brain, label: 'LLAMA AI analysis', duration: 5000 },
    { icon: Search, label: 'Processing metadata', duration: 1500 },
    { icon: Database, label: 'Finalizing document', duration: 1000 },
  ];

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setCurrentStep(0);
      setIsComplete(false);
      setError(null);
      setExtractedText('');
      setAnalysis(null);
      return;
    }

    processDocument();
  }, [isOpen, fileName, file]);

  const processDocument = async () => {
    try {
      setError(null);
      
      // Step 1: Extract text (MOCKED)
      setCurrentStep(0);
      setProgress(10);
      
      if (!file) {
        throw new Error('No file provided for processing');
      }

      // MOCK: Use predefined KMRL auction notice content
      const mockDocumentText = `
KOCHI METRO RAIL LIMITED (KMRL)
AUCTION NOTICE

Notice for Public Auction of Surplus Materials

Date: December 2024
Location: Kochi Metro Rail Limited, Administrative Building, Kochi

AUCTION DETAILS:
1. Railway Track Components - Surplus rails, sleepers, and fastening systems
2. Construction Materials - Cement bags, steel reinforcement bars
3. Electrical Equipment - Cables, transformers, and control panels
4. Office Furniture - Desks, chairs, filing cabinets
5. Vehicle Parts - Bus spare parts and maintenance equipment

TERMS AND CONDITIONS:
- All items sold on "as is where is" basis
- Payment must be made within 7 days of auction
- Successful bidders must arrange transportation
- Inspection allowed on December 20-21, 2024
- Registration fee: ₹5,000 (non-refundable)

RESERVE PRICES:
- Track materials: Starting ₹50,000
- Construction materials: Starting ₹25,000
- Electrical equipment: Starting ₹75,000
- Office furniture: Starting ₹10,000
- Vehicle parts: Starting ₹30,000

Contact: procurement@kochimetro.org
Phone: +91-484-2506001
Website: www.kochimetro.org

All bidders must submit documents and comply with KMRL auction guidelines.
Auction scheduled for December 28, 2024 at 10:00 AM.
`;
      
      setExtractedText(mockDocumentText);
      setProgress(30);

      // Step 2: LLAMA AI Analysis (MOCKED)
      setCurrentStep(1);
      await new Promise(resolve => setTimeout(resolve, 2000)); // UI delay
      
      // MOCK: Predefined KMRL analysis results
      const mockAnalysis = {
        title: "KMRL Public Auction Notice - Surplus Materials Sale",
        type: "Legal/Regulatory",
        department: "Procurement",
        language: "English",
        date: new Date().toISOString(),
        summary: "Official auction notice from Kochi Metro Rail Limited for surplus materials including track components, construction materials, electrical equipment, office furniture, and vehicle parts. Auction scheduled for December 28, 2024 with registration fee of ₹5,000.",
        urgency: "medium" as const,
        keyPoints: [
          "Public auction of surplus railway materials",
          "Registration fee: ₹5,000 (non-refundable)",
          "Auction date: December 28, 2024 at 10:00 AM",
          "Items include track materials, electrical equipment, office furniture",
          "Payment due within 7 days of auction",
          "Pre-inspection allowed December 20-21, 2024"
        ],
        entities: {
          names: ["Kochi Metro Rail Limited", "KMRL"],
          places: ["Kochi", "Administrative Building"],
          amounts: ["₹5,000", "₹50,000", "₹25,000", "₹75,000", "₹10,000", "₹30,000"]
        },
        analyticsReady: true
      };
      
      setAnalysis(mockAnalysis);
      setProgress(70);

      // Step 3: Process metadata (MOCKED)
      setCurrentStep(2);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProgress(90);

      // Step 4: Finalize (MOCKED)
      setCurrentStep(3);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(100);
      setIsComplete(true);

      // Create processed document with mocked data
      const processedDocument = {
        id: 'kmrl-auction-' + Date.now(),
        title: mockAnalysis.title,
        type: 'Regulatory Directive' as const,
        department: mockAnalysis.department,
        date: new Date().toISOString(),
        language: mockAnalysis.language,
        version: 'v1',
        urgency: 'Review' as const,
        summary: mockAnalysis.summary,
        content: mockDocumentText,
        fileType: 'PDF',
        fileSize: '1.65 MB',
        uploadedBy: 'Email System',
        tags: [
          'AI-Processed',
          'Legal/Regulatory',
          'Analytics-Ready',
          'KMRL',
          'Auction Notice'
        ],
        keyPoints: mockAnalysis.keyPoints,
        entities: mockAnalysis.entities,
        analyticsReady: mockAnalysis.analyticsReady,
        aiAnalysis: mockAnalysis
      };

      setTimeout(() => {
        onProcessingComplete(processedDocument);
      }, 2000);

    } catch (err) {
      console.error('Document processing error:', err);
      setError(err instanceof Error ? err.message : 'Failed to process document');
      setProgress(0);
      setCurrentStep(0);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            LLAMA AI Document Processing
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          ) : (
            <>
              {/* Processing Progress */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-light mb-4">
                      {isComplete ? (
                        <CheckCircle className="h-8 w-8 text-primary" />
                      ) : (
                        <Brain className="h-8 w-8 text-primary animate-pulse" />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {isComplete ? 'AI Analysis Complete!' : 'Processing with LLAMA AI'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {fileName}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Progress value={progress} className="w-full" />
                    
                    <div className="space-y-2">
                      {steps.map((step, index) => {
                        const StepIcon = step.icon;
                        const isCurrentStep = index === currentStep;
                        const isCompleted = index < currentStep || isComplete;
                        
                        return (
                          <div
                            key={index}
                            className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                              isCurrentStep ? 'bg-primary-light/50' : ''
                            }`}
                          >
                            <div className={`rounded-full p-1 ${
                              isCompleted ? 'bg-primary text-primary-foreground' :
                              isCurrentStep ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                            }`}>
                              {isCompleted ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : (
                                <StepIcon className={`h-4 w-4 ${isCurrentStep ? 'animate-pulse' : ''}`} />
                              )}
                            </div>
                            <span className={`text-sm ${
                              isCurrentStep ? 'font-medium text-foreground' : 'text-muted-foreground'
                            }`}>
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Analysis Preview */}
              {analysis && (
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Brain className="h-4 w-4 text-primary" />
                      LLAMA AI Analysis Results
                    </h4>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">Document Type</span>
                          <div className="mt-1">
                            <Badge variant="outline">{analysis.type}</Badge>
                          </div>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">Department</span>
                          <div className="mt-1">
                            <Badge variant="outline">{analysis.department}</Badge>
                          </div>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">Urgency Level</span>
                          <div className="mt-1">
                            <Badge 
                              variant={analysis.urgency === 'high' ? 'destructive' : 
                                      analysis.urgency === 'medium' ? 'default' : 'secondary'}
                            >
                              {analysis.urgency}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">Analytics Ready</span>
                          <div className="mt-1">
                            <Badge variant={analysis.analyticsReady ? 'default' : 'secondary'}>
                              {analysis.analyticsReady ? 'Yes' : 'No'}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div>
                        <span className="text-sm font-medium text-muted-foreground">AI Summary</span>
                        <p className="mt-1 text-sm text-foreground bg-muted/50 p-3 rounded-lg">
                          {analysis.summary}
                        </p>
                      </div>

                      {analysis.keyPoints.length > 0 && (
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">Key Points</span>
                          <ul className="mt-1 text-sm space-y-1">
                            {analysis.keyPoints.map((point, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {(analysis.entities.names.length > 0 || analysis.entities.places.length > 0 || analysis.entities.amounts.length > 0) && (
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">Extracted Entities</span>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {analysis.entities.names.map((name, index) => (
                              <Badge key={`name-${index}`} variant="secondary" className="text-xs">
                                👤 {name}
                              </Badge>
                            ))}
                            {analysis.entities.places.map((place, index) => (
                              <Badge key={`place-${index}`} variant="secondary" className="text-xs">
                                📍 {place}
                              </Badge>
                            ))}
                            {analysis.entities.amounts.map((amount, index) => (
                              <Badge key={`amount-${index}`} variant="secondary" className="text-xs">
                                💰 {amount}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {isComplete && (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Document analyzed with LLAMA AI and ready for insights.
                    </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-primary">
                    <Sparkles className="h-4 w-4" />
                    <span>Redirecting to document library...</span>
                  </div>
                </div>
              )}
            </>
          )}

          {error && (
            <div className="flex justify-center">
              <Button onClick={() => {setError(null); processDocument();}} variant="outline">
                Try Again
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}