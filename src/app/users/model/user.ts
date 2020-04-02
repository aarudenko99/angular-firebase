export interface User {
  id: string;
  displayName: string;
  email: string;
  photoURL: string;
  isAdmin: boolean;
  first_name?: string;
  last_name?: string;
  dob?: string;
  isActive: boolean;
}
