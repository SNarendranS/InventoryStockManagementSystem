import { Product } from "./Product";
import { Category } from "./Category";

Product.belongsTo(Category, {
    foreignKey: "categoryid",
    as: "category",
});

Category.hasMany(Product, {
    foreignKey: "categoryid",
    as: "products",
});
