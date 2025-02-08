
export interface Neighborhood {
  id: string;
  name: string;
  city: string;
  description: string | null;
  type: 'university' | 'school' | 'institute' | null;
  coordinates: [number, number] | null;
  created_at: string | null;
  updated_at: string | null;
}
