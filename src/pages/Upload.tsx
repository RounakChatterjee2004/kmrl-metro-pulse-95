import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { UploadZone } from '@/components/upload/UploadZone';
import { NotificationsPanel } from '@/components/dashboard/NotificationsPanel';
import { ChatBot } from '@/components/chat/ChatBot';
import { mockNotifications } from '@/data/mockData';
import { toast } from 'sonner';

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
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleFilesUploaded = (files: UploadedFile[]) => {
    console.log('Files uploaded:', files);
    // In a real app, these would be processed and added to the document store
  };

  const handleProcessingComplete = (document: any) => {
    // Store the processed document for the Documents page
    localStorage.setItem('newly-processed-document', JSON.stringify(document));
    
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
            <h1 className="text-3xl font-bold">Upload Documents</h1>
            <p className="text-muted-foreground">
              Upload new documents to the DocuMind AI processing system
            </p>
          </div>

          {/* Upload Instructions */}
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-3">Upload Guidelines</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Supported File Types</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• PDF Documents (.pdf)</li>
                  <li>• Microsoft Word (.doc, .docx)</li>
                  <li>• Microsoft Excel (.xls, .xlsx)</li>
                  <li>• Images (.png, .jpg, .jpeg, .gif)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Best Practices</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use descriptive file names</li>
                  <li>• Maximum file size: 20MB</li>
                  <li>• Ensure documents are readable</li>
                  <li>• Include relevant metadata</li>
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
            <h3 className="text-lg font-semibold mb-3">Processing Information</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                Once uploaded, your documents will be automatically processed by our AI system to:
              </p>
              <ul className="ml-4 space-y-1">
                <li>• Extract key information and metadata</li>
                <li>• Classify document type and department</li>
                <li>• Identify urgency level and priority</li>
                <li>• Generate searchable summaries</li>
                <li>• Apply multilingual processing (English/Malayalam)</li>
              </ul>
              <p className="mt-3">
                Processing typically takes 1-3 minutes depending on document size and complexity.
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

      {/* ChatBot */}
      <ChatBot />
    </div>
  );
}