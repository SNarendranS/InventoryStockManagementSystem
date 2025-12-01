export const TransactionType = {
  DEFAULT:"",
  IN: "IN",
  OUT: "OUT",
} as const;

export type TransactionType = typeof TransactionType[keyof typeof TransactionType];

export interface TransactionProduct {
  productName: string;
  sku: string;
  price: string; 
  quantity: number;
}

export interface Transaction {
  transactionid: number;
  productid: number;
  type:TransactionType;
  quantity: number;
  note?: string;
  createdAt: string;
  updatedAt: string;
  product: TransactionProduct;
}

export interface GetTransactionsResponse {
  count: number;
  transactions: Transaction[];
}

export interface GetDemandSalesResponse {
  count: number;
  transactions: {
    productid: number;
    total_transactions: number;
    total_quantity: number;
    total_sales: string; 
    productName: string;
    sku: string;
    price: string;
  }[];
}
