"use client";

export const fetchCustomers = async () => {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 500));
  return [
    { id: 1, name: 'Acme Corp', email: 'contact@acme.com' },
    { id: 2, name: 'Globex Inc', email: 'info@globex.com' },
  ];
};