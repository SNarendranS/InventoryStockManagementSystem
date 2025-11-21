import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { ProductAttributes, ProductCreationAttributes } from "../interfaces/IProduct";
import { Category } from "./Category";

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    public productid: number;
    public productName: string;
    public productDescription?: string;
    public sku: string;
    public price: string;
    public quantity: number;
    public categoryid: number
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
}

Product.init(
    {
        productid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        productName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        productDescription: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        sku: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
            validate: {
                is: /^[A-Z0-9-]+$/i
            }

        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0
            }

        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,

        },
        categoryid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Category,
                key: "categoryid",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
    },
    {
        sequelize,
        tableName: "products",
        timestamps: true,
    }
);