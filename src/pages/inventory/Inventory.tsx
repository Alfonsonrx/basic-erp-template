"use client";

import { useState } from "react";
import {
  Pencil,
  Trash2,
  PlusCircle,
  PaperclipIcon,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import {
  IconButton,
  PrimaryButton,
  SecondaryButton,
} from "@components/Buttons";

type Product = {
  id: number;
  name: string;
  quantity: number;
  price: number;
};

const initialProducts: Product[] = [
  { id: 1, name: "Widget A", quantity: 10, price: 2.5 },
  { id: 2, name: "Gadget B", quantity: 5, price: 4.0 },
];

export default function Inventory() {
  const [search, setSearch] = useState("");

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleChange = (
    id: number,
    field: keyof Omit<Product, "id">,
    value: string,
  ) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, [field]: field === "name" ? value : Number(value) }
          : p,
      ),
    );
  };

  const addProduct = () => {
    const newId = products.length
      ? Math.max(...products.map((p) => p.id)) + 1
      : 1;
    setProducts([...products, { id: newId, name: "", quantity: 0, price: 0 }]);
    setEditingId(newId);
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
    if (editingId === id) setEditingId(null);
  };

  return (
    <div className="space-y-4">
      <div className="items-center justify-between my-4 mx-6">
        <h2 className="text-3xl font-semibold mb-2">Inventory</h2>
        <div className="flex gap-2 flex-wrap">
          <form className="grow">
            <input
              type="text"
              placeholder="Search teammate…"
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
            <PrimaryButton
              onClick={addProduct}
              className="text-gray-100 font-medium"
            >
              <PlusCircle size={16} />
              Add Product
            </PrimaryButton>
          </div>
        </div>
      </div>

      <div className="bg-card max-h-96 overflow-auto border-y border-border ">
        <table className="min-w-full divide-y divide-border border-b">
          <thead>
            <tr className="text-center text-xs font-medium uppercase tracking-wider">
              <th className="px-4 py-2 ">Name</th>
              <th className="px-4 py-2 hidden md:table-cell">Email</th>
              <th className="px-4 py-2 hidden md:table-cell">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((product) => (
              <tr
                key={product.id}
                className="text-center hover:bg-background/10 transition-colors"
              >
                <td>
                  {editingId === product.id ? (
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) =>
                        handleChange(product.id, "name", e.target.value)
                      }
                      className="w-full border rounded px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td className=" hidden md:table-cell">
                  {editingId === product.id ? (
                    <input
                      type="number"
                      value={product.quantity}
                      onChange={(e) =>
                        handleChange(product.id, "quantity", e.target.value)
                      }
                      className="w-full border rounded px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    />
                  ) : (
                    product.quantity
                  )}
                </td>

                <td className=" hidden md:table-cell">
                  {editingId === product.id ? (
                    <input
                      type="number"
                      step="0.01"
                      value={product.price}
                      onChange={(e) =>
                        handleChange(product.id, "price", e.target.value)
                      }
                      className="w-full border rounded px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    />
                  ) : (
                    product.price.toFixed(2)
                  )}
                </td>
                <td className="flex gap-4 justify-center my-2">
                  {/* <PrimaryButton>
                    <Pencil size={16} />
                    Edit
                  </PrimaryButton> */}
                  <IconButton
                    icon={Pencil}
                    className="text-green-700 hover:text-green-600 hover:bg-transparent"
                    onClick={() => {
                      setEditingId(editingId ? null : product.id);
                    }}
                  />
                  <IconButton
                    icon={Trash2}
                    className="text-red-600 hover:text-red-800 hover:bg-transparent"
                    onClick={() => deleteProduct(product.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-2 flex justify-end my-2 mx-6 gap-1">
          <IconButton className="bg-primary/50 p-2" icon={ArrowLeft} />
          <IconButton className="bg-primary/50 p-2" icon={ArrowRight} />
        </div>
      </div>
    </div>
  );
}
