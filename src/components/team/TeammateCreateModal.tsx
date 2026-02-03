import { useState } from "react";
import { Modal } from "../ui/Modal";
import { UserPlus, Mail, Phone, Briefcase, DollarSign, Save, X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

type FormData = {
  name: string;
  role: string;
  email: string;
  phone: string;
  revenue: string;
  status: "new" | "job as call" | "part-time" | "full-time" | "fired";
};

const initialFormData: FormData = {
  name: "",
  role: "",
  email: "",
  phone: "",
  revenue: "",
  status: "new",
};

export const TeammateCreateModal: React.FC<Props> = ({ open, onClose }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.role.trim()) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: API integration will be added later
      console.log("Form data ready to submit:", formData);
      // Reset form and close modal
      setFormData(initialFormData);
      onClose();
    }
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setErrors({});
    onClose();
  };

  return (
    <Modal open={open} onClose={handleCancel} panelClass="max-w-lg!" title="Add New Teammate">
      <div className="mt-6 max-h-[80vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Section */}
          <section className="bg-card p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <UserPlus className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Personal Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Jane Doe"
                  className={`w-full px-4 py-2 bg-background border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                    errors.name ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Role Field */}
              <div className="space-y-2">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-foreground"
                >
                  Role <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="e.g. Senior Product Manager"
                    className={`w-full pl-10 pr-4 py-2 bg-background border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                      errors.role ? "border-red-500" : "border-border"
                    }`}
                  />
                </div>
                {errors.role && (
                  <p className="text-sm text-red-500">{errors.role}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane.doe@example.com"
                    className={`w-full pl-10 pr-4 py-2 bg-background border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                      errors.email ? "border-red-500" : "border-border"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-foreground"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1-555-987-6543"
                    className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Employment Details Section */}
          <section className="bg-card p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Employment Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Revenue Field */}
              <div className="space-y-2">
                <label
                  htmlFor="revenue"
                  className="block text-sm font-medium text-foreground"
                >
                  Expected Revenue
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <input
                    type="number"
                    id="revenue"
                    name="revenue"
                    value={formData.revenue}
                    onChange={handleChange}
                    placeholder="75000"
                    min="0"
                    step="1000"
                    className="w-full pl-8 pr-4 py-2 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                  />
                </div>
              </div>

              {/* Status Field */}
              <div className="space-y-2">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-foreground"
                >
                  Employment Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors cursor-pointer"
                >
                  <option value="new">New</option>
                  <option value="job as call">Job as Call</option>
                  <option value="part-time">Part-time</option>
                  <option value="full-time">Full-time</option>
                  <option value="fired">Fired</option>
                </select>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end pt-4 border-t border-border">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-border rounded-md text-foreground hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
            >
              <Save className="w-4 h-4" />
              Create Teammate
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
