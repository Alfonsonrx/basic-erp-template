import { useState } from "react";
import {
  Pencil,
  Trash2,
  PlusCircle,
  PaperclipIcon,
  ArrowLeft,
  ArrowRight,
  Package,
  AlertCircle,
  Check,
  X,
} from "lucide-react";
import {
  IconButton,
  PrimaryButton,
  SecondaryButton,
} from "@components/Buttons";
import { Card } from "@components/ui/Card";

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
  const [editValues, setEditValues] = useState<Partial<Product>>({});

  // Filter products based on search
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (
    field: keyof Omit<Product, "id">,
    value: string,
  ) => {
    setEditValues((prev) => ({
      ...prev,
      [field]: field === "name" ? value : Number(value),
    }));
  };

  const startEditing = (product: Product) => {
    setEditingId(product.id);
    setEditValues({ ...product });
  };

  const saveEdit = () => {
    if (editingId === null) return;
    setProducts((prev) =>
      prev.map((p) =>
        p.id === editingId ? { ...p, ...editValues } : p
      )
    );
    setEditingId(null);
    setEditValues({});
  };

  const cancelEdit = () => {
    // Remove the product if it was newly added (empty name)
    const editingProduct = products.find((p) => p.id === editingId);
    if (editingProduct && editingProduct.name === "") {
      setProducts((prev) => prev.filter((p) => p.id !== editingId));
    }
    setEditingId(null);
    setEditValues({});
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
          <form className="grow" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Search product…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-full rounded-md border px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
              aria-label="Search products"
            />
          </form>
          <div className="flex justify-center gap-2 flex-wrap">
            <SecondaryButton>
              <PaperclipIcon size={16} />
              Export
            </SecondaryButton>
            <PrimaryButton
              onClick={addProduct}
              className="text-primary-foreground font-medium"
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
              <th className="px-4 py-2 hidden md:table-cell">Quantity</th>
              <th className="px-4 py-2 hidden md:table-cell">Price</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-12">
                  <div className="text-center text-muted-foreground">
                    <Package className="mx-auto h-12 w-12 mb-3 opacity-50" />
                    <p className="text-lg font-medium">No products found</p>
                    <p className="text-sm mt-1">
                      {search
                        ? "Try adjusting your search terms"
                        : "Add a new product to get started"}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="text-center hover:bg-background/10 transition-colors"
                >
                  <td>
                    {editingId === product.id ? (
                      <input
                        type="text"
                        value={editValues.name ?? ""}
                        onChange={(e) =>
                          handleChange("name", e.target.value)
                        }
                        className="w-full border rounded px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                        aria-label="Product name"
                        autoFocus
                      />
                    ) : (
                      <span className="font-medium">{product.name}</span>
                    )}
                  </td>
                  <td className="hidden md:table-cell">
                    {editingId === product.id ? (
                      <input
                        type="number"
                        value={editValues.quantity ?? 0}
                        onChange={(e) =>
                          handleChange("quantity", e.target.value)
                        }
                        className="w-full border rounded px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                        aria-label="Quantity"
                      />
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <span>{product.quantity}</span>
                        {product.quantity < 5 && (
                          <span
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            title="Low stock"
                          >
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Low
                          </span>
                        )}
                      </div>
                    )}
                  </td>

                  <td className="hidden md:table-cell">
                    {editingId === product.id ? (
                      <input
                        type="number"
                        step="0.01"
                        value={editValues.price ?? 0}
                        onChange={(e) =>
                          handleChange("price", e.target.value)
                        }
                        className="w-full border rounded px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                        aria-label="Price"
                      />
                    ) : (
                      <span>${product.price.toFixed(2)}</span>
                    )}
                  </td>
                  <td className="flex gap-2 justify-center my-2">
                    {editingId === product.id ? (
                      <>
                        <IconButton
                          icon={Check}
                          className="text-green-700 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-950"
                          onClick={saveEdit}
                          aria-label="Save changes"
                        />
                        <IconButton
                          icon={X}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-950"
                          onClick={cancelEdit}
                          aria-label="Cancel editing"
                        />
                      </>
                    ) : (
                      <>
                        <IconButton
                          icon={Pencil}
                          className="text-green-700 hover:text-green-600 hover:bg-transparent"
                          onClick={() => startEditing(product)}
                          aria-label={`Edit ${product.name}`}
                        />
                        <IconButton
                          icon={Trash2}
                          className="text-red-600 hover:text-red-800 hover:bg-transparent"
                          onClick={() => deleteProduct(product.id)}
                          aria-label={`Delete ${product.name}`}
                        />
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
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
