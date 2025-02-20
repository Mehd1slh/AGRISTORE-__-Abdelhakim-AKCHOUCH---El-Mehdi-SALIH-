export interface Client {
  id: number; // Make id optional for new registrations
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles?: string[];
}
