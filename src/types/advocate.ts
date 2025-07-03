export interface Advocate {
  id?: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
  createdAt?: string;
}

export interface AdvocatesResponse {
  data: Advocate[];
}

export interface SearchFilters {
  searchTerm: string;
}
