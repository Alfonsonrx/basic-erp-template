"use client";

import { useState } from "react";
import { Pencil, Trash2, PlusCircle } from "lucide-react";

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
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleChange = (
    id: number,
    field: keyof Omit<Product, "id">,
    value: string
  ) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, [field]: field === "name" ? value : Number(value) }
          : p
      )
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
      <h2 className="text-xl font-semibold">Inventory</h2>
      <table className="min-w-full border-collapse bg-primary-foreground rounded-md shadow-sm">
        <thead>
          <tr className="text-left text-xs font-medium uppercase tracking-wider text-foreground">
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Price ($)</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="px-4 py-2">
                {editingId === p.id ? (
                  <input
                    type="text"
                    value={p.name}
                    onChange={(e) => handleChange(p.id, "name", e.target.value)}
                    className="w-full border rounded px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                ) : (
                  p.name
                )}
              </td>
              <td className="px-4 py-2">
                {editingId === p.id ? (
                  <input
                    type="number"
                    value={p.quantity}
                    onChange={(e) =>
                      handleChange(p.id, "quantity", e.target.value)
                    }
                    className="w-full border rounded px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                ) : (
                  p.quantity
                )}
              </td>
              <td className="px-4 py-2">
                {editingId === p.id ? (
                  <input
                    type="number"
                    step="0.01"
                    value={p.price}
                    onChange={(e) =>
                      handleChange(p.id, "price", e.target.value)
                    }
                    className="w-full border rounded px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                ) : (
                  p.price.toFixed(2)
                )}
              </td>
              <td className="px-4 py-2 flex items-center gap-2">
                {/* {editingId === p.id ? (
                ) : null} */}
                <button
                  onClick={() => {
                    setEditingId(editingId ? null : p.id);
                  }}
                  className="text-green-600 hover:text-green-800"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => deleteProduct(p.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end">
        <button
          onClick={addProduct}
          className="inline-flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          <PlusCircle size={18} />
          Add Product
        </button>
      </div>
    </div>
  );
}
