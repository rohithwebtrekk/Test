import { ModuleWithProviders } from '@angular/core';

export interface ICustomer {
    _id?: string;
    suggestions: string;
    subTitle: string;
    rating?:number;
}

export interface IRouting {
    routes: ModuleWithProviders,
    components: any[]
}

export interface IPagedResults<T> {
    totalRecords: number;
    results: T;
}

export interface ICustomerResponse {
    customer: ICustomer;
    status: boolean;
    error: string;
}
