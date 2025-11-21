import { Product } from "./Product";
import { Category } from "./Category";
import { User } from "./User";

Product.belongsTo(Category, {
    foreignKey: "categoryid",
    as: "category",
});

Category.hasMany(Product, {
    foreignKey: "categoryid",
    as: "products",
});
User.belongsTo(User, { as: 'manager', foreignKey: 'managerid' });
User.hasMany(User, { as: 'employees', foreignKey: 'managerid' });