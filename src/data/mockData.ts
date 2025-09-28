import { Document, Alert, Notification, DashboardMetric, UserRole } from '@/types/document';

export const mockDocuments: Document[] = [
  {
    id: 'kmrl-auction-notice',
    title: 'KMRL Public Auction Notice - Surplus Materials Sale',
    type: 'Regulatory Directive',
    department: 'Procurement',
    date: new Date().toISOString(),
    language: 'English',
    version: 'v1',
    urgency: 'Review',
    summary: 'Official auction notice from Kochi Metro Rail Limited for surplus materials including track components, construction materials, electrical equipment, office furniture, and vehicle parts.',
    fileType: 'PDF',
    fileSize: '1.65 MB',
    uploadedBy: 'Email System',
    tags: ['AI-Processed', 'Legal/Regulatory', 'Analytics-Ready', 'KMRL', 'Auction Notice'],
    content: `KOCHI METRO RAIL LIMITED (KMRL)
AUCTION NOTICE - Surplus Materials Sale

Date: December 2024
Location: Kochi Metro Rail Limited, Administrative Building

AUCTION DETAILS:
1. Railway Track Components - Rails, sleepers, fastening systems
2. Construction Materials - Cement, steel reinforcement
3. Electrical Equipment - Cables, transformers, control panels
4. Office Furniture - Desks, chairs, filing cabinets
5. Vehicle Parts - Bus spare parts and maintenance equipment

TERMS: All items "as is where is" basis, payment within 7 days
REGISTRATION: ₹5,000 (non-refundable)
AUCTION DATE: December 28, 2024 at 10:00 AM
INSPECTION: December 20-21, 2024

Contact: procurement@kochimetro.org | +91-484-2506001`
  },
  {
    id: '1',
    title: 'Track Maintenance Schedule Q4 2024',
    type: 'Engineering Doc',
    department: 'Engineering',
    date: '2024-01-15',
    language: 'English',
    version: 'v2',
    urgency: 'Critical',
    summary: 'Comprehensive maintenance schedule for track sections requiring immediate attention before monsoon season.',
    fileType: 'PDF',
    fileSize: '2.4 MB',
    uploadedBy: 'Rajesh Kumar',
    tags: ['maintenance', 'tracks', 'critical']
  },
  {
    id: '2',
    title: 'Vendor Payment Invoice - Siemens',
    type: 'Invoice',
    department: 'Finance',
    date: '2024-01-14',
    language: 'English',
    version: 'v1',
    urgency: 'Review',
    summary: 'Invoice for electrical equipment maintenance and spare parts delivery.',
    fileType: 'PDF',
    fileSize: '580 KB',
    uploadedBy: 'Priya Nair',
    tags: ['payment', 'vendor', 'siemens']
  },
  {
    id: '3',
    title: 'സുരക്ഷാ നിർദ്ദേശങ്ങൾ - പ്ലാറ്റ്ഫോം ഏരിയ',
    type: 'Safety Notice',
    department: 'Safety',
    date: '2024-01-13',
    language: 'Malayalam',
    version: 'v1',
    urgency: 'Critical',
    summary: 'Platform area safety guidelines for staff during peak hours and emergency procedures.',
    fileType: 'PDF',
    fileSize: '1.2 MB',
    uploadedBy: 'Suresh Menon',
    tags: ['safety', 'platform', 'malayalam']
  },
  {
    id: '4',
    title: 'New Employee Onboarding Checklist',
    type: 'HR',
    department: 'HR',
    date: '2024-01-12',
    language: 'Hybrid',
    version: 'v3',
    urgency: 'Info',
    summary: 'Updated onboarding process for new technical staff including safety certification requirements.',
    fileType: 'DOCX',
    fileSize: '890 KB',
    uploadedBy: 'Maya Joseph',
    tags: ['hr', 'onboarding', 'certification']
  },
  {
    id: '5',
    title: 'CMRS Compliance Report 2024',
    type: 'Regulatory Directive',
    department: 'Safety',
    date: '2024-01-11',
    language: 'English',
    version: 'v1',
    urgency: 'Critical',
    summary: 'Annual compliance report for Commissioner of Metro Rail Safety with pending action items.',
    fileType: 'PDF',
    fileSize: '3.1 MB',
    uploadedBy: 'Dr. Vinod Krishnan',
    tags: ['compliance', 'cmrs', 'regulatory']
  },
  {
    id: '6',
    title: 'Rolling Stock Maintenance Log',
    type: 'Engineering Doc',
    department: 'Engineering',
    date: '2024-01-10',
    language: 'English',
    version: 'v4',
    urgency: 'Review',
    summary: 'Daily maintenance logs for all active metro coaches with identified issues and resolutions.',
    fileType: 'XLSX',
    fileSize: '1.8 MB',
    uploadedBy: 'Arun Pillai',
    tags: ['maintenance', 'rolling-stock', 'daily-log']
  }
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'CMRS Directive Expiring Soon',
    description: 'Regulatory compliance deadline approaching in 5 days',
    urgency: 'Critical',
    type: 'regulatory',
    documentId: '5',
    date: '2024-01-15',
    acknowledged: false
  },
  {
    id: '2',
    title: 'Safety Notice Pending Acknowledgment',
    description: 'Platform safety guidelines require staff acknowledgment',
    urgency: 'Critical',
    type: 'safety',
    documentId: '3',
    date: '2024-01-14',
    acknowledged: false
  },
  {
    id: '3',
    title: 'Overdue Invoice Payment',
    description: 'Siemens payment due in 2 days',
    urgency: 'Review',
    type: 'financial',
    documentId: '2',
    date: '2024-01-13',
    acknowledged: true
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Safety Circular Uploaded',
    description: 'Platform area safety guidelines added',
    date: '2024-01-15T10:30:00',
    read: false,
    type: 'document'
  },
  {
    id: '2',
    title: 'System Maintenance Complete',
    description: 'Document processing system updated successfully',
    date: '2024-01-15T09:15:00',
    read: false,
    type: 'system'
  },
  {
    id: '3',
    title: 'Invoice Processed',
    description: 'Vendor payment invoice has been processed',
    date: '2024-01-14T16:45:00',
    read: true,
    type: 'document'
  },
  {
    id: '4',
    title: 'Compliance Alert',
    description: 'CMRS report review required',
    date: '2024-01-14T14:20:00',
    read: true,
    type: 'alert'
  }
];

