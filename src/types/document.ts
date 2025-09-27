export interface Document {
  id: string;
  title: string;
  type: DocumentType;
  department: Department;
  date: string;
  language: Language;
  version: string;
  urgency: UrgencyLevel;
  summary: string;
  content?: string;
  fileType: string;
  fileSize: string;
  uploadedBy: string;
  tags: string[];
}

export type DocumentType = 
  | 'Invoice'
  | 'Safety Notice'
  | 'HR'
  | 'Engineering Doc'
  | 'Regulatory Directive'
  | 'Vendor Doc'
  | 'Technical Drawing'
  | 'Maintenance Report'
  | 'Incident Report';

export type Department = 
  | 'Engineering'
  | 'Finance'
  | 'HR'
  | 'Safety'
  | 'Operations'
  | 'Legal'
  | 'Procurement';

export type Language = 'English' | 'Malayalam' | 'Hybrid';

export type UrgencyLevel = 'Critical' | 'Review' | 'Info';

export type UserRole = 'Engineering' | 'Finance' | 'HR' | 'Safety' | 'Executive';

export interface Alert {
  id: string;
  title: string;
  description: string;
  urgency: UrgencyLevel;
  type: 'regulatory' | 'safety' | 'financial' | 'operational';
  documentId?: string;
  date: string;
  acknowledged: boolean;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
  type: 'document' | 'system' | 'alert';
}

export interface DashboardMetric {
  id: string;
  title: string;
  value: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  category: string;
}