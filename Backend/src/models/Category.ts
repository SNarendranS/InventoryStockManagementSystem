import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { CategoryAttributes, CategoryCreationAttributes } from "../interfaces/ICategory";

export class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
    public categoryid!: number;
    public categoryName!: string;
    public categoryDescription!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Category.init(
    {
        categoryid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        categoryName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        categoryDescription: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "categories",
        timestamps: true,
    }
);