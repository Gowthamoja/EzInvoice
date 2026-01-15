const Invoice = require("./models/invoice");
// const User = require('./models/user');

const ExpressError = require('./utils/ExpressError.js');
const {invoiceSchema, userBusinessSchema} = require('./schema.js');



module.exports.isLoggedIn = (req,res, next) => {
    if(!req.isAuthenticated()) {
        // res.session.redirectUrl = req.originalUrl;
        req.flash('error', 'You must be logged in to use EzInvoice');
        return res.redirect('/login');
    }
    next();
}


module.exports.redirectIfLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/invoices');
    }
    next();
};


// module.exports.saveRedirectUrl = (req,res,next) => {
//     if(req.session.redirectUrl) {
//         res.locals.redirectUrl = req.session.redirectUrl;
//     }
//     next();
// }


module.exports.isOwner = async (req,res,next) => {
    let {id} = req.params;
    const invoice = await Invoice.findById(id)
        .populate("user");

    if(!invoice) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect('/invoices');
    }

    if (!invoice.user._id.equals(req.user._id)) {  //res.locals update krna hai
        req.flash("error", "You do not own this invoice.");
        return res.redirect('/invoices');
    }
    next();
}


module.exports.validateInvoice = (req,res,next) => {
 let {error} = invoiceSchema.validate(req.body);
 if (error) {
        let errMsg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    }
}


module.exports.isProfileComplete = (req, res, next) => {
    if (req.isAuthenticated() && (!req.user.businessDetails || !req.user.businessDetails.businessName)) {
        req.flash('error', 'Please complete your business profile first!');
        return res.redirect('/signup/business-details');
    }
    next();
};


module.exports.redirectIfProfileComplete = (req, res, next) => {
    if (req.isAuthenticated() && req.user.businessDetails && req.user.businessDetails.businessName) {
        req.flash('error', 'Your business profile is already complete!');
        return res.redirect('/invoices');
    }
    next();
};


module.exports.validateBusinessDetails = (req, res, next) => {
    let { error } = userBusinessSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(',');
        req.flash('error', errMsg);
        return res.redirect('/signup/business-details');
    } else {
        next();
    }
};