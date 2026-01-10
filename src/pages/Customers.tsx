"use client";

import React, { useEffect, useState } from 'react';
import { fetchCustomers } from '../api/mockApi';

interface Customer {
  id: number;
  name: string;
  email: string;
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers().then((data) => {
      setCustomers(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading customers...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <ul className="space-y-3">
          {customers.map((c) => (
            <li key={c.id} className="border-b pb-2">
              <strong>{c.name}</strong> – {c.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Customers;