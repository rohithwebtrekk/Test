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
    isPreorder: '',
    rating: 0,
    reviews: 0;
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

    this.getStates();
    this.buildForm();
  }

  getCustomer(id: string) {
      this.dataService.getCustomer(id)
        .subscribe((customer: ICustomer) => {
          //Quick and dirty clone used in case user cancels out of form
          const cust = JSON.stringify(customer);
          this.customer = JSON.parse(cust);
          this.buildForm();
        },
        (err) => console.log(err));
  }

  buildForm() {
      this.customerForm = this.formBuilder.group({
        suggestions:  [this.customer.suggestions, Validators.required],
        subTitle:   [this.customer.subTitle, Validators.required],
        stateId:    [this.customer.stateId, Validators.required],
        rating:    [this.customer.rating],
        reviews:    [this.customer.reviews],
      });
  }

  getStates() {
    this.dataService.getStates().subscribe((states: IState[]) => this.states = states);
  }

  submit({ value, valid }: { value: ICustomer, valid: boolean }) {

      value._id = this.customer._id;

      // var customer: ICustomer = {
      //   _id: this.customer._id,
      // };

      if (value._id) {



      } else {



      }
  }

  cancel(event: Event) {
    event.preventDefault();
    this.router.navigate(['/customers']);
  }

  delete(event: Event) {

  }

}
