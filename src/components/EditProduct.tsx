import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { deleteProductImage, updateProduct } from "@/services/productApi";
import toast from "react-hot-toast";

import { EditProductProps, Product } from "@/types/types";

const baseUrl: string =
    "https://node-ts-productlisting-production.up.railway.app/";

const EditProduct: React.FC<EditProductProps> = ({
    product,
    open,
    setOpen,
    refreshProducts,
}) => {
    const [updatedProduct, setUpdatedProduct] = useState<Product | null>(null);
    const [newImages, setNewImages] = useState<File[]>([]);
    const [removedImageIds, setRemovedImageIds] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (product) setUpdatedProduct({ ...product });
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!updatedProduct) return;
        setUpdatedProduct({
            ...updatedProduct,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setNewImages(Array.from(e.target.files));
    };

    const handleRemoveImage = async (imageId: number) => {
        if (!updatedProduct || !updatedProduct.id) {
            toast.error("Error: Missing product ID.");
            return;
        }

        setLoading(true);
        try {
            await deleteProductImage(Number(updatedProduct.id), imageId);
            setRemovedImageIds((prev) => [...prev, imageId]); // Track removed image IDs
            toast.success("Image deleted successfully.");

            setUpdatedProduct((prevProduct) => ({
                ...prevProduct!,
                images: prevProduct!.images.filter((img) => img.id !== imageId),
            }));
        } catch (error) {
            toast.error("Failed to delete image.");
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!updatedProduct || !updatedProduct.id) {
            toast.error("Error: Missing product ID.");
            return;
        }

        const formData = new FormData();
        formData.append("id", String(updatedProduct.id));
        formData.append("sku", updatedProduct.sku);
        formData.append("name", updatedProduct.name);
        formData.append("price", String(updatedProduct.price));

        removedImageIds.forEach((id) =>
            formData.append("imageIdsToDelete", id.toString())
        );

        newImages.forEach((image) => formData.append("images", image));

        try {
            const response = await updateProduct(formData);
            if (response?.product) {
                toast.success("Product updated successfully!");
                refreshProducts();
                setOpen(false);
            } else {
                toast.error("Update failed: Invalid response from server.");
            }
        } catch (error) {
            toast.error("Failed to update product.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-gray-900 text-white border border-gray-700">
                <DialogHeader>
                    <DialogTitle className="text-neonGreen">
                        Edit Product
                    </DialogTitle>
                </DialogHeader>

                {updatedProduct ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-semibold">SKU</label>
                            <Input
                                type="text"
                                name="sku"
                                value={updatedProduct.sku}
                                onChange={handleChange}
                                className="mt-1 bg-gray-800 text-white border border-gray-600"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold">
                                Product Name
                            </label>
                            <Input
                                type="text"
                                name="name"
                                value={updatedProduct.name}
                                onChange={handleChange}
                                className="mt-1 bg-gray-800 text-white border border-gray-600"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold">
                                Price ($)
                            </label>
                            <Input
                                type="number"
                                name="price"
                                value={updatedProduct.price}
                                onChange={handleChange}
                                className="mt-1 bg-gray-800 text-white border border-gray-600"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold">
                                Upload New Images
                            </label>
                            <Input
                                type="file"
                                multiple
                                onChange={handleImageUpload}
                                className="mt-1 bg-gray-800 text-white border border-gray-600"
                            />
                        </div>

                        {updatedProduct.images?.length > 0 && (
                            <div className="flex gap-2 flex-wrap">
                                {updatedProduct.images.map((img) => (
                                    <div key={img.id} className="relative">
                                        <img
                                            src={`${baseUrl}${img.url}`}
                                            alt={`Product ${img.id}`}
                                            className="w-24 h-24 object-cover rounded-md border border-gray-700"
                                        />
                                        <button
                                            onClick={() =>
                                                handleRemoveImage(img.id)
                                            }
                                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs hover:bg-red-800 transition"
                                            disabled={loading}
                                        >
                                            {loading ? "⏳" : "❌"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                ) : (
                    <p className="text-center text-gray-400">
                        No product selected
                    </p>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default EditProduct;
