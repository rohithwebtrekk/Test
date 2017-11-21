import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../core/data.service';
import { ICustomer, IState } from '../shared/interfaces';
import { ValidationService } from '../shared/validation.service';

@Component({
  selector: 'customer-edit-reactive',
  templateUrl: './customer-edit-reactive.component.html'
})
export class CustomerEditReactiveComponent implements OnInit {

  customerForm: FormGroup;
  customer: ICustomer = {
    suggestions: '',
    subTitle: '',
    rating: '',
    reviews: '',
    isPreorder: '',
  };
  states: IState[];
  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText: string = 'Insert';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dataService: DataService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (id !== '0') {
      this.operationText = 'Update';
      this.getCustomer(id);
    }


    this.buildForm();
  }

  getCustomer(id: string) {
      this.dataService.getCustomer(id)
        .subscribe((customer: ICustomer) => {
          this.customer = customer;
          this.buildForm();
        },
        (err) => console.log(err));
  }

  buildForm() {
      this.customerForm = this.formBuilder.group({
        suggestions:  [this.customer.suggestions, Validators.required],
        subTitle:   [this.customer.subTitle, Validators.required],
        rating: [this.customer.rating],
        reviews: [this.customer.reviews],
      });
  }


  submit({ value, valid }: { value: ICustomer, valid: boolean }) {

      value._id = this.customer._id;
      // var customer: ICustomer = {
      //   _id: this.customer._id,
      // };

      if (value._id) {

        this.dataService.updateCustomer(value)
          .subscribe((customer: ICustomer) => {
            if (customer) {
              this.router.navigate(['/customers']);
            }
            else {
              this.errorMessage = 'Unable to save customer';
            }
          },
          (err) => console.log(err));

      } else {

        this.dataService.insertCustomer(value)
          .subscribe((customer: ICustomer) => {
            if (customer) {
              this.router.navigate(['/customers']);
            }
            else {
              this.errorMessage = 'Unable to add customer';
            }
          },
          (err) => console.log(err));

      }
  }

  cancel(event: Event) {
    event.preventDefault();
    this.router.navigate(['/customers']);
  }

  delete(event: Event) {
    event.preventDefault();
    this.dataService.deleteCustomer(this.customer._id)
        .subscribe((status: boolean) => {
          if (status) {
            this.router.navigate(['/customers']);
          }
          else {
            this.errorMessage = 'Unable to delete customer';
          }
        },
        (err) => console.log(err));
  }

}
