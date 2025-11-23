import { Product } from "./Product";
import { Category } from "./Category";
import { User } from "./User";
import { Transaction } from "./Transaction";

Product.belongsTo(Category, {
    foreignKey: "categoryid",
    as: "category",
});

Category.hasMany(Product, {
    foreignKey: "categoryid",
    as: "products",
});
User.belongsTo(User, {
    as: 'manager',
    foreignKey: 'managerid'
});

User.hasMany(User, {
    as: 'employees',
    foreignKey: 'managerid'
});

Product.hasMany(Transaction, {
    foreignKey: "productid",
    as: "transactions",
});

Transaction.belongsTo(Product, {
    foreignKey: "productid",
    as: "product",
});