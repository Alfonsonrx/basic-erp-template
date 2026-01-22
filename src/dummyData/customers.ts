import type { Customer } from "@types";

export const customers: Customer[] = [
  {
    id: 1,
    name: "Acme Corp",
    customer_type: "company",
    industry: "Manufacturing",
    email: "contact@acmecorp.com",
    address: "123 Industrial Ave, Metropolis",
    website: "https://www.acmecorp.com"
  },
  {
    id: 2,
    name: "Globex Inc.",
    customer_type: "company",
    industry: "Technology",
    phone: "+1‑555‑5678",
    address: "456 Innovation Dr, Silicon Valley",
    website: "https://www.globex.com"
  },
  {
    id: 3,
    name: "Jane Doe",
    customer_type: "person",
    email: "jane.doe@example.com",
    phone: "+1‑555‑9012",
    address: "789 Maple St, Springfield",
    website: ""
  },
];