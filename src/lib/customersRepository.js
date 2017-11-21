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
                    .sort({subTitle: 1})
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

            Customer.find({}, { '_id': 0, 'suggestions': 1, 'subTitle': 1, 'rating': 1 })
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

        customer.suggestions = body.suggestions;
        customer.subTitle = body.subTitle;
        customer.rating = body.rating;
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

            customer.suggestions = body.suggestions || customer.suggestions;
            customer.subTitle = body.subTitle || customer.subTitle;
            customer.rating = body.rating || customer.rating;

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
