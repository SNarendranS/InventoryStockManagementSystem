import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import {
    TransactionAttributes,
    TransactionCreationAttributes
} from "../interfaces/ITransaction";
import { TransactionType } from "../enums/EtransactionType";
import { Product } from "./Product";

export class Transaction
    extends Model<TransactionAttributes, TransactionCreationAttributes>
    implements TransactionAttributes
{
    public transactionid!: number;
    public productid!: number;
    public type!: TransactionType;
    public quantity!: number;
    public note!: string | undefined;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Transaction.init(
    {
        transactionid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        productid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Product,
                key: "productid",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },

        type: {
            type: DataTypes.ENUM(...Object.values(TransactionType)),
            allowNull: false,
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 1 }
        },

        note: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "transactions",
        timestamps: true,
    }
);
