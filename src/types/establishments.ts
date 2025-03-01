
export interface Establishment {
  id: string;
  name: string;
  type: string;
  city: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  neighborhood?: string;
  website?: string;
  phone?: string;
  email?: string;
  programs?: string[];
  fees?: string;
  admissionProcess?: string;
  facilities?: string[];
  images?: string[];
}

export interface EstablishmentFiltersProps {
  selectedCity: string;
  selectedType: string;
  searchTerm: string;
  uniqueCities: string[];
  uniqueTypes: string[];
  onCityChange: (city: string) => void;
  onTypeChange: (type: string) => void;
  onSearchChange: (search: string) => void;
  searchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
}

export interface EstablishmentListProps {
  establishments: Establishment[];
  selectedEstablishment: Establishment | null;
  onSelectEstablishment?: (establishment: Establishment) => void;
}

export interface MapDisplayProps {
  establishments: Establishment[];
  selectedEstablishment: Establishment | null;
  onSelectEstablishment?: (establishment: Establishment) => void;
  getMarkerIcon?: (type: string) => string;
}
