// types.ts or apiTypes.ts
export interface TransactionProduct {
  productName: string;
  sku: string;
  price: string; // backend returns string
  quantity: number;
}

export interface Transaction {
  transactionid: number;
  productid: number;
  type: "IN" | "OUT";
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
