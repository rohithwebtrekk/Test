import { ModuleWithProviders } from '@angular/core';

export interface ICustomer {
    _id?: string;
    firstName: string;
    lastName: string;
    state?: IState;
    stateId?: number;
    gender: string;
    orderCount?: number;
    orders?: IOrder[];
    orderTotal?: number;
    birthday?:Date;
    lastContact?:Date;
}

export interface IState {
    abbreviation: string;
    name: string;
}

export interface IOrder {
    product: string;
    price: number;
    quantity: number;
    orderTotal?: number;
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