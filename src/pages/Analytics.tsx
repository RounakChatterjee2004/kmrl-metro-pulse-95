import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { DocumentSelector } from '@/components/analytics/DocumentSelector';
import { DashboardRenderer } from '@/components/analytics/DashboardRenderer';
import { Document } from '@/types/document';
import { mockAnalyticsDocuments } from '@/data/analyticsData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Share, Eye } from 'lucide-react';

export default function Analytics() {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [activeTab, setActiveTab] = useState('summary');

  const handleDocumentSelect = (document: Document) => {
    setSelectedDocument(document);
    setActiveTab('summary');
  };

  const handleNotificationsClick = () => {
    // Handle notifications click
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onNotificationsClick={handleNotificationsClick} unreadCount={0} />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Generate interactive insights from your documents
                </p>
              </div>
              {selectedDocument && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Document Selector */}
              <div className="lg:col-span-1">
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-primary" />
                      Analytics-Ready Documents
                    </CardTitle>
                    <CardDescription>
                      Select a document to generate insights
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DocumentSelector
                      documents={mockAnalyticsDocuments}
                      selectedDocument={selectedDocument}
                      onDocumentSelect={handleDocumentSelect}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Dashboard Content */}
              <div className="lg:col-span-3">
                {selectedDocument ? (
                  <Card className="shadow-soft">
                    <CardHeader>
                      <CardTitle className="text-xl">
                        {selectedDocument.title} - Analytics
                      </CardTitle>
                      <CardDescription>
                        Interactive dashboard generated from document analysis
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="summary">Summary</TabsTrigger>
                          <TabsTrigger value="graphs">Graphs</TabsTrigger>
                          <TabsTrigger value="kpis">KPIs</TabsTrigger>
                        </TabsList>
                        <TabsContent value="summary" className="mt-6">
                          <DashboardRenderer 
                            document={selectedDocument} 
                            view="summary"
                          />
                        </TabsContent>
                        <TabsContent value="graphs" className="mt-6">
                          <DashboardRenderer 
                            document={selectedDocument} 
                            view="graphs"
                          />
                        </TabsContent>
                        <TabsContent value="kpis" className="mt-6">
                          <DashboardRenderer 
                            document={selectedDocument} 
                            view="kpis"
                          />
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="shadow-soft border-dashed border-2 border-muted">
                    <CardContent className="flex flex-col items-center justify-center py-16">
                      <Eye className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                        No Document Selected
                      </h3>
                      <p className="text-sm text-muted-foreground text-center max-w-md">
                        Choose a document from the sidebar to generate interactive analytics 
                        and insights powered by AI analysis.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}