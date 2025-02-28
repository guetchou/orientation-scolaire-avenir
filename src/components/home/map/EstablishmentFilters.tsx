
import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export interface EstablishmentFiltersProps {
  selectedCity: string;
  selectedType: string;
  searchTerm: string;
  uniqueCities: string[];
  uniqueTypes: string[];
  onCityChange: (city: string) => void;
  onTypeChange: (type: string) => void;
  onSearchChange: (search: string) => void;
}

export function EstablishmentFilters({
  selectedCity,
  selectedType,
  searchTerm,
  uniqueCities,
  uniqueTypes,
  onCityChange,
  onTypeChange,
  onSearchChange
}: EstablishmentFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Select value={selectedCity} onValueChange={onCityChange}>
          <SelectTrigger>
            <SelectValue placeholder="Toutes les villes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Toutes les villes</SelectItem>
            {uniqueCities.map(city => (
              <SelectItem key={city} value={city}>{city}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1">
        <Select value={selectedType} onValueChange={onTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Tous les types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Tous les types</SelectItem>
            {uniqueTypes.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input 
          placeholder="Rechercher..." 
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  );
}
