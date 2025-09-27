import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Upload, Edit, Eye, Download, Filter, Search, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  documentId?: string;
  documentTitle?: string;
  department: string;
  details: string;
  ipAddress: string;
  status: 'success' | 'failure' | 'pending';
}

const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    timestamp: '2024-03-15T10:30:00Z',
    user: 'Rajesh Kumar',
    action: 'Document Upload',
    documentId: 'DOC-2024-001',
    documentTitle: 'Safety Protocol Update',
    department: 'Safety',
    details: 'Uploaded new safety protocol document (v2.1)',
    ipAddress: '192.168.1.100',
    status: 'success'
  },
  {
    id: '2',
    timestamp: '2024-03-15T09:45:00Z',
    user: 'Priya Nair',
    action: 'Document Edit',
    documentId: 'DOC-2024-002',
    documentTitle: 'Q1 Financial Report',
    department: 'Finance',
    details: 'Modified document metadata and tags',
    ipAddress: '192.168.1.105',
    status: 'success'
  },
  {
    id: '3',
    timestamp: '2024-03-15T09:15:00Z',
    user: 'System',
    action: 'Auto Processing',
    documentId: 'DOC-2024-003',
    documentTitle: 'Auction Notice KMRL',
    department: 'Legal',
    details: 'Automated document processing and classification',
    ipAddress: 'system',
    status: 'success'
  },
  {
    id: '4',
    timestamp: '2024-03-15T08:30:00Z',
    user: 'Admin User',
    action: 'User Access',
    department: 'Administration',
    details: 'Failed login attempt from unauthorized location',
    ipAddress: '203.192.15.45',
    status: 'failure'
  },
  {
    id: '5',
    timestamp: '2024-03-14T16:20:00Z',
    user: 'Arjun Menon',
    action: 'Document Download',
    documentId: 'DOC-2024-001',
    documentTitle: 'Safety Protocol Update',
    department: 'Engineering',
    details: 'Downloaded document for review',
    ipAddress: '192.168.1.120',
    status: 'success'
  }
];

export default function AuditLogs() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUser, setFilterUser] = useState('all');
  const [filterAction, setFilterAction] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredLogs = mockAuditLogs.filter((log) => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (log.documentTitle && log.documentTitle.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesUser = filterUser === 'all' || log.user === filterUser;
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    const matchesDepartment = filterDepartment === 'all' || log.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || log.status === filterStatus;
    
    return matchesSearch && matchesUser && matchesAction && matchesDepartment && matchesStatus;
  });

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'Document Upload':
        return <Upload className="h-4 w-4" />;
      case 'Document Edit':
        return <Edit className="h-4 w-4" />;
      case 'Document Download':
        return <Download className="h-4 w-4" />;
      case 'Document View':
        return <Eye className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'default';
      case 'failure':
        return 'destructive';
      case 'pending':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const uniqueUsers = [...new Set(mockAuditLogs.map(log => log.user))];
  const uniqueActions = [...new Set(mockAuditLogs.map(log => log.action))];
  const uniqueDepartments = [...new Set(mockAuditLogs.map(log => log.department))];

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex-1">
        <Header onNotificationsClick={() => {}} unreadCount={0} />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">{t('auditLogs')}</h1>
            <p className="text-muted-foreground">Track all system activities and document operations</p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters & Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search logs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={filterUser} onValueChange={setFilterUser}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by user" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    {uniqueUsers.map(user => (
                      <SelectItem key={user} value={user}>{user}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterAction} onValueChange={setFilterAction}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Actions</SelectItem>
                    {uniqueActions.map(action => (
                      <SelectItem key={action} value={action}>{action}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {uniqueDepartments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="failure">Failure</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={() => {
                  setSearchTerm('');
                  setFilterUser('all');
                  setFilterAction('all');
                  setFilterDepartment('all');
                  setFilterStatus('all');
                }}>
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Audit Logs Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                System Activity Logs ({filteredLogs.length} entries)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Document</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id} className="hover:bg-muted/50">
                      <TableCell className="font-mono text-sm">
                        {new Date(log.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getActionIcon(log.action)}
                          {log.action}
                        </div>
                      </TableCell>
                      <TableCell>
                        {log.documentTitle ? (
                          <div>
                            <div className="font-medium">{log.documentTitle}</div>
                            <div className="text-sm text-muted-foreground">{log.documentId}</div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.department}</Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate" title={log.details}>
                        {log.details}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(log.status) as any} className="capitalize">
                          {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {filteredLogs.length === 0 && (
            <Card className="text-center py-12 mt-6">
              <CardContent>
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No logs found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search criteria
                </p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}