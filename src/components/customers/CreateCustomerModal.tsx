import { useState } from "react";
import { Modal } from "@components/ui/Modal";
import { PrimaryButton } from "@components/Buttons/PrimaryButton";
import { SecondaryButton } from "@components/Buttons/SecondaryButton";
import type { Customer } from "@types";
import { Plus } from "lucide-react";

interface CreateCustomerModalProps {
  open: boolean;
  onClose: () => void;
  onCreate?: (customer: Customer) => void;
}

export function CreateCustomerModal({ open, onClose, onCreate }: CreateCustomerModalProps) {
  const [name, setName] = useState("");
  const [customerType, setCustomerType] = useState<Customer["customer_type"]>("person");
  const [industry, setIndustry] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");

  const resetForm = () => {
    setName("");
    setCustomerType("person");
    setIndustry("");
    setEmail("");
    setPhone("");
    setAddress("");
    setWebsite("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCustomer: Customer = {
      id: Date.now(),
      name,
      customer_type: customerType,
      ...(customerType === "company" && industry ? { industry } : {}),
      ...(email ? { email } : {}),
      ...(phone ? { phone } : {}),
      ...(address ? { address } : {}),
      ...(website ? { website } : {}),
    };

    onCreate?.(newCustomer);
    console.log("Created customer", newCustomer);

    resetForm();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} panelClass="max-w-lg!" title="Add New Customer">
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        {/* Customer Name */}
        <div>
          <label className="block text-sm font-medium mb-1 text-foreground">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter customer name"
            className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Customer Type */}
        <div>
          <label className="block text-sm font-medium mb-1 text-foreground">
            Customer Type <span className="text-red-500">*</span>
          </label>
          <select
            value={customerType}
            onChange={(e) => setCustomerType(e.target.value as Customer["customer_type"])}
            required
            className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="person">Person</option>
            <option value="company">Company</option>
          </select>
        </div>

        {/* Industry - Only show for companies */}
        {customerType === "company" && (
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">
              Industry
            </label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g. Technology, Healthcare, Finance"
              className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        )}

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="customer@example.com"
              className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">
              Phone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium mb-1 text-foreground">
            Address
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter full address"
            rows={2}
            className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-medium mb-1 text-foreground">
            Website
          </label>
          <input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://example.com"
            className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-border">
          <SecondaryButton type="button" onClick={handleClose} className="flex-1">
            Cancel
          </SecondaryButton>
          <PrimaryButton type="submit" className="flex-1">
            <Plus className="w-4 h-4" />
            Add Customer
          </PrimaryButton>
        </div>
      </form>
    </Modal>
  );
}

export default CreateCustomerModal;
