export interface Category {
    categoryid: number;
    categoryName: string;
    categoryPrefix:string;
    categoryDescription: string;

}

export interface GetCategoryResponse {
    count: number;
    categories: Category[];
}