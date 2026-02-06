import { useState } from "react";
import { Card } from "@components/ui/Card";
import { 
  CreditCard, 
  Receipt, 
  TrendingUp, 
  Users, 
  CheckCircle,
  AlertCircle,
  Download,
  Calendar,
  DollarSign,
  Package
} from "lucide-react";
import { PrimaryButton } from "@components/Buttons";

// Mock billing data
const subscription = {
  plan: "Enterprise",
  status: "active",
  price: 299,
  billingCycle: "monthly",
  nextBilling: "2026-03-15",
  seats: 25,
  usedSeats: 18,
};

const invoices = [
  { id: "INV-2026-001", date: "2026-02-15", amount: 299, status: "paid" },
  { id: "INV-2026-002", date: "2026-01-15", amount: 299, status: "paid" },
  { id: "INV-2025-012", date: "2025-12-15", amount: 299, status: "paid" },
  { id: "INV-2025-011", date: "2025-11-15", amount: 249, status: "paid" },
];

const usageStats = {
  storage: { used: 45, total: 100, unit: "GB" },
  apiCalls: { used: 12500, total: 50000, unit: "calls" },
  projects: { used: 12, total: 50, unit: "projects" },
};

export default function Billing() {
  const [selectedPlan, setSelectedPlan] = useState("enterprise");

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: 49,
      description: "For small teams getting started",
      features: ["Up to 5 users", "10 projects", "5GB storage", "Basic support"],
    },
    {
      id: "professional",
      name: "Professional",
      price: 149,
      description: "For growing businesses",
      features: ["Up to 15 users", "Unlimited projects", "50GB storage", "Priority support", "API access"],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 299,
      description: "For large organizations",
      features: ["Unlimited users", "Unlimited projects", "500GB storage", "24/7 support", "API access", "Custom integrations", "Dedicated account manager"],
      current: true,
    },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Billing & Subscription</h1>
        <p className="text-muted-foreground mt-1">
          Manage your subscription, payment methods, and billing history
        </p>
      </div>

      {/* Current Plan Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card classname="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 opacity-80" />
            <div>
              <p className="text-sm opacity-80">Current Plan</p>
              <p className="text-2xl font-bold">{subscription.plan}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Monthly Cost</p>
              <p className="text-2xl font-bold">${subscription.price}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Seats Used</p>
              <p className="text-2xl font-bold">{subscription.usedSeats}/{subscription.seats}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Next Billing</p>
              <p className="text-2xl font-bold">{new Date(subscription.nextBilling).toLocaleDateString()}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Plans */}
      <Card title="Subscription Plans" icon={<Package className="w-5 h-5" />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-lg border-2 p-6 transition-all ${
                plan.current
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                {plan.current && (
                  <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    Current
                  </span>
                )}
              </div>
              <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              {plan.current ? (
                <button className="w-full py-2 border border-border rounded-lg text-muted-foreground cursor-default">
                  Current Plan
                </button>
              ) : (
                <PrimaryButton className="w-full">
                  Upgrade
                </PrimaryButton>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Usage Stats */}
      <Card title="Usage Overview" icon={<TrendingUp className="w-5 h-5" />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(usageStats).map(([key, stat]) => (
            <div key={key} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="capitalize font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className="text-muted-foreground">
                  {stat.used} / {stat.total} {stat.unit}
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${(stat.used / stat.total) * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((stat.used / stat.total) * 100)}% used
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Payment Method */}
      <Card title="Payment Method" icon={<CreditCard className="w-5 h-5" />}>
        <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
              VISA
            </div>
            <div>
              <p className="font-medium">•••• •••• •••• 4242</p>
              <p className="text-sm text-muted-foreground">Expires 12/27</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-secondary transition-colors">
              Edit
            </button>
            <button className="px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-secondary transition-colors text-red-600">
              Remove
            </button>
          </div>
        </div>
      </Card>

      {/* Billing History */}
      <Card title="Billing History" icon={<Receipt className="w-5 h-5" />}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-sm text-muted-foreground">
                <th className="pb-3 font-medium">Invoice</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-border last:border-0">
                  <td className="py-4 font-medium">{invoice.id}</td>
                  <td className="py-4 text-muted-foreground">
                    {new Date(invoice.date).toLocaleDateString()}
                  </td>
                  <td className="py-4">${invoice.amount}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      invoice.status === "paid"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    }`}>
                      <CheckCircle className="w-3 h-3" />
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <button className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
                      <Download className="w-4 h-4" />
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
