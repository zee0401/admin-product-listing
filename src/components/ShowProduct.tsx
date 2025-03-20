import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Product } from "@/types/types";

interface ShowProductProps {
    product: Product;
    open: boolean;
    setOpen: (open: boolean) => void;
}

const ShowProduct: React.FC<ShowProductProps> = ({
    product,
    open,
    setOpen,
}) => {
    const baseUrl: string = "http://localhost:3000";
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-gray-900 text-white border border-gray-700">
                <DialogHeader>
                    <DialogTitle className="text-sky-400">
                        Product Details
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <p>
                        <strong>ID:</strong> {product.id}
                    </p>
                    <p>
                        <strong>SKU:</strong> {product.sku}
                    </p>
                    <p>
                        <strong>Name:</strong> {product.name}
                    </p>
                    <p>
                        <strong>Price:</strong> ${product.price}
                    </p>
                    <p>
                        <strong>Images:</strong> {product.images.length} images
                    </p>
                    <div className="max-h-[400px]  flex flex-wrap gap-4 justify-center p-2">
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                src={`${baseUrl}${img.url}`}
                                alt={`Product ${index}`}
                                className="w-30 h-30 object-cover
                             rounded-md "
                            />
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ShowProduct;
