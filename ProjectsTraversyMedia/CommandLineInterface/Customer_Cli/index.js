const mongoose = require("mongoose");

//Map global promise - get rid of warning

//Connect to db
mongoose
  .connect("mongodb://localhost:27017/Customer_Cli")
  .then
  // () => console.log("MongoDB Connected")
  ()
  .catch((err) => console.error(err));

//Import model
const Customer = require("./models/customer");

//Add customer
const addCustomer = (customer) => {
  Customer.create(customer)
    .then((customer) => {
      console.info("New Customer Added!");
    })
    .finally(() => {
      mongoose.connection.close();
    });
};

//Find Customer
const findCustomer = (name) => {
  //Make case insensitive
  const search = new RegExp(name, "i");
  Customer.find({ $or: [{ firstName: search }, { lastName: search }] })
    .then((customer) => {
      console.info(customer);
      console.info(`${customer.length} matches`);
    })
    .finally(() => {
      mongoose.connection.close();
    });
};

//Update Customer
const updateCustomer = (_id, customer) => {
  Customer.findByIdAndUpdate({ _id }, customer).then(() => {
    console.info("Customer Updated!");
  })
  .finally(()=>{
    mongoose.connection.close();
  })
};

//Remove Customer
const removeCustomer = (_id) => {
  Customer.deleteOne({ _id }).then(() => {
    console.info("Customer Removed!");
  })
  .finally(()=>{
    mongoose.connection.close();
  })
};

//List Customers
const listCustomers = () => {
  Customer.find().then((customers) => {
    console.info(customers);
    console.info(`${customers.length} customers`);
  })
  .finally(()=>{
    mongoose.connection.close();
  })
};

//Export all methods
module.exports = {
  addCustomer,
  findCustomer,
  updateCustomer,
  removeCustomer,
  listCustomers,
};
