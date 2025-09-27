import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { DocumentType, Department, Language, UrgencyLevel } from '@/types/document';

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: {
    type?: DocumentType;
    department?: Department;
    language?: Language;
    urgency?: UrgencyLevel;
    dateRange?: string;
  };
  onFiltersChange: (filters: any) => void;
  onClearFilters: () => void;
}

const documentTypes: DocumentType[] = [
  'Invoice', 'Safety Notice', 'HR', 'Engineering Doc', 
  'Regulatory Directive', 'Vendor Doc', 'Technical Drawing',
  'Maintenance Report', 'Incident Report'
];

const departments: Department[] = [
  'Engineering', 'Finance', 'HR', 'Safety', 'Operations', 'Legal', 'Procurement'
];

const languages: Language[] = ['English', 'Malayalam', 'Hybrid'];

const urgencyLevels: UrgencyLevel[] = ['Critical', 'Review', 'Info'];

const dateRanges = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 3 months', value: '3m' },
  { label: 'Last year', value: '1y' },
];

export function SearchFilters({
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
  onClearFilters,
}: SearchFiltersProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;
  const hasActiveFilters = activeFiltersCount > 0;

  const updateFilter = (key: string, value: string | undefined) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined,
    });
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search documents by title, content, or tags..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4"
        />
      </div>

      {/* Filters Bar */}
      <div className="flex items-center space-x-2">
        <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              {hasActiveFilters && (
                <Badge variant="secondary" className="text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Filters</h4>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearFilters}
                    className="text-xs"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              <div className="space-y-3">
                {/* Document Type */}
                <div>
                  <label className="text-sm font-medium">Document Type</label>
                  <Select
                    value={filters.type || ''}
                    onValueChange={(value) => updateFilter('type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Department */}
                <div>
                  <label className="text-sm font-medium">Department</label>
                  <Select
                    value={filters.department || ''}
                    onValueChange={(value) => updateFilter('department', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All departments" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Language */}
                <div>
                  <label className="text-sm font-medium">Language</label>
                  <Select
                    value={filters.language || ''}
                    onValueChange={(value) => updateFilter('language', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All languages" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Urgency */}
                <div>
                  <label className="text-sm font-medium">Urgency</label>
                  <Select
                    value={filters.urgency || ''}
                    onValueChange={(value) => updateFilter('urgency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All urgency levels" />
                    </SelectTrigger>
                    <SelectContent>
                      {urgencyLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Range */}
                <div>
                  <label className="text-sm font-medium">Date Range</label>
                  <Select
                    value={filters.dateRange || ''}
                    onValueChange={(value) => updateFilter('dateRange', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All time" />
                    </SelectTrigger>
                    <SelectContent>
                      {dateRanges.map((range) => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex items-center space-x-2 flex-wrap">
            {filters.type && (
              <Badge variant="secondary" className="space-x-1">
                <span>{filters.type}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0"
                  onClick={() => updateFilter('type', undefined)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {filters.department && (
              <Badge variant="secondary" className="space-x-1">
                <span>{filters.department}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0"
                  onClick={() => updateFilter('department', undefined)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {filters.language && (
              <Badge variant="secondary" className="space-x-1">
                <span>{filters.language}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0"
                  onClick={() => updateFilter('language', undefined)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
}