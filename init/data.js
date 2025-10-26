const sampleInvoices = [
    // ------------------------------------------
    // --- 1. Basic Unpaid Invoice (Net 15) ---
    // ------------------------------------------
    {
        invoiceNumber: "INV-2025-09-001A",
        invoiceDate: new Date("2025-09-27T10:00:00.000Z"),
        dueDate: new Date("2025-10-12T10:00:00.000Z"),
        billFrom: {
            businessName: "Tech Solutions Inc.",
            email: "billing@techsolutions.com",
            address: "123 Main St, Anytown, CA 90210",
            phone: "+1-555-123-4567"
        },
        billTo: {
            clientName: "Global Client Corp",
            email: "accounts@globalclient.com",
            address: "456 Oak Ave, Big City, NY 10001",
            phone: "+1-555-987-6543"
        },
        items: [
            { name: "Consulting Services (10 hours)", quantity: 10, unitPrice: 150.00, taxPercent: 5, total: 1575.00 },
            { name: "Software License (Annual)", quantity: 1, unitPrice: 500.00, taxPercent: 0, total: 500.00 }
        ],
        notes: "Please remit payment by the due date.",
        paymentTerms: "Net 15",
        status: "unpaid",
        subtotal: 2000.00,
        taxTotal: 75.00,
        total: 2075.00
    },

    // ------------------------------------------
    // --- 2. Paid Invoice (Tax-Exempt Items) ---
    // ------------------------------------------
    {
        invoiceNumber: "INV-2025-08-042B",
        invoiceDate: new Date("2025-08-01T15:30:00.000Z"),
        dueDate: new Date("2025-08-16T15:30:00.000Z"),
        billFrom: {
            businessName: "Tech Solutions Inc.",
            email: "billing@techsolutions.com",
            address: "123 Main St, Anytown, CA 90210",
            phone: "+1-555-123-4567"
        },
        billTo: {
            clientName: "Local Groceries LLC",
            email: "accounting@localgroceries.com",
            address: "10 Main Street, Smalltown, TX 78701",
            phone: "+1-555-333-1111"
        },
        items: [
            { name: "Web Hosting (Monthly)", quantity: 3, unitPrice: 25.00, taxPercent: 0, total: 75.00 },
            { name: "Domain Registration", quantity: 1, unitPrice: 15.00, taxPercent: 0, total: 15.00 }
        ],
        notes: "Thank you for the prompt payment!",
        paymentTerms: "Net 15",
        status: "paid",
        subtotal: 90.00,
        taxTotal: 0.00,
        total: 90.00
    },

    // ------------------------------------------
    // --- 3. High Value Unpaid Invoice (10% Tax) ---
    // ------------------------------------------
    {
        invoiceNumber: "INV-2025-10-003C",
        invoiceDate: new Date("2025-10-05T08:00:00.000Z"),
        dueDate: new Date("2025-10-20T08:00:00.000Z"),
        billFrom: {
            businessName: "Tech Solutions Inc.",
            email: "billing@techsolutions.com",
            address: "123 Main St, Anytown, CA 90210",
            phone: "+1-555-123-4567"
        },
        billTo: {
            clientName: "Creative Design Agency",
            email: "creative@agency.net",
            address: "789 Art Lane, Metropolis, GA 30303",
            phone: "+1-555-777-8888"
        },
        items: [
            { name: "Custom Logo Design", quantity: 1, unitPrice: 1200.00, taxPercent: 10, total: 1320.00 },
            { name: "Brand Guidelines Document", quantity: 1, unitPrice: 500.00, taxPercent: 10, total: 550.00 }
        ],
        notes: "Payment upon completion of final design review.",
        paymentTerms: "Net 15",
        status: "unpaid",
        subtotal: 1700.00,
        taxTotal: 170.00,
        total: 1870.00
    },

    // ------------------------------------------
    // --- 4. Paid Invoice with Low Tax ---
    // ------------------------------------------
    {
        invoiceNumber: "INV-2025-07-004D",
        invoiceDate: new Date("2025-07-15T09:00:00.000Z"),
        dueDate: new Date("2025-07-30T09:00:00.000Z"),
        billFrom: {
            businessName: "Tech Solutions Inc.",
            email: "billing@techsolutions.com",
            address: "123 Main St, Anytown, CA 90210",
            phone: "+1-555-123-4567"
        },
        billTo: {
            clientName: "New Startups Group",
            email: "billing@newstartups.org",
            address: "300 Incubator Rd, Innovation City, MA 02108",
            phone: "+1-555-444-2222"
        },
        items: [
            { name: "Server Setup Fee", quantity: 1, unitPrice: 300.00, taxPercent: 3, total: 309.00 },
            { name: "Monthly Maintenance", quantity: 1, unitPrice: 100.00, taxPercent: 3, total: 103.00 }
        ],
        notes: "Invoice paid on 2025-07-25.",
        paymentTerms: "Net 15",
        status: "paid",
        subtotal: 400.00,
        taxTotal: 12.00,
        total: 412.00
    },

    // ------------------------------------------
    // --- 5. Unpaid with High Quantity Item ---
    // ------------------------------------------
    {
        invoiceNumber: "INV-2025-09-005E",
        invoiceDate: new Date("2025-09-10T12:00:00.000Z"),
        dueDate: new Date("2025-09-25T12:00:00.000Z"),
        billFrom: {
            businessName: "Tech Solutions Inc.",
            email: "billing@techsolutions.com",
            address: "123 Main St, Anytown, CA 90210",
            phone: "+1-555-123-4567"
        },
        billTo: {
            clientName: "The Hardware Shop",
            email: "purchasing@hardware.net",
            address: "800 Tool Road, Industrial Park, MI 48122",
            phone: "+1-555-666-7777"
        },
        items: [
            { name: "Bulk Fiber Optic Cable (Meter)", quantity: 500, unitPrice: 2.50, taxPercent: 5, total: 1312.50 },
            { name: "Installation Consultation", quantity: 2, unitPrice: 100.00, taxPercent: 5, total: 210.00 }
        ],
        notes: "Large order discount included in unit price.",
        paymentTerms: "Net 15",
        status: "unpaid",
        subtotal: 1450.00, // (500*2.50) + (2*100) = 1250 + 200
        taxTotal: 72.50, // 1450 * 0.05
        total: 1522.50
    },

    // ------------------------------------------
    // --- 6. Invoice with no tax (Paid) ---
    // ------------------------------------------
    {
        invoiceNumber: "INV-2025-06-006F",
        invoiceDate: new Date("2025-06-05T11:00:00.000Z"),
        dueDate: new Date("2025-06-20T11:00:00.000Z"),
        billFrom: {
            businessName: "Tech Solutions Inc.",
            email: "billing@techsolutions.com",
            address: "123 Main St, Anytown, CA 90210",
            phone: "+1-555-123-4567"
        },
        billTo: {
            clientName: "City Library Services",
            email: "finance@citylib.gov",
            address: "1 Main Library Plaza, Downtown, IL 60601",
            phone: "+1-555-999-0000"
        },
        items: [
            { name: "Software Upgrade", quantity: 1, unitPrice: 750.00, taxPercent: 0, total: 750.00 }
        ],
        notes: "Government client, tax exempt.",
        paymentTerms: "Net 15",
        status: "paid",
        subtotal: 750.00,
        taxTotal: 0.00,
        total: 750.00
    },

    // ------------------------------------------
    // --- 7. Invoice with long payment terms (Unpaid) ---
    // ------------------------------------------
    {
        invoiceNumber: "INV-2025-10-007G",
        invoiceDate: new Date("2025-10-01T14:00:00.000Z"),
        dueDate: new Date("2025-11-30T14:00:00.000Z"),
        billFrom: {
            businessName: "Tech Solutions Inc.",
            email: "billing@techsolutions.com",
            address: "123 Main St, Anytown, CA 90210",
            phone: "+1-555-123-4567"
        },
        billTo: {
            clientName: "Large Projects PLC",
            email: "ap@largeprojects.com",
            address: "400 Tower St, Central City, PA 19104",
            phone: "+1-555-101-2020"
        },
        items: [
            { name: "Phase I Development", quantity: 1, unitPrice: 5000.00, taxPercent: 5, total: 5250.00 }
        ],
        notes: "Contract term: Net 60 days.",
        paymentTerms: "Net 60",
        status: "unpaid",
        subtotal: 5000.00,
        taxTotal: 250.00,
        total: 5250.00
    },

    // ------------------------------------------
    // --- 8. Multiple small items (Paid) ---
    // ------------------------------------------
    {
        invoiceNumber: "INV-2025-05-008H",
        invoiceDate: new Date("2025-05-20T10:30:00.000Z"),
        dueDate: new Date("2025-06-04T10:30:00.000Z"),
        billFrom: {
            businessName: "Tech Solutions Inc.",
            email: "billing@techsolutions.com",
            address: "123 Main St, Anytown, CA 90210",
            phone: "+1-555-123-4567"
        },
        billTo: {
            clientName: "Small Business Starter",
            email: "hello@starterkit.co",
            address: "10 Main St, Suite 100, Startsville, CA 92008",
            phone: "+1-555-303-4040"
        },
        items: [
            { name: "Email Setup", quantity: 5, unitPrice: 10.00, taxPercent: 5, total: 52.50 },
            { name: "Backup Service (Monthly)", quantity: 3, unitPrice: 15.00, taxPercent: 5, total: 47.25 },
            { name: "Security Audit", quantity: 1, unitPrice: 200.00, taxPercent: 5, total: 210.00 }
        ],
        notes: "",
        paymentTerms: "Net 15",
        status: "paid",
        subtotal: 295.00,
        taxTotal: 14.75, // (50 * 0.05) + (45 * 0.05) + (200 * 0.05) = 2.50 + 2.25 + 10.00
        total: 309.75
    },

    // ------------------------------------------
    // --- 9. No Due Date Set (Uses Schema Default) ---
    // ------------------------------------------
    {
        invoiceNumber: "INV-2025-10-009I",
        invoiceDate: new Date("2025-10-27T16:00:00.000Z"),
        billFrom: {
            businessName: "Tech Solutions Inc.",
            email: "billing@techsolutions.com",
            address: "123 Main St, Anytown, CA 90210",
            phone: "+1-555-123-4567"
        },
        billTo: {
            clientName: "Global Client Corp",
            email: "accounts@globalclient.com",
            address: "456 Oak Ave, Big City, NY 10001",
            phone: "+1-555-987-6543"
        },
        items: [
            { name: "Emergency Server Patch", quantity: 1, unitPrice: 800.00, taxPercent: 0, total: 800.00 }
        ],
        notes: "Due date will be calculated automatically based on payment terms.",
        paymentTerms: "Net 15",
        status: "unpaid",
        subtotal: 800.00,
        taxTotal: 0.00,
        total: 800.00
    },

    // ------------------------------------------
    // --- 10. Minimal Invoice (Paid) ---
    // ------------------------------------------
    {
        invoiceNumber: "INV-2025-09-010J",
        invoiceDate: new Date("2025-09-01T17:00:00.000Z"),
        dueDate: new Date("2025-09-08T17:00:00.000Z"), // Net 7
        billFrom: {
            businessName: "Tech Solutions Inc.",
            email: "billing@techsolutions.com",
            address: "123 Main St, Anytown, CA 90210",
            phone: "+1-555-123-4567"
        },
        billTo: {
            clientName: "Solo Entrepreneur, LLC",
            email: "contact@solo.com",
            address: "50 Home Office Way, Suburbia, TX 77001",
            phone: "+1-555-111-2222"
        },
        items: [
            { name: "Quick Fix Support", quantity: 1, unitPrice: 99.99, taxPercent: 5, total: 104.99 }
        ],
        notes: "Thanks for the payment!",
        paymentTerms: "Net 7",
        status: "paid",
        subtotal: 99.99,
        taxTotal: 5.00,
        total: 104.99
    }
];

module.exports = {data: sampleInvoices};