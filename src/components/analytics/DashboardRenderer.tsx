import { Document } from '@/types/document';
import { FinancialDashboard } from './dashboards/FinancialDashboard';
import { AuctionDashboard } from './dashboards/AuctionDashboard';
import { ComplianceDashboard } from './dashboards/ComplianceDashboard';
import { HRDashboard } from './dashboards/HRDashboard';
import { AIInsightsPanel } from './AIInsightsPanel';

interface DashboardRendererProps {
  document: Document;
  view: 'summary' | 'graphs' | 'kpis';
}

export function DashboardRenderer({ document, view }: DashboardRendererProps) {
  const getDashboardComponent = () => {
    // Determine dashboard type based on document content
    if (document.title.toLowerCase().includes('financial') || 
        document.title.toLowerCase().includes('revenue') ||
        document.title.toLowerCase().includes('budget')) {
      return <FinancialDashboard document={document} view={view} />;
    }
    
    if (document.title.toLowerCase().includes('auction') ||
        document.title.toLowerCase().includes('property') ||
        document.title.toLowerCase().includes('asset')) {
      return <AuctionDashboard document={document} view={view} />;
    }
    
    if (document.title.toLowerCase().includes('compliance') ||
        document.title.toLowerCase().includes('audit') ||
        document.title.toLowerCase().includes('regulatory')) {
      return <ComplianceDashboard document={document} view={view} />;
    }
    
    if (document.title.toLowerCase().includes('hr') ||
        document.title.toLowerCase().includes('staff') ||
        document.title.toLowerCase().includes('employee')) {
      return <HRDashboard document={document} view={view} />;
    }

    // Default to financial dashboard
    return <FinancialDashboard document={document} view={view} />;
  };

  return (
    <div className="space-y-6">
      {/* AI Insights Panel */}
      {view === 'summary' && (
        <AIInsightsPanel document={document} />
      )}
      
      {/* Dashboard Content */}
      {getDashboardComponent()}
    </div>
  );
}