export const mockMetrics: Record<UserRole, DashboardMetric[]> = {
  Engineering: [
    {
      id: '1',
      title: 'Technical Drawings',
      value: 45,
      unit: 'docs',
      change: 12,
      trend: 'up',
      category: 'Documents'
    },
    {
      id: '2',
      title: 'Maintenance Reports',
      value: 23,
      unit: 'pending',
      change: -5,
      trend: 'down',
      category: 'Maintenance'
    },
    {
      id: '3',
      title: 'Design Changes',
      value: 8,
      unit: 'notices',
      change: 3,
      trend: 'up',
      category: 'Engineering'
    }
  ],
  Finance: [
    {
      id: '1',
      title: 'Pending Invoices',
      value: 12,
      unit: 'invoices',
      change: -3,
      trend: 'down',
      category: 'Finance'
    },
    {
      id: '2',
      title: 'Procurement Notices',
      value: 7,
      unit: 'active',
      change: 2,
      trend: 'up',
      category: 'Procurement'
    },
    {
      id: '3',
      title: 'Budget Reports',
      value: 4,
      unit: 'pending',
      change: 0,
      trend: 'stable',
      category: 'Finance'
    }
  ],
  HR: [
    {
      id: '1',
      title: 'Onboarding Docs',
      value: 15,
      unit: 'pending',
      change: 5,
      trend: 'up',
      category: 'HR'
    },
    {
      id: '2',
      title: 'Employee Notices',
      value: 8,
      unit: 'active',
      change: 1,
      trend: 'up',
      category: 'Communications'
    },
    {
      id: '3',
      title: 'Training Records',
      value: 32,
      unit: 'updated',
      change: 7,
      trend: 'up',
      category: 'Training'
    }
  ],
  Safety: [
    {
      id: '1',
      title: 'Safety Circulars',
      value: 6,
      unit: 'pending',
      change: 2,
      trend: 'up',
      category: 'Safety'
    },
    {
      id: '2',
      title: 'Compliance Alerts',
      value: 3,
      unit: 'critical',
      change: -1,
      trend: 'down',
      category: 'Compliance'
    },
    {
      id: '3',
      title: 'Incident Reports',
      value: 2,
      unit: 'this week',
      change: 0,
      trend: 'stable',
      category: 'Incidents'
    }
  ],
  Executive: [
    {
      id: '1',
      title: 'Total Documents',
      value: 1247,
      unit: 'docs',
      change: 89,
      trend: 'up',
      category: 'Overview'
    },
    {
      id: '2',
      title: 'Critical Alerts',
      value: 5,
      unit: 'active',
      change: -2,
      trend: 'down',
      category: 'Alerts'
    },
    {
      id: '3',
      title: 'Departments Active',
      value: 7,
      unit: 'depts',
      change: 0,
      trend: 'stable',
      category: 'Operations'
    }
  ]
};

export const chatResponses: Record<string, string> = {
  'safety bulletins': 'Found 3 safety bulletins from last week: Platform Safety Guidelines (Malayalam), Emergency Evacuation Procedures, and Track Worker Safety Protocol. All require immediate review.',
  'regulatory directives': 'Current regulatory directives expiring soon: CMRS Compliance Report (5 days), Environmental Impact Assessment (12 days), and Fire Safety Certification (18 days).',
  'invoice trends': 'Invoice processing has improved by 23% this month. Average processing time: 2.3 days. Pending invoices reduced from 18 to 12. Major vendors: Siemens, BEML, Alstom.',
  'document status': 'System currently processing 1,247 documents. 156 pending review, 23 require immediate attention, and 8 are awaiting approval. Processing efficiency up 15% this quarter.',
  'maintenance reports': 'Latest maintenance reports show 12 active items: 3 critical track sections, 5 rolling stock issues, and 4 station equipment updates. All scheduled for completion within 10 days.'
};