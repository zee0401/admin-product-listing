import React, { useState } from "react";
import { Product, ProductTableProps } from "@/types/types";

import ShowProduct from "./ShowProduct";

const ProductTable: React.FC<ProductTableProps> = ({
    products,
    onEdit,
    onDelete,
}) => {
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null
    );

    const handleShow = (product: Product) => {
        setSelectedProduct(product);
        console.log(product);
        setOpen(true);
    };

    return (
        <div className="overflow-x-auto bg-gray-900 text-sky-300 shadow-lg rounded-lg p-6">
            <table className="w-full border-collapse border border-gray-700">
                <thead className="bg-gray-900 text-neonGreen uppercase tracking-wide">
                    <tr>
                        <th className="border border-gray-700 p-3 text-left">
                            ID
                        </th>
                        <th className="border border-gray-700 p-3 text-left">
                            SKU
                        </th>
                        <th className="border border-gray-700 p-3 text-left">
                            Name
                        </th>
                        <th className="border border-gray-700 p-3 text-left">
                            Price ($)
                        </th>
                        <th className="border border-gray-700 p-3 text-left">
                            Image Count
                        </th>
                        <th className="border border-gray-700 p-3 text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.length === 0 ? (
                        <tr>
                            <td
                                colSpan={6}
                                className="text-center p-6 text-gray-400"
                            >
                                No products available
                            </td>
                        </tr>
                    ) : (
                        products &&
                        products?.map((product) => (
                            <tr
                                key={product.id}
                                className="border-b text-gray-400 border-gray-700 hover:bg-gray-800 transition duration-200"
                            >
                                <td className="border border-gray-700 p-3">
                                    {product.id}
                                </td>
                                <td className="border border-gray-700 p-3">
                                    {product.sku}
                                </td>
                                <td className="border border-gray-700 p-3">
                                    {product.name}
                                </td>
                                <td className="border border-gray-700 p-3">
                                    ${product.price}
                                </td>
                                <td className="border border-gray-700 p-3">
                                    {product.images.length}
                                </td>
                                <td className="border border-gray-700 p-3 flex justify-center gap-4">
                                    <button
                                        className="bg-yellow-600 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 
                                        px-4 py-2 rounded-lg font-semibold text-white
                                        hover:bg-indigo-500 cursor-pointer"
                                        onClick={() => handleShow(product)}
                                    >
                                        Show
                                    </button>
                                    <button
                                        onClick={() => onEdit(product)}
                                        className="bg-blue-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 
                                        px-4 py-2 rounded-lg font-semibold text-white
                                        hover:bg-indigo-500 cursor-pointer"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(product.id)}
                                        className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-500 transition cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {selectedProduct && (
                <ShowProduct
                    product={selectedProduct}
                    open={open}
                    setOpen={setOpen}
                />
            )}
        </div>
    );
};

export default ProductTable;
