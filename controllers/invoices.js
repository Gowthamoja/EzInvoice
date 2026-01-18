const Invoice = require('../models/invoice');

module.exports.index = async (req, res) => {
    const allInvoices = await Invoice.find({ user: req.user._id }).sort({ createdAt: -1 });
    
    console.log(`Found ${allInvoices.length} invoices for user: ${req.user.username}`);
    console.log(allInvoices);
    // res.send(allInvoices);
    res.render('invoices/index.ejs', { allInvoices });
};

module.exports.renderNewForm = async (req, res) => {
    res.render('invoices/new.ejs', {user: req.user});
};



module.exports.createInvoice = async (req, res, next) => {

    const { invoiceNumber } = req.body.invoice;

    const existingInvoice = await Invoice.findOne({ 
        invoiceNumber: invoiceNumber, 
        user: req.user._id 
    });

    if (existingInvoice) {
        req.flash("error", "You have already used this invoice number!");
        return res.redirect('/invoices/new');
    }


    let newInvoice = new Invoice(req.body.invoice);
    newInvoice.user = req.user._id;
    console.log(Invoice);
    await newInvoice.save();
    req.flash("success", "New Invoice Created!");
    res.redirect('/invoices');
};

module.exports.showInvoice = async (req, res) => {
    let { id } = req.params;
    const invoice = await Invoice.findById(id)
    .populate("user");
    console.log(invoice);

    res.render('invoices/show.ejs', { invoice });

};

module.exports.renderEditForm = async (req, res, next) => {
    let { id } = req.params;
    const invoice = await Invoice.findById(id).populate("user");
    console.log(invoice);

    res.render('invoices/edit.ejs', { invoice });
};

module.exports.updateInvoice = async (req, res, next) => {
    // let invoice = new Invoice(req.body.invoice);
    let { id } = req.params;
    await Invoice.findByIdAndUpdate(id, { ...req.body.invoice });
     req.flash("success", "Invoice Updated!");
    res.redirect(`/invoices/${id}`);
};


module.exports.destroyInvoice = async (req, res) => {
    let { id } = req.params;
    await Invoice.findByIdAndDelete(id);
     req.flash("success", "Invoice Deleted!");
    res.redirect('/invoices');
};