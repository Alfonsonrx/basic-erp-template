import { useParams, Link } from "react-router-dom";
import { customers } from "@/dummyData/customers";

interface Props {}

export default function CustomerDetail({}: Props) {
  const { id } = useParams<{ id: string }>();
  const customer = customers.find((c) => c.id === Number(id));

  if (!customer) {
    return <div className="p-4">Customer not found.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">{customer.name}</h2>
      <ul className="space-y-2">
        {Object.entries(customer).map(([key, value]) => (
          <li key={key}>
            <strong>{key.replace(/_/g, " ").replace(/\b[a-z]/g, (c) => c.toUpperCase())}:</strong> {value || "N/A"}
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <Link to="/customers" className="text-primary hover:underline">
          &larr; Back to Customers
        </Link>
      </div>
    </div>
  );
}
