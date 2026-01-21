export type Customer = {
  id: number;
  name: string;
  customer_type: "company" | "person";
  industry?: string; // only for companies
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
}
