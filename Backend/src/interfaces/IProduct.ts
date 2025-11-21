import { Optional } from "sequelize";
import { Product } from "../models/Product";

export interface ProductAttributes {
    productid: number;
    productName: string;
    productDescription?: string;
    sku: string,
    price: string,
    quantity: number,
    categoryid: number
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, "productid" | "productDescription" | "createdAt" | "updatedAt"> { }

export interface productBody {
    productName: string;
    productDescription?: string;
    sku: string,
    price: string,
    quantity: number,
    categoryid: number
}

interface productResponse {
    productid: number;
    productName: string;
    productDescription?: string;
    sku: string,
    price: string,
    quantity: number,
    categoryid?: number
}
export const productResponseTemplate: (keyof productResponse)[] =
    [
        "productid",
        "productName",
        "productDescription",
        "sku",
        "price",
        "quantity",
        "categoryid"
    ]