const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
// const Invoice = require('../models/invoice.js');
const {isLoggedIn, isOwner, validateInvoice, isProfileComplete} = require('../middleware.js');

const invoiceController = require('../controllers/invoices.js');



router.route('/')
.get(isLoggedIn, isProfileComplete, wrapAsync(invoiceController.index)) //Index route
.post(isLoggedIn, isProfileComplete, validateInvoice , wrapAsync(invoiceController.createInvoice)); // create route


// new route

router.get('/new', isLoggedIn , isProfileComplete, wrapAsync( invoiceController.renderNewForm ));



router.route('/:id')
.get(isLoggedIn, isProfileComplete, isOwner , wrapAsync(invoiceController.showInvoice)) //show route
.put(isLoggedIn, isProfileComplete, isOwner , validateInvoice , wrapAsync(invoiceController.updateInvoice)) // update route
.delete(isLoggedIn, isProfileComplete, isOwner , wrapAsync(invoiceController.destroyInvoice)); //delete route


// edit route

router.get('/:id/edit', isLoggedIn, isProfileComplete, isOwner , wrapAsync(invoiceController.renderEditForm));



module.exports = router;

// index route

// router.get('/', isLoggedIn, isProfileComplete, wrapAsync(invoiceController.index));


// create route

// router.post('/', isLoggedIn, isProfileComplete, validateInvoice , wrapAsync(invoiceController.createInvoice));

// show route

// router.get('/:id',isLoggedIn, isProfileComplete, isOwner , wrapAsync(invoiceController.showInvoice));


// update route

// router.put('/:id', isLoggedIn, isProfileComplete, isOwner , validateInvoice , wrapAsync(invoiceController.updateInvoice));

// delete route

// router.delete('/:id', isLoggedIn, isProfileComplete, isOwner , wrapAsync(invoiceController.destroyInvoice));

