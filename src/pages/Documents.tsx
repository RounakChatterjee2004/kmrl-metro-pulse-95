import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { SearchFilters } from '@/components/documents/SearchFilters';
import { DocumentCard } from '@/components/documents/DocumentCard';
import { DocumentPreviewModal } from '@/components/documents/DocumentPreviewModal';
import { NotificationsPanel } from '@/components/dashboard/NotificationsPanel';
import { DocumentChatBot } from '@/components/chat/DocumentChatBot';
import { Document } from '@/types/document';
import { mockDocuments, mockNotifications, getTranslatedDocuments } from '@/data/mockData';
import { FileText, Grid, List, SortAsc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSelector } from '@/components/layout/LanguageSelector';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Documents() {
  const [searchParams] = useSearchParams();
  const { t, language } = useLanguage();
  
  // Get all translations object for passing to helper function
  const allTranslations = {
    documentData: t('documentData')
  };
  
  const translatedDocuments = getTranslatedDocuments(language, allTranslations);
  const [documents, setDocuments] = useState<Document[]>(translatedDocuments);
  const [currentDocument, setCurrentDocument] = useState<any>(null);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>(translatedDocuments);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('date');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [highlightedDocId, setHighlightedDocId] = useState<string | null>(null);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  // Update documents when language changes
  useEffect(() => {
    const allTranslations = {
      documentData: t('documentData')
    };
    const newTranslatedDocuments = getTranslatedDocuments(language, allTranslations);
    setDocuments(newTranslatedDocuments);
    setFilteredDocuments(newTranslatedDocuments);
  }, [language, t]);

  useEffect(() => {
    // Check for newly processed document from localStorage
    const newlyProcessedDoc = localStorage.getItem('newly-processed-document');
    if (newlyProcessedDoc) {
      const parsedDoc = JSON.parse(newlyProcessedDoc);
      
      // Add the new document to the list
      setDocuments(prev => [parsedDoc, ...prev]);
      setFilteredDocuments(prev => [parsedDoc, ...prev]);
      
      // Set current document for chatbot if it has auction data
      if (parsedDoc.hasAuctionData) {
        setCurrentDocument(parsedDoc);
      }
      
      // Clear from localStorage
      localStorage.removeItem('newly-processed-document');
    }

    // Auto-preview document if preview param is in URL
    const previewId = searchParams.get('preview');
    if (previewId) {
      const doc = documents.find(d => d.id === previewId) || 
                  (newlyProcessedDoc ? JSON.parse(newlyProcessedDoc) : null);
      if (doc) {
        setSelectedDocument(doc);
        setHighlightedDocId(previewId);
        // Remove highlight after 3 seconds
        setTimeout(() => {
          setHighlightedDocId(null);
        }, 3000);
      }
    }

    // Check for highlight parameter
    const highlightId = searchParams.get('highlight');
    if (highlightId) {
      setHighlightedDocId(highlightId);
      
      // Auto-open the highlighted document
      const docToHighlight = documents.find(doc => doc.id === highlightId) || 
                            (newlyProcessedDoc ? JSON.parse(newlyProcessedDoc) : null);
      if (docToHighlight) {
        setTimeout(() => {
          setSelectedDocument(docToHighlight);
        }, 500);
      }
      
      // Remove highlight after 3 seconds
      setTimeout(() => {
        setHighlightedDocId(null);
      }, 3000);
    }
  }, [searchParams, documents]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterDocuments(query, filters, sortBy);
  };

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    filterDocuments(searchQuery, newFilters, sortBy);
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    filterDocuments(searchQuery, filters, newSortBy);
  };

  const filterDocuments = (query: string, currentFilters: any, currentSort: string) => {
    let filtered = [...documents];

    // Apply text search
    if (query) {
      filtered = filtered.filter(doc =>
        doc.title.toLowerCase().includes(query.toLowerCase()) ||
        doc.summary.toLowerCase().includes(query.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }

    // Apply filters
    if (currentFilters.type) {
      filtered = filtered.filter(doc => doc.type === currentFilters.type);
    }
    if (currentFilters.department) {
      filtered = filtered.filter(doc => doc.department === currentFilters.department);
    }
    if (currentFilters.language) {
      filtered = filtered.filter(doc => doc.language === currentFilters.language);
    }
    if (currentFilters.urgency) {
      filtered = filtered.filter(doc => doc.urgency === currentFilters.urgency);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (currentSort) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'urgency':
          const urgencyOrder = { 'Critical': 3, 'Review': 2, 'Info': 1 };
          return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
        case 'type':
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });

    setFilteredDocuments(filtered);
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchQuery('');
    setFilteredDocuments(documents);
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{t('documents')}</h1>
              <p className="text-muted-foreground">
                {t('manageSearchDocuments')}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Language Selector */}
              <LanguageSelector />
              
              {/* Sort Options */}
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-40">
                  <SortAsc className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">{t('latestFirst')}</SelectItem>
                  <SelectItem value="title">{t('titleAZ')}</SelectItem>
                  <SelectItem value="urgency">{t('urgency')}</SelectItem>
                  <SelectItem value="type">{t('documentType')}</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="flex items-center rounded-lg border">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <SearchFilters
            searchQuery={searchQuery}
            onSearchChange={handleSearch}
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
          />

          {/* Results Summary */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {t('showingResults')} {filteredDocuments.length} {t('ofDocuments')} {documents.length} {t('documentsText')}
            </span>
            {(searchQuery || Object.keys(filters).length > 0) && (
              <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                {t('clearAllFilters')}
              </Button>
            )}
          </div>

          {/* Documents Grid/List */}
          {filteredDocuments.length > 0 ? (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }>
              {filteredDocuments.map((document) => (
                <div
                  key={document.id}
                  className={highlightedDocId === document.id ? 'animate-pulse ring-2 ring-primary rounded-lg' : ''}
                >
                  <DocumentCard
                    document={document}
                    onPreview={setSelectedDocument}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">{t('noDocumentsFound')}</h3>
              <p className="text-muted-foreground">
                {t('adjustSearchTerms')}
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Document Preview Modal */}
      <DocumentPreviewModal
        document={selectedDocument}
        isOpen={!!selectedDocument}
        onClose={() => setSelectedDocument(null)}
      />

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
      <DocumentChatBot documentData={currentDocument} />
    </div>
  );
}