import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataFilterService } from '../core/data-filter.service';

import { ICustomer, IOrder, IPagedResults } from '../shared/interfaces';

@Component({
  selector: 'customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {

  title: string;
  customers: ICustomer[] = [];
  filteredCustomers: ICustomer[] = [];

  totalRecords: number = 0;
  pageSize: number = 10;

  constructor(private router: Router,

              private dataFilter: DataFilterService) { }

  ngOnInit() {
    this.title = 'Customers';
    this.getCustomers();
  }

  filterChanged(filterText: string) {
    if (filterText && this.customers) {
        let props = ['suggestions', 'subTitle', 'address', 'city', 'state.name', 'orderTotal','rating','reviews','isPreorder'];
        this.filteredCustomers = this.dataFilter.filter(this.customers, props, filterText);
    }
    else {
      this.filteredCustomers = this.customers;
    }
  }


  getCustomers() {

  }

}
