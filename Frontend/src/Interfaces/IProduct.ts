
interface CategoryProducts {
    categoryid?: number;
    categoryName: string;
    categoryDescription?: string;
}
export interface Product {
    productid: number;
    productName: string;
    productDescription: string;
    sku: string;
    price: string;
    quantity: number;
    restockLevel:number;
    categoryid: number;
    category: CategoryProducts;
}

export interface GetProductsResponse {
    count: number;
    products: Product[];
}
