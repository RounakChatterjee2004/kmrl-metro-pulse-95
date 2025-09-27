import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { UploadZone } from '@/components/upload/UploadZone';
import { NotificationsPanel } from '@/components/dashboard/NotificationsPanel';
import { DocumentChatBot } from '@/components/chat/DocumentChatBot';
import { mockNotifications } from '@/data/mockData';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}

export default function Upload() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [processedDocument, setProcessedDocument] = useState<any>(null);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleFilesUploaded = (files: UploadedFile[]) => {
    console.log('Files uploaded:', files);
    // In a real app, these would be processed and added to the document store
  };

  const handleProcessingComplete = (document: any) => {
    // Store the processed document for the Documents page
    localStorage.setItem('newly-processed-document', JSON.stringify(document));
    
    // Set processed document for chatbot
    setProcessedDocument(document);
    
    toast.success('Document processed successfully!', {
      description: 'Redirecting to document library...'
    });
    
    // Redirect to Documents page after a short delay
    setTimeout(() => {
      navigate('/documents?highlight=' + document.id);
    }, 1000);
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onNotificationsClick={() => setShowNotifications(!showNotifications)}
        unreadCount={unreadNotifications}
      />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">{t('uploadDocuments')}</h1>
            <p className="text-muted-foreground">
              {t('uploadToDocuMind')}
            </p>
          </div>

          {/* Upload Instructions */}
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-3">{t('uploadGuidelines')}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">{t('supportedFileTypes')}</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {t('pdfDocuments')}</li>
                  <li>• {t('msWord')}</li>
                  <li>• {t('msExcel')}</li>
                  <li>• {t('images')}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">{t('bestPractices')}</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {t('descriptiveFileNames')}</li>
                  <li>• {t('maxFileSize')}</li>
                  <li>• {t('readableDocuments')}</li>
                  <li>• {t('relevantMetadata')}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Upload Zone */}
          <UploadZone 
            onFilesUploaded={handleFilesUploaded}
            onProcessingComplete={handleProcessingComplete}
          />

          {/* Processing Information */}
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-3">{t('processingInfo')}</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                {t('aiProcessingDesc')}
              </p>
              <ul className="ml-4 space-y-1">
                <li>• {t('extractKeyInfo')}</li>
                <li>• {t('classifyDocType')}</li>
                <li>• {t('identifyUrgency')}</li>
                <li>• {t('generateSummaries')}</li>
                <li>• {t('multilingualProcessing')}</li>
              </ul>
              <p className="mt-3">
                {t('processingTime')}
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Notifications Panel */}
      {showNotifications && (
        <div className="fixed top-16 right-6 z-50">
          <NotificationsPanel
            notifications={notifications}
            onClose={() => setShowNotifications(false)}
            onMarkAsRead={handleMarkAsRead}
          />
        </div>
      )}

      {/* Document ChatBot */}
      <DocumentChatBot documentData={processedDocument} />
    </div>
  );
}