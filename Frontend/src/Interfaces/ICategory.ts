export interface Category {
    categoryid: number;
    categoryName: string;
    categoryDescription: string;

}

export interface GetCategoryResponse {
    count: number;
    categories: Category[];
}