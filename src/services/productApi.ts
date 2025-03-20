import axios from "axios";

const baseUrl =
    "https://node-ts-productlisting-production.up.railway.app/products";

const axiosInstance = axios.create({
    baseURL: baseUrl,
});

export const getAllProducts = async () => {
    const response = await axiosInstance.get("/all-products");
    return response.data;
};

export const deleteProduct = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};

export const createProduct = async (formData: FormData) => {
    try {
        const response = await axiosInstance.post("/create", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error: any) {
        console.error("Error creating product:", error);
        throw error;
    }
};

export const updateProduct = async (formData: FormData) => {
    try {
        const productId = formData.get("id");
        console.log("Product ID:", productId);
        const response = await axiosInstance.put(`/${productId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error: any) {
        console.error("Error updating product:", error);
        throw error;
    }
};

export const deleteProductImage = async (
    productId: number,
    imageId: number
) => {
    try {
        const response = await axiosInstance.delete(
            `/${productId}/images/${imageId}`
        );

        return response.data;
    } catch (error) {
        console.error("Error deleting product image:", error);
        throw error;
    }
};
