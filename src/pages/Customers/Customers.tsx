import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  PaperclipIcon,
  PlusCircle,
} from "lucide-react";
import { customers } from "@/dummyData/customers";
import { PrimaryButton } from "@components/Buttons/PrimaryButton";
import { SecondaryButton } from "@components/Buttons/SecondaryButton";
import { IconButton } from "@components/Buttons/IconButton";

function Customers() {
  const [search, setSearch] = useState("");

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.industry?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="items-center justify-between my-4 mx-6">
        <h2 className="text-3xl font-semibold mb-2">Customers</h2>
        <div className="flex gap-2 flex-wrap">
          <form className="grow">
            <input
              type="text"
              placeholder="Search customers…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-full rounded-md border px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
            />
          </form>
          <div className="flex justify-center gap-2 flex-wrap">
            <SecondaryButton>
              <PaperclipIcon size={16} />
              Export
            </SecondaryButton>
            <PrimaryButton>
              <PlusCircle size={16} />
              Add Customer
            </PrimaryButton>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card max-h-96 overflow-auto border-y border-border ">
        <table className="min-w-full divide-y divide-border border-b">
          <thead>
            <tr className="text-center text-xs font-medium uppercase tracking-wider">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2 hidden sm:table-cell">Email</th>
              <th className="px-4 py-2 hidden sm:table-cell">Phone</th>
              <th className="px-4 py-2 hidden sm:table-cell">Type</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredCustomers.map((customer) => (
              <tr
                key={customer.id}
                className="text-center hover:bg-background/10 transition-colors"
              >
                <td>{customer.name}</td>
                <td className="hidden sm:table-cell">
                  {customer.email ? customer.email : "None"}
                </td>
                <td className="hidden sm:table-cell">
                  {customer.phone ? customer.phone : "None"}
                </td>
                <td className="hidden sm:table-cell">
                  {customer.customer_type === "company" ? "Company" : "Person"}
                </td>
                <td className="flex gap-2 justify-center my-2">
                  <PrimaryButton>
                    <Eye size={16} />
                    Details
                  </PrimaryButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-2 flex justify-end my-2 mx-6 gap-1">
          <IconButton className="bg-primary/50" icon={ArrowLeft} />
          <IconButton className="bg-primary/50" icon={ArrowRight} />
        </div>
      </div>

      {/* No results message */}
      {filteredCustomers.length === 0 && (
        <p className="mt-4 text-muted-foreground">
          No Customers match your search.
        </p>
      )}
    </div>
  );
}

export default Customers;
