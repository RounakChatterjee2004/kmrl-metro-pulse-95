import { Document } from '@/types/document';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { FileText, BarChart3, Calendar, Building } from 'lucide-react';

interface DocumentSelectorProps {
  documents: Document[];
  selectedDocument: Document | null;
  onDocumentSelect: (document: Document) => void;
}

export function DocumentSelector({ 
  documents, 
  selectedDocument, 
  onDocumentSelect 
}: DocumentSelectorProps) {
  return (
    <div className="space-y-3">
      {documents.map((document) => (
        <Card
          key={document.id}
          className={cn(
            "cursor-pointer transition-all duration-200 hover:shadow-medium hover-lift",
            selectedDocument?.id === document.id 
              ? "ring-2 ring-primary bg-primary-light/50" 
              : "hover:bg-muted/50"
          )}
          onClick={() => onDocumentSelect(document)}
        >
          <CardContent className="p-4">
            <div className="space-y-3">
              {/* Document Title */}
              <div className="flex items-start gap-2">
                <FileText className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <h4 className="text-sm font-medium line-clamp-2 leading-tight">
                  {document.title}
                </h4>
              </div>

              {/* Analytics Badge */}
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs px-2 py-1">
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Analytics Enabled
                </Badge>
              </div>

              {/* Document Details */}
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  <span>{document.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-3 w-3" />
                  <span>{document.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-3 w-3" />
                  <span>{document.type}</span>
                </div>
              </div>

              {/* Source Tag */}
              <div className="pt-2 border-t">
                <Badge variant="outline" className="text-xs">
                  {document.tags?.[0] || 'Email'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}