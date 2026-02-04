import { useParams, Link } from "react-router-dom";
import { customers } from "@/dummyData/customers";
import { calendarAppointments } from "@/dummyData/appointments";
import { Calendar, Clock, List } from "lucide-react";
import { Card } from "@components/ui/Card";
import {
  ArrowLeft,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Briefcase,
  Tag,
} from "lucide-react";
import { PrimaryButton } from "@components/Buttons/PrimaryButton";

interface Customer {
  id: number;
  name: string;
  customer_type: "company" | "person";
  industry?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
}

const customerTypeConfig = {
  company: {
    icon: Building2,
    label: "Company",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  person: {
    icon: User,
    label: "Individual",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
};

const TypeBadge = ({ type }: { type: "company" | "person" }) => {
  const config = customerTypeConfig[type] || customerTypeConfig.person;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}
    >
      <Icon className="w-4 h-4" />
      {config.label}
    </span>
  );
};

export default function CustomerDetail() {
  const { id } = useParams<{ id: string }>();
  const customer = customers.find((c) => c.id === Number(id)) as
    | Customer
    | undefined;

  if (!customer) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <Card>
          <div className="text-center py-12">
            <User className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">Customer not found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The customer you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/customers" className="mt-6 inline-block">
              <PrimaryButton>
                <ArrowLeft size={16} />
                Back to Customers
              </PrimaryButton>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const hasContactInfo =
    customer.email || customer.phone || customer.address || customer.website;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Back Navigation */}
      <Link
        to="/customers"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Customers
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {customer.name}
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <TypeBadge type={customer.customer_type} />
            {customer.industry && (
              <>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  {customer.industry}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Contact Info */}
        <div className="space-y-6">
          <Card title="Contact Information">
            {hasContactInfo ? (
              <div className="space-y-4">
                {customer.email && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <a
                        href={`mailto:${customer.email}`}
                        className="text-sm font-medium hover:text-primary transition-colors"
                      >
                        {customer.email}
                      </a>
                    </div>
                  </div>
                )}

                {customer.phone && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <a
                        href={`tel:${customer.phone}`}
                        className="text-sm font-medium hover:text-primary transition-colors"
                      >
                        {customer.phone}
                      </a>
                    </div>
                  </div>
                )}

                {customer.address && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Address</p>
                      <p className="text-sm font-medium">{customer.address}</p>
                    </div>
                  </div>
                )}

                {customer.website && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Globe className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Website</p>
                      <a
                        href={customer.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium hover:text-primary transition-colors"
                      >
                        {customer.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">No contact information available.</p>
              </div>
            )}
          </Card>

          {/* Quick Stats */}
          <Card title="Overview">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-background rounded-lg">
                <p className="text-2xl font-bold text-primary">0</p>
                <p className="text-xs text-muted-foreground">Projects</p>
              </div>
              <div className="text-center p-3 bg-background rounded-lg">
                <p className="text-2xl font-bold text-primary">0</p>
                <p className="text-xs text-muted-foreground">Deals</p>
              </div>
            </div>
          </Card>

          {/* Customer Details */}
          <Card title="Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-background rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">
                  Customer Type
                </p>
                <p className="font-medium capitalize">
                  {customer.customer_type}
                </p>
              </div>
              {customer.industry && (
                <div className="p-3 bg-background rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Industry</p>
                  <p className="font-medium">{customer.industry}</p>
                </div>
              )}
              <div className="p-3 bg-background rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">
                  Customer ID
                </p>
                <p className="font-medium">#{customer.id}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Additional Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Appointments Section */}
          <Card title="Appointments">
            {(() => {
              // Filter appointments for this customer (mock - in real app would filter by customer_id)
              const customerAppointments = calendarAppointments
                .filter(() => Math.random() > 0.5) // Mock: randomly show some appointments
                .sort(
                  (a, b) =>
                    new Date(a.start).getTime() - new Date(b.start).getTime(),
                );

              const formatDate = (dateStr: string) => {
                const date = new Date(dateStr);
                return new Intl.DateTimeFormat("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(date);
              };

              if (customerAppointments.length === 0) {
                return (
                  <div className="text-center py-12 text-muted-foreground">
                    <Calendar className="mx-auto h-12 w-12 mb-3 opacity-50" />
                    <p className="text-sm">No appointments yet.</p>
                    <p className="text-xs mt-1">
                      Appointments with this customer will appear here.
                    </p>
                  </div>
                );
              }

              return (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {customerAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors"
                    >
                      <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                        <Clock className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {apt.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(apt.start)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </Card>

          {/* Projects Section (Placeholder) */}
          <Card title="Projects">
            <div className="text-center py-12 text-muted-foreground">
              <Briefcase className="mx-auto h-12 w-12 mb-3 opacity-50" />
              <p className="text-sm">No projects yet.</p>
              <p className="text-xs mt-1">
                Projects linked to this customer will appear here.
              </p>
            </div>
          </Card>

          {/* Deals Section (Placeholder) */}
          <Card title="Deals">
            <div className="text-center py-12 text-muted-foreground">
              <Tag className="mx-auto h-12 w-12 mb-3 opacity-50" />
              <p className="text-sm">No deals yet.</p>
              <p className="text-xs mt-1">
                Deals linked to this customer will appear here.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
