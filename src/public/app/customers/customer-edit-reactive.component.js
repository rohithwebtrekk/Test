"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var data_service_1 = require("../core/data.service");
var CustomerEditReactiveComponent = /** @class */ (function () {
    function CustomerEditReactiveComponent(router, route, dataService, formBuilder) {
        this.router = router;
        this.route = route;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.customer = {
            firstName: '',
            lastName: '',
            gender: '',
            birthday: new Date(),
            lastContact: new Date(),
            customerLifeTimeValue: 0
        };
        this.operationText = 'Insert';
    }
    CustomerEditReactiveComponent.prototype.ngOnInit = function () {
        var id = this.route.snapshot.params['id'];
        if (id !== '0') {
            this.operationText = 'Update';
            this.getCustomer(id);
        }
        this.getStates();
        this.buildForm();
    };
    CustomerEditReactiveComponent.prototype.getCustomer = function (id) {
        var _this = this;
        this.dataService.getCustomer(id)
            .subscribe(function (customer) {
            _this.customer = customer;
            _this.buildForm();
        }, function (err) { return console.log(err); });
    };
    CustomerEditReactiveComponent.prototype.buildForm = function () {
        this.customerForm = this.formBuilder.group({
            firstName: [this.customer.firstName, forms_1.Validators.required],
            lastName: [this.customer.lastName, forms_1.Validators.required],
            gender: [this.customer.gender, forms_1.Validators.required],
            stateId: [this.customer.stateId, forms_1.Validators.required],
            birthday: [this.customer.birthday],
            lastContact: [this.customer.lastContact],
            customerLifeTimeValue: [this.customer.customerLifeTimeValue],
        });
    };
    CustomerEditReactiveComponent.prototype.getStates = function () {
        var _this = this;
        this.dataService.getStates().subscribe(function (states) { return _this.states = states; });
    };
    CustomerEditReactiveComponent.prototype.submit = function (_a) {
        var _this = this;
        var value = _a.value, valid = _a.valid;
        value._id = this.customer._id;
        // var customer: ICustomer = {
        //   _id: this.customer._id,
        // };
        if (value._id) {
            this.dataService.updateCustomer(value)
                .subscribe(function (customer) {
                if (customer) {
                    _this.router.navigate(['/customers']);
                }
                else {
                    _this.errorMessage = 'Unable to save customer';
                }
            }, function (err) { return console.log(err); });
        }
        else {
            this.dataService.insertCustomer(value)
                .subscribe(function (customer) {
                if (customer) {
                    _this.router.navigate(['/customers']);
                }
                else {
                    _this.errorMessage = 'Unable to add customer';
                }
            }, function (err) { return console.log(err); });
        }
    };
    CustomerEditReactiveComponent.prototype.cancel = function (event) {
        event.preventDefault();
        this.router.navigate(['/customers']);
    };
    CustomerEditReactiveComponent.prototype.delete = function (event) {
        var _this = this;
        event.preventDefault();
        this.dataService.deleteCustomer(this.customer._id)
            .subscribe(function (status) {
            if (status) {
                _this.router.navigate(['/customers']);
            }
            else {
                _this.errorMessage = 'Unable to delete customer';
            }
        }, function (err) { return console.log(err); });
    };
    CustomerEditReactiveComponent = __decorate([
        core_1.Component({
            selector: 'customer-edit-reactive',
            templateUrl: './customer-edit-reactive.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            data_service_1.DataService,
            forms_1.FormBuilder])
    ], CustomerEditReactiveComponent);
    return CustomerEditReactiveComponent;
}());
exports.CustomerEditReactiveComponent = CustomerEditReactiveComponent;
//# sourceMappingURL=customer-edit-reactive.component.js.map