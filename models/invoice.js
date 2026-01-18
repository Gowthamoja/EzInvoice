const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    },
    taxPercent: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        required: true
    }
});

const invoiceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    invoiceNumber: {
        type: String,
        required: true,
    },
    invoiceDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
    },
    billFrom: {
        businessName: String,
        email: String,
        address: String,
        phone: {
            type: String,
            required: true,
            trim: true,
            match: [/^[6-9]\d{9}$/, "Invalid Indian phone number"]
        }
    },
    billTo: {
        clientName: String,
        email: String,
        address: String,
        phone: {
            type: String,
            required: true,
            trim: true,
            match: [/^[6-9]\d{9}$/, "Invalid Indian phone number"]
        },
    },
    items: [itemSchema],
    notes: {
        type: String,
    },
    paymentTerms: {
        type: String,
        default: "Net 15",
    },
    status: {
        type: String,
        enum: ['paid', 'unpaid'],
        default: 'unpaid',
    },
    subtotal: Number,
    taxTotal: Number,
    total: Number,
}, {
    timestamps: true,
});

invoiceSchema.index({ user: 1, invoiceNumber: 1 }, { unique: true });

module.exports = mongoose.model("Invoice", invoiceSchema);