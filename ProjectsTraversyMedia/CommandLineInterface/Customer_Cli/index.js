const mongoose = require('mongoose');

//Map global promise - get rid of warning


//Connect to db
const db = mongoose.connect('mongodb://localhost:27017/Customer_Cli',{
    useMongoClient: true
});

//Import model
const Customer = require('./models/customer');

//Add customer
const addCustomer = (customer) =>{
    Customer.create(customer).then(customer =>{
        console.info('New Customer Added!');
        db.close();
    });
}

//Find Customer
const findCustomer = (name)=>{
    //Make case insensitive
    const search = new RegExp(name, 'i');
    Customer.find({$or: [{firstName:search}, {lastName:search}]})
        .then(customer=>{
            console.info(customer);
            console.info(`${customer.length} matches`)
        });
}