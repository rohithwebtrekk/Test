import { ModuleWithProviders } from '@angular/core';

export interface ICustomer {
    _id?: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthday?:Date;
    lastContact?:Date;
    customerLifeTimeValue?:number;
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
