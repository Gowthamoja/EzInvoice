require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError.js');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');


const invoiceRouter = require('./routes/invoice.js');
const userRouter = require('./routes/user.js');

const PORT = process.env.PORT || 8080;


const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
    console.error("ERROR: MONGO_URL is NOT defined. Add it in Render Environment Variables.");
    process.exit(1);
}




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
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, '/public')));


const store = MongoStore.create({
    mongoUrl: MONGO_URL,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 60 * 60
});

store.on("error", (err) => {
    console.log("ERROR in MONGO SESSION STORE", err);
})

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie : {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};


app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})



app.get('/', (req, res) => {
    // res.send('Hi, I am root');
    res.redirect('/login');
});



// signup route

// app.get('/signup', (req, res) => {
    // res.render('invoices/signup.ejs');
// });

// login route

// app.get('/login', (req, res) => {
    // res.render('invoices/login.ejs');
// });

// post route

// app.post('/login', (req, res) => {
    // const email = req.body.email;
    // const password = req.body.password;
    // console.log(`Login attempt for: ${email}`);
    // res.redirect('/login');
// })

app.get('/demouser', async(req, res) => {
    let fakeUser = new User({
        email: "student@gmail.com",
        username: "rohan"
    });

    let registeredUser = await User.register(fakeUser, "helloworld");
    res.send(registeredUser);

});


// /invoices routes -------------------------------------------------

app.use('/invoices', invoiceRouter);


app.use('/', userRouter);


app.get('/terms', (req, res) => {
    res.send("Page is under construction");
});

app.get('/privacy', (req, res) => {
    res.send("Page is under construction");
});

app.get('/forgot-password', (req, res) => {
    res.send("Page is under construction");
})

app.use((req, res, next) => {
    next(new ExpressError(404, 'Page Not Found!'));
});

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

app.use((err, req, res, next) => {
    let { statusCode = 500, message = 'Something Went Wrong!' } = err;
    res.status(statusCode).render('error.ejs', { message });
    // res.status(statusCode).send(message);
    // res.send('Something went wrong');
})

app.listen(PORT, () => {
    console.log("server is listening to port " + PORT);
})