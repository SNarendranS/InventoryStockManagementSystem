import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { CategoryAttributes, CategoryCreationAttributes } from "../interfaces/ICategory";

export class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
    public categoryid!: number;
    public categoryName!: string;
    public categoryPrefix!: string;
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
        categoryPrefix: {
            type: DataTypes.STRING(4),
            allowNull: false,
            validate: {
                len: [3, 4]
            }
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
        hooks: {
            beforeCreate: async (category: Category) => {
                if (!category.categoryPrefix) {
                    category.categoryPrefix = category.categoryName.slice(0, 4)
                }
                category.categoryPrefix = category.categoryPrefix.toUpperCase()
            },
            beforeUpdate: async (category: Category) => {
                if (!category.categoryPrefix) {
                    category.categoryPrefix = category.categoryName.slice(0, 4)
                }
                category.categoryPrefix = category.categoryPrefix.toUpperCase()
            },
        },
    }
);