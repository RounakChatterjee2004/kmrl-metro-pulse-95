import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ProcessingModal } from './ProcessingModal';
import { useLanguage } from '@/contexts/LanguageContext';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  file?: File;
}

interface UploadZoneProps {
  onFilesUploaded: (files: UploadedFile[]) => void;
  onProcessingComplete?: (document: any) => void;
}

export function UploadZone({ onFilesUploaded, onProcessingComplete }: UploadZoneProps) {
  const { t } = useLanguage();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [processingFileName, setProcessingFileName] = useState('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: 'uploading' as const,
      file: file, // Store the actual file for processing
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((fileData) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setUploadedFiles(prev =>
            prev.map(f =>
              f.id === fileData.id
                ? { ...f, progress: 100, status: 'completed' }
                : f
            )
          );
          
          // Start AI processing for the first file after upload completes
          if (fileData === newFiles[0]) {
            setTimeout(() => {
              setProcessingFileName(fileData.name);
              setShowProcessingModal(true);
            }, 1000);
          }
        } else {
          setUploadedFiles(prev =>
            prev.map(f =>
              f.id === fileData.id ? { ...f, progress } : f
            )
          );
        }
      }, 200);
    });

    onFilesUploaded(newFiles);
  }, [onFilesUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    },
  });

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <Card>
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={cn(
              'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
              isDragActive
                ? 'border-primary bg-primary-light/50'
                : 'border-muted-foreground/25 hover:border-primary/50'
            )}
          >
            <input {...getInputProps()} />
            <div className="relative">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <Sparkles className="h-4 w-4 absolute top-0 right-8 text-primary animate-pulse" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {isDragActive ? 'Drop files here' : t('aiPoweredUpload')}
            </h3>
            <p className="text-muted-foreground mb-4">
              {t('dragDropFiles')}
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              {t('supportsFileTypes')}
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-primary/80 mb-4">
              <Sparkles className="h-3 w-3" />
              <span>{t('automaticAISummarization')}</span>
            </div>
            <Button className="mt-2">
              {t('browseFiles')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">{t('uploadedFiles')}</h3>
            <div className="space-y-3">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center space-x-3 p-3 rounded-lg border"
                >
                  <div className="rounded p-2 bg-primary-light">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            file.status === 'completed' 
                              ? 'default' 
                              : file.status === 'error' 
                              ? 'destructive' 
                              : 'secondary'
                          }
                        >
                          {file.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                          {file.status === 'completed' ? 'Completed' : 
                           file.status === 'error' ? 'Error' : 'Uploading'}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={file.progress} className="flex-1" />
                      <span className="text-xs text-muted-foreground min-w-0">
                        {formatFileSize(file.size)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Processing Modal */}
      <ProcessingModal
        isOpen={showProcessingModal}
        fileName={processingFileName}
        file={uploadedFiles.find(f => f.name === processingFileName)?.file}
        onProcessingComplete={(document) => {
          setShowProcessingModal(false);
          onProcessingComplete?.(document);
        }}
      />
    </div>
  );
}