
export interface Establishment {
  id: string;
  name: string;
  type: string;
  address: string;
  city: string;
  coordinates: [number, number];
  phone?: string;
  website?: string;
  description?: string;
  programs?: string[];
  image?: string;
}

export interface Neighborhood {
  id: string;
  name: string;
  city: string;
  description?: string;
  coordinates: [number, number];
}
