const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const {isLoggedIn, validateBusinessDetails, isProfileComplete, redirectIfLoggedIn, redirectIfProfileComplete} = require('../middleware.js');

const userController = require('../controllers/users.js');


router.route('/signup')
.get(redirectIfLoggedIn, userController.renderSignup)
.post(redirectIfLoggedIn ,wrapAsync(userController.signup));

router.route('/signup/business-details')
.get(isLoggedIn, redirectIfProfileComplete, userController.renderBusinessDetailForm)
.post(isLoggedIn,
    redirectIfProfileComplete, 
    validateBusinessDetails,
    wrapAsync(userController.saveBusinessDetails)
);

router.route('/login')
.get(redirectIfLoggedIn, userController.renderLogin)
.post(redirectIfLoggedIn, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
    userController.login
);

router.route('/profile')
.get(isLoggedIn, isProfileComplete, wrapAsync(userController.renderProfile))
.put(isLoggedIn, validateBusinessDetails, wrapAsync(userController.updateProfile));

router.get('/logout', userController.logout)


module.exports = router;

// router.get('/signup', userController.renderSignupignup);

// router.post('/signup', wrapAsync(userController.signup));

// router.get('/signup/business-details', userController.renderBusinessDetailForm);

// router.post('/signup/business-details', 
//     isLoggedIn, 
//     validateBusinessDetails,
//     wrapAsync(userController.saveBusinessDetails)
// );

// router.get('/login', userController.renderLogin);

// router.post('/login', 
//     passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
//     userController.login
// );


// router.get('/profile', isLoggedIn, isProfileComplete, wrapAsync(userController.renderProfile));


// router.put('/profile', isLoggedIn, validateBusinessDetails, wrapAsync(userController.updateProfile));


