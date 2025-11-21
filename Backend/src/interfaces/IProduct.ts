import { Optional } from "sequelize";

export interface ProductAttributes {
    productid: number;
    productName: string;
    productDescription: string;
    sku: string;
    price: string;
    quantity: number;
    restockLevel: number;
    categoryid: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes,
    "productid" | "productDescription" | "createdAt" | "updatedAt"> { }