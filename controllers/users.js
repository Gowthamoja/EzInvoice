const User = require('../models/user.js');

module.exports.renderSignup = (req,res) => {
    res.render('users/signup.ejs');
};

module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash('success', 'Welcome! Let\'s set up your business.');
            res.redirect('/signup/business-details');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
};

module.exports.renderBusinessDetailForm = (req, res) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'Please signup first');
        return res.redirect('/signup');
    }
    res.render('users/business_details.ejs');
};

module.exports.saveBusinessDetails = async (req, res) => {
        const { businessName, address, phone } = req.body;
        
        await User.findByIdAndUpdate(req.user._id, {
            businessDetails: { businessName, address, phone }
        });

        req.flash('success', 'Business details saved!');
        res.redirect('/invoices');
};


module.exports.renderLogin = (req,res) => {
    res.render('users/login.ejs');
};

module.exports.login = async (req, res) => {
        req.flash("success", "Welcome back to EzInvoice!");

        if (!req.user.businessDetails || !req.user.businessDetails.businessName) {
            return res.redirect('/signup/business-details');
        }

        res.redirect('/invoices');
};

module.exports.logout = (req,res,next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash('success', "You are logged out!");
        res.redirect('/login');
    })
};

module.exports.renderProfile = async (req, res) => {
    res.render('users/profile.ejs', { user: req.user });
};

module.exports.updateProfile = async (req, res) => {
    const { businessName, address, phone } = req.body;
    await User.findByIdAndUpdate(req.user._id, {
        businessDetails: { businessName, address, phone }
    });
    req.flash('success', 'Business profile updated successfully!');
    res.redirect('/invoices');
};