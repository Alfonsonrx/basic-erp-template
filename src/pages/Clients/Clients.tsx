"use client";

import React from 'react';

const dummyClients = [
  { id: 1, name: 'Acme Corp', industry: 'Manufacturing' },
  { id: 2, name: 'Globex Inc.', industry: 'Technology' },
  { id: 3, name: 'Soylent Co.', industry: 'Food & Beverage' }
];

function Clients() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Clients</h2>
      <ul className="border rounded-md p-4 space-y-2 bg-background text-foreground">
        {dummyClients.map((client) => (
          <li key={client.id} className="flex justify-between items-center">
            <span>{client.name}</span>
            <span className="text-muted-foreground">{client.industry}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Clients;