const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      Customer = require('../models/customer');

class CustomersRepository {

    // get all the customers
    getCustomers(callback) {
        console.log('*** CustomersRepository.getCustomers');
        Customer.count((err, custsCount) => {
            let count = custsCount;
            console.log(`Customers count: ${count}`);

            Customer.find({}, (err, customers) => {
                if (err) {
                    console.log(`*** CustomersRepository.getCustomers error: ${err}`);
                    return callback(err);
                }
                callback(null, {
                    count: count,
                    customers: customers
                });
            });

        });
    }

    getPagedCustomers(skip, top, callback) {
        console.log('*** CustomersRepository.getPagedCustomers');
        Customer.count((err, custsCount) => {
            let count = custsCount;
            console.log(`Skip: ${skip} Top: ${top}`);
            console.log(`Customers count: ${count}`);

            Customer.find({})
                    .sort({lastName: 1})
                    .skip(skip)
                    .limit(top)
                    .exec((err, customers) => {
                        if (err) {
                            console.log(`*** CustomersRepository.getPagedCustomers error: ${err}`);
                            return callback(err);
                        }
                        callback(null, {
                            count: count,
                            customers: customers
                        });
                    });

        });
    }

    // get the customer summary
    getCustomersSummary(skip, top, callback) {
        console.log('*** CustomersRepository.getCustomersSummary');
        Customer.count((err, custsCount) => {
            let count = custsCount;
            console.log(`Customers count: ${count}`);

            Customer.find({}, { '_id': 0, 'firstName': 1, 'lastName': 1, 'gender': 1, 'birthday': 1, 'lastContact': 1, 'customerLifeTimeValue': 1 })
                    .skip(skip)
                    .limit(top)
                    .exec((err, customersSummary) => {
                        callback(null, {
                            count: count,
                            customersSummary: customersSummary
                        });
                    });

        });
    }

    // get a  customer
    getCustomer(id, callback) {
        console.log('*** CustomersRepository.getCustomer');
        Customer.findById(id, (err, customer) => {
            if (err) {
                console.log(`*** CustomersRepository.getCustomer error: ${err}`);
                return callback(err);
            }
            callback(null, customer);
        });
    }

    // insert a  customer
    insertCustomer(body, callback) {
        console.log('*** CustomersRepository.insertCustomer');
        let customer = new Customer();
        console.log(body);

        customer.firstName = body.firstName;
        customer.lastName = body.lastName;
        customer.gender = body.gender;
        customer.birthday = body.birthday;
        customer.lastContact = body.lastContact;
        customer.customerLifeTimeValue = body.customerLifeTimeValue;
        customer.save((err, customer) => {
            if (err) {
                console.log(`*** CustomersRepository insertCustomer error: ${err}`);
                return callback(err, null);
            }

            callback(null, customer);
        });
    }

    updateCustomer(id, body, callback) {
        console.log('*** CustomersRepository.editCustomer');



        Customer.findById(id, (err, customer)  => {
            if (err) {
                console.log(`*** CustomersRepository.editCustomer error: ${err}`);
                return callback(err);
            }

            customer.firstName = body.firstName || customer.firstName;
            customer.lastName = body.lastName || customer.lastName;
            customer.gender = body.gender || customer.gender;
            customer.birthday = body.birthday || customer.birthday;
            customer.lastContact = body.lastContact || customer.lastContact;
            customer.customerLifeTimeValue = body.customerLifeTimeValue || customer.customerLifeTimeValue;

            customer.save((err, customer) => {
                if (err) {
                    console.log(`*** CustomersRepository.updateCustomer error: ${err}`);
                    return callback(err, null);
                }

                callback(null, customer);
            });

        });
    }

    // delete a customer
    deleteCustomer(id, callback) {
        console.log('*** CustomersRepository.deleteCustomer');
        Customer.remove({ '_id': id }, (err, customer) => {
            if (err) {
                console.log(`*** CustomersRepository.deleteCustomer error: ${err}`);
                return callback(err, null);
            }
            callback(null, customer);
        });
    }

}

module.exports = new CustomersRepository();
