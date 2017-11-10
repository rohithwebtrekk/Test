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
        var addresses =
        [
            "1234 Anywhere St.",
            "435 Main St.",
            "1 Atomic St."

        ];

        var citiesStates =
        [
            "Phoenix,AZ,Arizona",
            "Encinitas,CA,California",
            "Seattle,WA,Washington"

        ];

        var citiesIds = [5, 9, 44, 5, 36, 17, 16, 9, 36, 14, 14, 6, 9, 24, 44, 36, 25, 19, 5, 14, 5, 23, 38, 17];


        var zip = 85229;

        var orders =
        [
        { "product": "Basket", "price": 29.99, "quantity": 1 },
        { "product": "Yarn", "price": 9.99, "quantity": 1 },
        { "product": "Needes", "price": 5.99, "quantity": 1 },
    
        ];

        Customer.remove({});

        var l = customerNames.length,
            i,
            j,
            firstOrder,
            lastOrder,
            tempOrder,
            n = orders.length;

        for (i = 0; i < l; i++) {
            var nameGenderHost = customerNames[i].split(',');
            var cityState = citiesStates[i].split(',');
            var state = { 'id': citiesIds[i], 'abbreviation': cityState[1], 'name': cityState[2] };
            var customer = new Customer({
                'firstName': nameGenderHost[0],
                'lastName': nameGenderHost[1],
                'state': state,
                'stateId': citiesIds[i],
                'gender': nameGenderHost[2],
                'orderCount': 0
            });
            firstOrder = Math.floor(Math.random() * orders.length);
            lastOrder = Math.floor(Math.random() * orders.length);
            if (firstOrder > lastOrder) {
                tempOrder = firstOrder;
                firstOrder = lastOrder;
                lastOrder = tempOrder;
            }

            customer.orders = [];
            //console.log('firstOrder: ' + firstOrder + ", lastOrder: " + lastOrder);
            for (j = firstOrder; j <= lastOrder && j < n; j++) {
                var today = new Date();
                var tomorrow = new Date();
                tomorrow.setDate(today.getDate() + (Math.random() * 100));

                var o = {
                    "product": orders[j].product,
                    "price": orders[j].price,
                    "quantity": orders[j].quantity,
                    "date": tomorrow
                };
                customer.orders.push(o);
            }
            customer.orderCount = customer.orders.length;

            customer.save((err, cust) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('inserted customer: ' + cust.firstName + ' ' + cust.lastName);
                }
            });
        }

        //States
        var states = [
        { "name": "Alabama", "abbreviation": "AL" },
        { "name": "Montana", "abbreviation": "MT" },
        { "name": "Alaska", "abbreviation": "AK" },
        { "name": "Nebraska", "abbreviation": "NE" },
        { "name": "Arizona", "abbreviation": "AZ" },
        { "name": "Nevada", "abbreviation": "NV" },
        { "name": "Arkansas", "abbreviation": "AR" },
        { "name": "New Hampshire", "abbreviation": "NH" },
        { "name": "California", "abbreviation": "CA" },
        { "name": "New Jersey", "abbreviation": "NJ" },
        { "name": "Colorado", "abbreviation": "CO" },
        { "name": "New Mexico", "abbreviation": "NM" },
        { "name": "Connecticut", "abbreviation": "CT" },
        { "name": "New York", "abbreviation": "NY" },
        { "name": "Delaware", "abbreviation": "DE" },
        { "name": "North Carolina", "abbreviation": "NC" },
        { "name": "Florida", "abbreviation": "FL" },
        { "name": "North Dakota", "abbreviation": "ND" },
        { "name": "Georgia", "abbreviation": "GA" },
        { "name": "Ohio", "abbreviation": "OH" },
        { "name": "Hawaii", "abbreviation": "HI" },
        { "name": "Oklahoma", "abbreviation": "OK" },
        { "name": "Idaho", "abbreviation": "ID" },
        { "name": "Oregon", "abbreviation": "OR" },
        { "name": "Illinois", "abbreviation": "IL" },
        { "name": "Pennsylvania", "abbreviation": "PA" },
        { "name": "Indiana", "abbreviation": "IN" },
        { "name": "Rhode Island", "abbreviation": "RI" },
        { "name": "Iowa", "abbreviation": "IA" },
        { "name": "South Carolina", "abbreviation": "SC" },
        { "name": "Kansas", "abbreviation": "KS" },
        { "name": "South Dakota", "abbreviation": "SD" },
        { "name": "Kentucky", "abbreviation": "KY" },
        { "name": "Tennessee", "abbreviation": "TN" },
        { "name": "Louisiana", "abbreviation": "LA" },
        { "name": "Texas", "abbreviation": "TX" },
        { "name": "Maine", "abbreviation": "ME" },
        { "name": "Utah", "abbreviation": "UT" },
        { "name": "Maryland", "abbreviation": "MD" },
        { "name": "Vermont", "abbreviation": "VT" },
        { "name": "Massachusetts", "abbreviation": "MA" },
        { "name": "Virginia", "abbreviation": "VA" },
        { "name": "Michigan", "abbreviation": "MI" },
        { "name": "Washington", "abbreviation": "WA" },
        { "name": "Minnesota", "abbreviation": "MN" },
        { "name": "West Virginia", "abbreviation": "WV" },
        { "name": "Mississippi", "abbreviation": "MS" },
        { "name": "Wisconsin", "abbreviation": "WI" },
        { "name": "Missouri", "abbreviation": "MO" },
        { "name": "Wyoming", "abbreviation": "WY" }
        ];

        var l = states.length,
            i;

        State.remove({});

        for (i = 0; i < l; i++) {
            var state = new State ({ 'id': i + 1, 'name': states[i].name, 'abbreviation': states[i].abbreviation });
            state.save();
        }
    }
}

module.exports = new DBSeeder();
