export interface Category {
    categoryid: number;
    categoryName: string;
    categoryPrefix:string;
    categoryDescription: string;
    productCount?:number;
}

export interface GetCategoryResponse {
    count: number;
    categories: Category[];
}