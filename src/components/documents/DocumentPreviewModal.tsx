import { Document } from '@/types/document';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  Download, 
  Share, 
  Calendar, 
  User, 
  Globe,
  Tag,
  Clock,
  AlertTriangle,
  Info
} from 'lucide-react';

interface DocumentPreviewModalProps {
  document: Document | null;
  isOpen: boolean;
  onClose: () => void;
}

const urgencyIcons = {
  Critical: AlertTriangle,
  Review: Clock,
  Info: Info,
};

export function DocumentPreviewModal({ 
  document, 
  isOpen, 
  onClose 
}: DocumentPreviewModalProps) {
  if (!document) return null;

  const UrgencyIcon = urgencyIcons[document.urgency];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="rounded-lg bg-primary-light p-2">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold leading-tight">
                  {document.title}
                </h2>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline">{document.type}</Badge>
                  <Badge variant="outline">{document.department}</Badge>
                  <Badge 
                    variant={document.urgency === 'Critical' ? 'destructive' : 'secondary'}
                  >
                    <UrgencyIcon className="h-3 w-3 mr-1" />
                    {document.urgency}
                  </Badge>
                </div>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary */}
          <div>
            <h3 className="font-semibold mb-2">Summary</h3>
            <p className="text-muted-foreground leading-relaxed">
              {document.summary}
            </p>
          </div>

          <Separator />

          {/* Metadata */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Document Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Date: {new Date(document.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Uploaded by: {document.uploadedBy}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Language: {document.language}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {document.fileType} • {document.fileSize} • {document.version}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {document.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          {/* Version History */}
          <div>
            <h3 className="font-semibold mb-3">Version History</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-3">
                  <Badge variant="default">Current</Badge>
                  <span className="font-medium">{document.version}</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(document.date).toLocaleDateString()}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  by {document.uploadedBy}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <Badge variant="outline">Previous</Badge>
                  <span className="font-medium">v1</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  by {document.uploadedBy}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="space-x-2">
              <Button variant="default" className="space-x-2">
                <FileText className="h-4 w-4" />
                <span>View Full Document</span>
              </Button>
              <Button variant="outline" className="space-x-2">
                <Download className="h-4 w-4" />
                <span>Download</span>
              </Button>
              <Button variant="outline" className="space-x-2">
                <Share className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}