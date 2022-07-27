export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: string | null;
  image: string | null;
  role: string;
}
