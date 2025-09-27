import { Document } from '@/types/document';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar, 
  User, 
  Globe,
  AlertTriangle,
  Clock,
  Info as InfoIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DocumentCardProps {
  document: Document;
  onPreview: (document: Document) => void;
}

const urgencyColors = {
  Critical: 'destructive',
  Review: 'secondary',
  Info: 'outline',
} as const;

const urgencyIcons = {
  Critical: AlertTriangle,
  Review: Clock,
  Info: InfoIcon,
};

export function DocumentCard({ document, onPreview }: DocumentCardProps) {
  const UrgencyIcon = urgencyIcons[document.urgency as keyof typeof urgencyIcons] || InfoIcon;

  return (
    <Card className="hover-lift cursor-pointer transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="rounded-lg bg-primary-light p-2">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm leading-tight line-clamp-2">
                {document.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {document.summary}
              </p>
            </div>
          </div>
          <Badge 
            variant={urgencyColors[document.urgency as keyof typeof urgencyColors] || 'outline'}
            className="shrink-0 text-xs"
          >
            <UrgencyIcon className="h-3 w-3 mr-1" />
            {document.urgency}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Document Info */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center space-x-1 text-muted-foreground">
            <FileText className="h-3 w-3" />
            <span>{document.type}</span>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{new Date(document.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <User className="h-3 w-3" />
            <span>{document.department}</span>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Globe className="h-3 w-3" />
            <span>{document.language}</span>
          </div>
        </div>

        {/* Tags */}
        {document.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {document.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                {tag}
              </Badge>
            ))}
            {document.tags.length > 3 && (
              <Badge variant="outline" className="text-xs px-1 py-0">
                +{document.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* File Info */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="text-xs text-muted-foreground">
            {document.fileType} • {document.fileSize} • {document.version}
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2"
              onClick={(e) => {
                e.stopPropagation();
                onPreview(document);
              }}
            >
              <Eye className="h-3 w-3 mr-1" />
              Preview
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2"
              onClick={(e) => e.stopPropagation()}
            >
              <Download className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}