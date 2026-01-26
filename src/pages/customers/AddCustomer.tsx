"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "@components/Buttons";
import { customers } from "@/dummyData/customers";
import type { Customer } from "@types";

export default function AddCustomer() {
  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState("");
  const [customerType, setCustomerType] = useState<"company" | "person">(
    "company",
  );
  const [industry, setIndustry] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!name.trim()) {
      alert("Name is required");
      return;
    }

    // Generate a new id
    const newId =
      customers.length > 0 ? Math.max(...customers.map((c) => c.id)) + 1 : 1;

    const newClient: Customer = {
      id: newId,
      name,
      customer_type: customerType,
      industry: customerType === "company" ? industry : undefined,
      email: email || undefined,
      phone: phone || undefined,
      address: address || undefined,
      website: website || undefined,
    };

    // Add to the dummy data array (mutable for demo purposes)
    customers.push(newClient);

    // Navigate back to the clients list
    navigate("/customers");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4 bg-card rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-4">Add New Client</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-1 text-foreground"
          >
            Name<span className="text-red-600">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-foreground bg-background"
          />
        </div>

        {/* Customer Type */}
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium mb-1 text-foreground"
          >
            Customer Type<span className="text-red-600">*</span>
          </label>
          <select
            id="type"
            value={customerType}
            onChange={(e) =>
              setCustomerType(e.target.value as "company" | "person")
            }
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-foreground bg-background"
          >
            <option value="company">Company</option>
            <option value="person">Person</option>
          </select>
        </div>

        {/* Industry (only for companies) */}
        {customerType === "company" && (
          <div>
            <label
              htmlFor="industry"
              className="block text-sm font-medium mb-1 text-foreground"
            >
              Industry
            </label>
            <input
              id="industry"
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-foreground bg-background"
            />
          </div>
        )}

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-1 text-foreground"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-foreground bg-background"
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium mb-1 text-foreground"
          >
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-foreground bg-background"
          />
        </div>

        {/* Address */}
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium mb-1 text-foreground"
          >
            Address
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-foreground bg-background"
          />
        </div>

        {/* Website */}
        <div>
          <label
            htmlFor="website"
            className="block text-sm font-medium mb-1 text-foreground"
          >
            Website
          </label>
          <input
            id="website"
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-foreground bg-background"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <PrimaryButton type="submit">Save Client</PrimaryButton>
          <SecondaryButton
            onClick={() => navigate("/customers")}
          >
            Cancel
          </SecondaryButton>
        </div>
      </form>
    </div>
  );
}