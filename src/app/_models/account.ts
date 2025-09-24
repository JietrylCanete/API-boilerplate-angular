export class Account {
  id!: number;
  title!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  role!: string;
  created?: string;
  updated?: string;
  jwtToken?: string;
  isDeleting?: boolean;
  isVerified: boolean = false; // Add a default value
}