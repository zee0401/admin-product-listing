import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createProduct } from "@/services/productApi";
import toast from "react-hot-toast";

interface Product {
    sku: string;
    name: string;
    price: string;
    images: File[];
}

interface AddProductProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const AddProduct = ({ open, setOpen }: AddProductProps) => {
    const [product, setProduct] = useState<Product>({
        sku: "",
        name: "",
        price: "",
        images: [] as File[],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setProduct({ ...product, images: Array.from(e.target.files) });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("sku", product.sku);
        formData.append("name", product.name);
        formData.append("price", product.price);

        product.images.forEach((image) => {
            formData.append("images", image);
        });

        try {
            await createProduct(formData);
            toast.success("Product created successfully!");
            setOpen(false);
        } catch (error) {
            toast.error("Failed to create product.", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition">
                    Add Product
                </Button>
            </DialogTrigger>

            <DialogContent className="bg-gray-900 text-white border border-gray-700">
                <DialogHeader>
                    <DialogTitle className="text-neonGreen">
                        Add New Product
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-semibold">SKU</label>
                        <Input
                            type="text"
                            name="sku"
                            value={product.sku}
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
                            value={product.name}
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
                            value={product.price}
                            onChange={handleChange}
                            className="mt-1 bg-gray-800 text-white border border-gray-600"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold">
                            Product Images
                        </label>
                        <Input
                            type="file"
                            multiple
                            onChange={handleImageUpload}
                            className="mt-1 bg-gray-800 text-white border border-gray-600"
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition"
                        >
                            Save Product
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddProduct;
