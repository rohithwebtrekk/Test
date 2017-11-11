// Module dependencies
const   mongoose = require('mongoose'),
        Customer = require('../models/customer'),
        State = require('../models/state'),
        dbConfig = require('./configLoader').databaseConfig,
        connectionString = `mongodb://${dbConfig.host}/${dbConfig.database}`,
        connection = null;

class DBSeeder {

    init() {
        mongoose.connection.db.listCollections({name: 'customers'})
                .next((err, collinfo) => {
                    if (!collinfo) {
                        console.log('Starting dbSeeder...');
                        this.seed();
                    }
                });
    }

    seed() {

        console.log('Seeding data....');

        //Customers
        var customerNames =
        [
            "Marcus,HighTower,Male,acmecorp.com",
            "Jesse,Smith,Female,gmail.com",
            "Albert,Einstein,Male,outlook.com",

        ];


        Customer.remove({});

        var l = customerNames.length,
            i,
            j;

        for (i = 0; i < l; i++) {
            var nameGenderHost = customerNames[i].split(',');

            var customer = new Customer({
                'firstName': nameGenderHost[0],
                'lastName': nameGenderHost[1],
                'gender': nameGenderHost[2],

            });

            customer.save((err, cust) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('inserted customer: ' + cust.firstName + ' ' + cust.lastName);
                }
            });
        }

    }
}

module.exports = new DBSeeder();
