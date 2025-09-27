import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { RoleSelector } from '@/components/dashboard/RoleSelector';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { NotificationsPanel } from '@/components/dashboard/NotificationsPanel';
import { DocumentSourcesPanel } from '@/components/dashboard/DocumentSourcesPanel';
import { DocumentChatBot } from '@/components/chat/DocumentChatBot';
import { ChatBot } from '@/components/chat/ChatBot';
import { AutoDocumentFetcher } from '@/components/dashboard/AutoDocumentFetcher';
import { ProcessingModal } from '@/components/upload/ProcessingModal';
import { UserRole, Alert, Notification } from '@/types/document';
import { mockMetrics, mockAlerts, mockNotifications } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const [currentRole, setCurrentRole] = useState<UserRole>('Executive');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [documentFetched, setDocumentFetched] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [processingFileName, setProcessingFileName] = useState('');
  const [processingFile, setProcessingFile] = useState<File | null>(null);
  const { t } = useLanguage();

  const metrics = mockMetrics[currentRole];
  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleAlertClick = (alert: Alert) => {
    console.log('Alert clicked:', alert);
    // In a real app, this would navigate to the document or open a modal
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleDocumentFetched = () => {
    setDocumentFetched(true);
    // Add notification about new document
    const newNotification: Notification = {
      id: Date.now().toString(),
      title: t('newDocumentReceived'),
      description: t('auctionNoticeProcessed'),
      type: 'system',
      date: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const handleStartProcessing = (fileName: string, file: File) => {
    setProcessingFileName(fileName);
    setProcessingFile(file);
    setShowProcessingModal(true);
  };

  const handleProcessingComplete = (document: any) => {
    setShowProcessingModal(false);
    setProcessingFileName('');
    setProcessingFile(null);
    setDocumentFetched(true);
    
    // Store the processed document for Documents page
    localStorage.setItem('newly-processed-document', JSON.stringify(document));
    
    console.log('Document processing complete:', document);
    
    // Redirect to documents page with preview using React Router
    setTimeout(() => {
      navigate(`/documents?preview=${document.id}`);
    }, 1500);
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
          {/* Header with Role Selector */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{t('kmrlDocuMindDashboard')}</h1>
              <p className="text-muted-foreground">
                {t('kmrlFullName')} - {t('intelligentDocProcessing')}
              </p>
            </div>
            <RoleSelector
              currentRole={currentRole}
              onRoleChange={setCurrentRole}
            />
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {metrics.map((metric) => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Activity */}
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-semibold mb-4">{t('recentActivity')}</h3>
                <div className="space-y-3">
                  {[
                    {
                      title: t('trackMaintenanceUpdated'),
                      description: t('maintenanceScheduleDesc'),
                      time: `2 ${t('hoursAgo')}`,
                      type: 'document'
                    },
                    {
                      title: t('safetyNoticePublished'),
                      description: t('safetyGuidelinesDesc'),
                      time: `4 ${t('hoursAgo')}`,
                      type: 'safety'
                    },
                    {
                      title: t('invoiceProcessingComplete'),
                      description: t('siemensPaymentDesc'),
                      time: `6 ${t('hoursAgo')}`,
                      type: 'finance'
                    },
                    {
                      title: t('complianceReviewRequired'),
                      description: t('cmrsReportDesc'),
                      time: `8 ${t('hoursAgo')}`,
                      type: 'regulatory'
                    }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'safety' ? 'bg-destructive' :
                        activity.type === 'finance' ? 'bg-success' :
                        activity.type === 'regulatory' ? 'bg-warning' :
                        'bg-info'
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-semibold mb-4">{t('quickActions')}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { title: t('uploadDocument'), icon: '📄', color: 'bg-primary' },
                    { title: t('searchFiles'), icon: '🔍', color: 'bg-secondary' },
                    { title: t('viewAlerts'), icon: '⚠️', color: 'bg-warning' },
                    { title: t('generateReport'), icon: '📊', color: 'bg-success' }
                  ].map((action, index) => (
                    <button
                      key={index}
                      className="flex flex-col items-center space-y-2 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                        {action.icon}
                      </div>
                      <span className="text-sm font-medium">{action.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              <DocumentSourcesPanel />
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

      {/* Auto Document Fetcher */}
      <AutoDocumentFetcher 
        onDocumentFetched={handleDocumentFetched}
        onNotification={addNotification}
        onStartProcessing={handleStartProcessing}
      />

      {/* Processing Modal */}
      <ProcessingModal
        isOpen={showProcessingModal}
        fileName={processingFileName}
        file={processingFile}
        onProcessingComplete={handleProcessingComplete}
      />

      {/* ChatBot - Show document-specific chatbot if document is fetched */}
      {documentFetched ? <DocumentChatBot /> : <ChatBot />}
    </div>
  );
}