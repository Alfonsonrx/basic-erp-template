import { useState } from "react";
import { Card } from "@/components/Card";
import { IconButton } from "@components/IconButton";
import { Edit, Trash2 } from "lucide-react";
import { customers } from "@/dummyData/customers";

function Customers() {
  const [search, setSearch] = useState("");

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.industry?.toLowerCase().includes(search.toLowerCase())) ||
    (c.email?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Card classname="bg-card" title="Customers">
      {/* Search bar */}
      <div className="mb-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Search customers…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="grow rounded-md border px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
        />
      </div>

      {/* Table */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="text-left text-xs font-medium uppercase tracking-wider text-foreground">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2 hidden sm:table-cell">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredCustomers.map((client) => (
            <tr key={client.id} className="hover:bg-background/10 transition-colors">
              <td className="px-4 py-2">{client.name}</td>
              <td className="px-4 py-2">{client.customer_type === "company" ? "Company" : "Person"}</td>
              <td className="px-4 py-2 hidden sm:table-cell items-center gap-1">
                <IconButton
                  icon={Edit}
                  onClick={() => console.log(`Edit ${client.id}`)}
                  size={16}
                />
                <IconButton
                  icon={Trash2}
                  onClick={() => console.log(`Delete ${client.id}`)}
                  size={16}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* No results message */}
      {filteredCustomers.length === 0 && (
        <p className="mt-4 text-muted-foreground">No Customers match your search.</p>
      )}
    </Card>
  );
}

export default Customers;