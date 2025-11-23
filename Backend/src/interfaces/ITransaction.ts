import { Optional } from "sequelize";
import { TransactionType } from "../enums/EtransactionType";

export interface TransactionAttributes {
    transactionid: number;
    productid: number;
    type: TransactionType;
    quantity: number;
    note?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface TransactionCreationAttributes
    extends Optional<TransactionAttributes, "transactionid" | "note" | "createdAt" | "updatedAt"> { }
