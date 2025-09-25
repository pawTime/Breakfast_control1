import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, Users, Coffee } from 'lucide-react';
import { FilterType, Guest } from '@/types/breakfast';

interface SearchFiltersProps {
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
  guests: Guest[];
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, onFiltersChange, guests }) => {
  const belumMakanCount = guests.filter(guest => guest.consumed === 0).length;
  const sudahMakanCount = guests.filter(guest => guest.consumed > 0).length;
  return (
    <Card className="shadow-[var(--shadow-card)]">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by room number or guest name..."
                value={filters.search}
                onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
                className="pl-10 h-11"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filters.showEntitled ? "default" : "outline"}
              size="sm"
              onClick={() => onFiltersChange({ ...filters, showEntitled: !filters.showEntitled })}
              className={filters.showEntitled ? "bg-hotel-warning" : ""}
            >
              <Users className="w-4 h-4 mr-2" />
              Entitled ({belumMakanCount})
            </Button>
            <Button
              variant={filters.showConsumed ? "default" : "outline"}
              size="sm"
              onClick={() => onFiltersChange({ ...filters, showConsumed: !filters.showConsumed })}
              className={filters.showConsumed ? "bg-hotel-success" : ""}
            >
              <Coffee className="w-4 h-4 mr-2" />
              Consume ({sudahMakanCount})
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchFilters;