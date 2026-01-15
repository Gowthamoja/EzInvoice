require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const User = require('../models/user.js');
const Invoice = require('../models/invoice.js');

const MONGO_URL = process.env.MONGO_URL;

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB...");
    await seedInvoices();
}

const seedInvoices = async () => {
    try {
        await Invoice.deleteMany({});
        const users = await User.find({});

        if (users.length < 6) {
            console.log("Please run seedUsers.js first!");
            return;
        }

        const userSpecificData = {
            "arjun_designs": {
                clients: [
                    { name: "Zomato India", email: "finance@zomato.com", addr: "Golf Course Rd, Gurugram" },
                    { name: "Blue Tokai Coffee", email: "accounts@bluetokai.com", addr: "Mahalaxmi, Mumbai" },
                    { name: "Nykaa Fashion", email: "billing@nykaa.com", addr: "Lower Parel, Mumbai" },
                    { name: "Unacademy", email: "vendor@unacademy.com", addr: "Koramangala, Bangalore" },
                    { name: "Cred Tech", email: "legal@cred.club", addr: "Indiranagar, Bangalore" }
                ],
                services: [
                    { name: "UI/UX App Redesign", price: 85000, tax: 18 },
                    { name: "Brand Identity Kit", price: 45000, tax: 18 },
                    { name: "Iconography Set", price: 12000, tax: 18 },
                    { name: "Investor Pitch Deck", price: 25000, tax: 18 },
                    { name: "Website Hero Illustrations", price: 15000, tax: 18 }
                ]
            },
            "priya_dev": {
                clients: [
                    { name: "Paytm Payments", email: "tech-billing@paytm.com", addr: "Sector 98, Noida" },
                    { name: "PhonePe Ltd", email: "ops@phonepe.com", addr: "Bellandur, Bangalore" },
                    { name: "Swiggy Bundl Tech", email: "partners@swiggy.in", addr: "Embassy Tech Village, Bangalore" },
                    { name: "Razorpay Software", email: "accounts@razorpay.com", addr: "Koramangala, Bangalore" },
                    { name: "Upstox Securities", email: "infra@upstox.com", addr: "Dadar, Mumbai" }
                ],
                services: [
                    { name: "API Gateway Integration", price: 55000, tax: 18 },
                    { name: "React Dashboard", price: 120000, tax: 18 },
                    { name: "AWS Infrastructure", price: 40000, tax: 18 },
                    { name: "Bug Bounty Fixes", price: 30000, tax: 18 },
                    { name: "Database Audit", price: 75000, tax: 18 }
                ]
            },
            "sam_market": {
                clients: [
                    { name: "Mamaearth (Honasa)", email: "marketing@mamaearth.in", addr: "Gurgaon, HR" },
                    { name: "Sugar Cosmetics", email: "ads@sugarcosmetics.com", addr: "Powai, Mumbai" },
                    { name: "Boat Lifestyle", email: "billing@boat-lifestyle.com", addr: "Hauz Khas, Delhi" },
                    { name: "Lenskart Solutions", email: "growth@lenskart.in", addr: "Faridabad, HR" },
                    { name: "Myntra Designs", email: "finance@myntra.com", addr: "Hosur Road, Bangalore" }
                ],
                services: [
                    { name: "SEO Optimization", price: 25000, tax: 5 },
                    { name: "Google Ads Management", price: 15000, tax: 5 },
                    { name: "Social Media Retainer", price: 30000, tax: 5 },
                    { name: "Influencer Campaign", price: 50000, tax: 5 },
                    { name: "Email Marketing Setup", price: 12000, tax: 5 }
                ]
            },
            "neha_events": {
                clients: [
                    { name: "Taj Hotels", email: "events@tajhotels.com", addr: "Apollo Bunder, Mumbai" },
                    { name: "Marriott Intl", email: "billing@marriott.com", addr: "Aerocity, New Delhi" },
                    { name: "Oyo Vacation Homes", email: "ops@oyo.com", addr: "Spaze Palazo, Gurgaon" },
                    { name: "MakeMyTrip Ltd", email: "corp-events@mmt.com", addr: "DLF Cyber City, Gurgaon" },
                    { name: "Airbnb India", email: "hosts@airbnb.com", addr: "Vasant Vihar, Delhi" }
                ],
                services: [
                    { name: "Corporate Gala Setup", price: 200000, tax: 18 },
                    { name: "Stage Lighting & Sound", price: 45000, tax: 18 },
                    { name: "Catering Coordination", price: 75000, tax: 18 },
                    { name: "Guest Liaison Services", price: 30000, tax: 18 },
                    { name: "Post-Event Analytics", price: 15000, tax: 18 }
                ]
            },
            "vikram_transport": {
                clients: [
                    { name: "Amazon Seller Svc", email: "inbound@amazon.com", addr: "Brigade Gateway, Bangalore" },
                    { name: "Delhivery Ltd", email: "fcs@delhivery.com", addr: "Sector 44, Gurgaon" },
                    { name: "Reliance Retail", email: "billing@ril.com", addr: "Navi Mumbai, MH" },
                    { name: "Flipkart Internet", email: "supplychain@flipkart.com", addr: "ORR, Bangalore" },
                    { name: "BigBasket", email: "vendor@bigbasket.com", addr: "Domlur, Bangalore" }
                ],
                services: [
                    { name: "Heavy Haulage", price: 45000, tax: 12 },
                    { name: "Cold Storage Transport", price: 22000, tax: 12 },
                    { name: "Air Freight", price: 15000, tax: 12 },
                    { name: "Warehouse Handling", price: 8000, tax: 12 },
                    { name: "Fuel Surcharge", price: 5000, tax: 12 }
                ]
            },
            "ananya_consults": {
                clients: [
                    { name: "TATA Motors", email: "corp-strategy@tata.com", addr: "Worli, Mumbai" },
                    { name: "Infosys Ltd", email: "billing@infosys.com", addr: "Electronic City, Bangalore" },
                    { name: "HDFC Bank", email: "accounts@hdfc.com", addr: "Kanjurmarg, Mumbai" },
                    { name: "Wipro Tech", email: "vendor@wipro.com", addr: "Sarjapur, Bangalore" },
                    { name: "ICICI Bank", email: "ops@icici.com", addr: "BKC, Mumbai" }
                ],
                services: [
                    { name: "Market Research", price: 55000, tax: 18 },
                    { name: "HR Policy Audit", price: 30000, tax: 18 },
                    { name: "Strategy Workshop", price: 45000, tax: 18 },
                    { name: "Financial Projection", price: 25000, tax: 18 },
                    { name: "Risk Assessment", price: 40000, tax: 18 }
                ]
            }
        };

        const allInvoices = [];

        users.forEach((user) => {
            const data = userSpecificData[user.username];
            if (!data) return;

            data.clients.forEach((client, i) => {
                const service = data.services[i];
                const subtotal = service.price;
                const taxTotal = subtotal * (service.tax / 100);
                const total = subtotal + taxTotal;

                // Fixing the 10-digit Indian Phone Number regex issue
                const validPhone = (Math.floor(Math.random() * 4) + 6).toString() + 
                                  Math.floor(100000000 + Math.random() * 900000000).toString().substring(0, 9);

                allInvoices.push({
                    user: user._id,
                    invoiceNumber: `INV-26-${user.username.split('_')[0].toUpperCase()}-${300 + i}`,
                    invoiceDate: new Date(2026, 0, 5 + i),
                    dueDate: new Date(2026, 0, 20 + i),
                    billFrom: {
                        businessName: user.businessDetails.businessName,
                        email: user.email,
                        address: user.businessDetails.address,
                        phone: user.businessDetails.phone
                    },
                    billTo: {
                        clientName: client.name,
                        email: client.email,
                        address: client.addr,
                        phone: validPhone
                    },
                    items: [{
                        name: service.name,
                        quantity: 1,
                        unitPrice: service.price,
                        taxPercent: service.tax,
                        total: total
                    }],
                    subtotal: subtotal,
                    taxTotal: taxTotal,
                    total: total,
                    status: i % 2 === 0 ? 'paid' : 'unpaid',
                    notes: `Thank you for choosing ${user.businessDetails.businessName}.`
                });
            });
        });

        await Invoice.insertMany(allInvoices);
        console.log(`Seeded ${allInvoices.length} industry-tailored professional invoices!`);

    } catch (err) {
        console.log("Error:", err);
    } finally {
        mongoose.connection.close();
    }
};

main();