export interface ProductImage {
    id: number;
    url: string;
}

export interface Product {
    id: string | number;
    sku: string;
    name: string;
    price: number;
    images: ProductImage[];
}

export interface ProductTableProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: string) => void;
}

export interface EditProductProps {
    product: Product | null;
    open: boolean;
    setOpen: (open: boolean) => void;
    refreshProducts: () => void;
}

export interface AddProductProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}
