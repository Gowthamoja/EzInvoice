const mongoose = require('mongoose');
const initData = require('./data.js');
const Invoice = require('../models/invoice.js');

// const MONGO_URL = 'mongodb://127.0.0.1:27017/invoice';
const MONGO_URL = 'mongodb+srv://gowthamoja_db_user:y58n8Abryr0CezmH@cluster0.9pgci2b.mongodb.net/?appName=Cluster0';

main()
.then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Invoice.deleteMany({});
    // await sampleInvoice.save();
    await Invoice.insertMany(initData.data);
    console.log("Data was Initialized");
}

initDB();
