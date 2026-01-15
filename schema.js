const Joi = require('joi');

module.exports.invoiceSchema = Joi.object({
    invoice: Joi.object({
        invoiceNumber: Joi.string().required(),
        invoiceDate: Joi.date().allow(''), // Allows empty string from HTML date pickers
        dueDate: Joi.date().required(),
        billFrom: Joi.object({
            businessName: Joi.string().required(),
            email: Joi.string().email().required(),
            address: Joi.string().required(),
            phone: Joi.string().regex(/^[6-9]\d{9}$/).required().messages({
                'string.pattern.base': 'Bill From: Invalid Indian phone number'
            })
        }).required(),
        billTo: Joi.object({
            clientName: Joi.string().required(),
            email: Joi.string().email().required(),
            address: Joi.string().required(),
            phone: Joi.string().regex(/^[6-9]\d{9}$/).required().messages({
                'string.pattern.base': 'Bill To: Invalid Indian phone number'
            })
        }).required(),
        items: Joi.array().items(
            Joi.object({
                name: Joi.string().required(),
                quantity: Joi.number().min(1).required(),
                unitPrice: Joi.number().min(0).required(),
                taxPercent: Joi.number().min(0).default(0),
                total: Joi.number().required()
            })
        ).min(1).required(),
        notes: Joi.string().allow(''),
        paymentTerms: Joi.string().default("Net 15"),
        status: Joi.string().valid('paid', 'unpaid').default('unpaid'),
        subtotal: Joi.number().min(0).required(),
        taxTotal: Joi.number().min(0).required(),
        total: Joi.number().min(0).required()
    }).required()
});

module.exports.userBusinessSchema = Joi.object({
    businessName: Joi.string().required().messages({
        'string.empty': 'Business Name is required'
    }),
    address: Joi.string().required().messages({
        'string.empty': 'Business Address is required'
    }),
    phone: Joi.string().regex(/^[6-9]\d{9}$/).required().messages({
        'string.pattern.base': 'Invalid Indian phone number'
    })
});