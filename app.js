const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');

const Invoice = require('./models/invoice.js');

const MONGO_URL = 'mongodb+srv://gowthamoja_db_user:y58n8Abryr0CezmH@cluster0.9pgci2b.mongodb.net/?appName=Cluster0';
// const MONGO_URL = 'mongodb://127.0.0.1:27017/invoice';

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

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req,res) => {
    // res.send('Hi, I am root');
    res.redirect('/login');
});

// signup route

app.get('/signup',(req,res) => {
    res.render('invoices/signup.ejs');
});

// login route

app.get('/login', (req,res) => {
    res.render('invoices/login.ejs');
});

// post route

app.post('/login', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(`Login attempt for: ${email}`);
    res.redirect('/invoices');
})

// index route

app.get('/invoices' ,async (req, res) => {
   const allInvoices =  await Invoice.find({})
    console.log(allInvoices);
    // res.send(allInvoices);
    res.render('invoices/index.ejs', {allInvoices});
});

// new route

app.get('/invoices/new', async (req,res) => {
    res.render('invoices/new.ejs');
});

// create route

app.post('/invoices', async (req,res) => {
    let invoice = new Invoice(req.body.invoice);
    console.log(invoice);
    await invoice.save();
    res.redirect('/invoices');
});

// show route

app.get('/invoices/:id', async (req,res) => {
    let {id} = req.params;
    const invoice = await Invoice.findById(id);
    res.render('invoices/show.ejs' , {invoice});
    
});

// edit route

app.get('/invoices/:id/edit', async (req,res) => {
    let {id} = req.params;
    const invoice = await Invoice.findById(id);
    console.log(invoice); 
    res.render('invoices/edit.ejs', {invoice});
});

// update route

app.put('/invoices/:id', async (req,res) => {
    // let invoice = new Invoice(req.body.invoice);
    let {id} = req.params;
    await Invoice.findByIdAndUpdate(id, {...req.body.invoice});
    res.redirect(`/invoices/${id}`);
});

// delete route

app.delete('/invoices/:id', async (req,res) => {
    let {id} = req.params;
    await Invoice.findByIdAndDelete(id);
    res.redirect('/invoices');
});

app.get('/terms', (req,res) => {
    res.send("Page is under construction");
} );

app.get('/privacy', (req,res) => {
    res.send("Page is under construction");
});

app.get('/forgot-password', (req,res) => {
    res.send("Page is under construction");
})

// app.get('/testInvoice', async(req,res) => {
//     let sampleInvoice = new Invoice({
//   invoiceNumber: "INV-2025-09-001A",
//   invoiceDate: "2025-09-27T10:00:00.000Z",
//   dueDate: "2025-10-12T10:00:00.000Z",
//   billFrom: {
//     businessName: "Tech Solutions Inc.",
//     email: "billing@techsolutions.com",
//     address: "123 Main St, Anytown, CA 90210",
//     phone: "+1-555-123-4567"
//   },
//   billTo: {
//     clientName: "Global Client Corp",
//     email: "accounts@globalclient.com",
//     address: "456 Oak Ave, Big City, NY 10001",
//     phone: "+1-555-987-6543"
//   },
//   items: [
//     {
//       name: "Consulting Services (10 hours)",
//       quantity: 10,
//       unitPrice: 150.00,
//       taxPercent: 5,
//       total: 1575.00
//     },
//     {
//       name: "Software License (Annual)",
//       quantity: 1,
//       unitPrice: 500.00,
//       taxPercent: 0,
//       total: 500.00
//     },
//     {
//       name: "Cloud Storage Subscription",
//       quantity: 1,
//       unitPrice: 50.00,
//       taxPercent: 5,
//       total: 52.50
//     }
//   ],
//   notes: "Please remit payment by the due date. Thank you for your business!",
//   paymentTerms: "Net 15",
//   status: "unpaid",
//   subtotal: 2050.00,
//   taxTotal: 77.50,
//   total: 2127.50
// }
//     );

//     await sampleInvoice.save();
//     console.log("sample was saved");
//     res.send("Successfully saved");
// });

app.listen(8080, () => {
    console.log("server is listening to port 8080");
})