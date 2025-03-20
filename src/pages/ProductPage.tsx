import { useEffect, useState } from "react";
import ProductTable from "../components/ProductTable";
import { deleteProduct, getAllProducts } from "../services/productApi";
import AddProduct from "@/components/AddProduct";
import EditProduct from "@/components/EditProduct";
import toast from "react-hot-toast";

import { Product } from "@/types/types";

const ProductPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [addProductOpen, setAddProductOpen] = useState<boolean>(false);
    const [editProductOpen, setEditProductOpen] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null
    );

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await getAllProducts();
            setProducts(response.products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleEdit = (product: Product) => {
        if (!product || !product.id) {
            console.error("Invalid product selected:", product);
            toast.error("Error: Invalid product selected.");
            return;
        }

        console.log("Editing Product:", product); // ✅ Debugging: Ensure full product object is passed
        setSelectedProduct(product);
        setEditProductOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(id);
                fetchProducts(); // ✅ Refresh product list after deletion
                toast.success("Product deleted successfully");
            } catch (error) {
                toast.error("Error deleting product");
            }
        }
    };

    return (
        <div className="min-h-screen bg-darkBg text-green p-8">
            <h1 className="text-4xl font-bold mb-6 text-center">
                Product List
            </h1>

            {/* Add Product Button */}
            <div className="flex justify-end mb-3">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-500 transition cursor-pointer"
                    onClick={() => setAddProductOpen(true)}
                >
                    Add Product
                </button>
            </div>

            {/* Product Table */}
            <ProductTable
                products={products}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {addProductOpen && (
                <AddProduct open={addProductOpen} setOpen={setAddProductOpen} />
            )}

            {selectedProduct && (
                <EditProduct
                    product={selectedProduct}
                    open={editProductOpen}
                    setOpen={setEditProductOpen}
                    refreshProducts={fetchProducts}
                />
            )}
        </div>
    );
};

export default ProductPage;
