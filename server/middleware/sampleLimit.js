import Payment from "../models/paymentSchema.js";

import RegisterSample from "../models/registerSampleSchema.js";

export const checkimit = async (req, res, next) => {
    try {
        // Get logged-in user from request
        // Current time
        // Start of today
        const user = req.user;
        const now = new Date();
        const startOfDay = new Date(now.setHours(0, 0, 0, 0));


        // Check For Actve Payment //
        const activePayment = await Payment.findOne({
            user: user.userId,
            status: "successful",
            expiryDate: { $gt: now }
        });

        if (activePayment) {
            return next();
        };


        // Count todays Free Sample 
        const todaysSamplesCount = await RegisterSample.countDocuments({
            user: user.userId,
            createdAt: { $gte: startOfDay }, // Created today
            paid: false // Only free samples
        });
        console.log("Sample Count:", todaysSamplesCount)

        // If limit reached (50 samples)
        if (todaysSamplesCount >= 2) {

            console.log("Daily free sample limit reached. Please make a payment to continue.")
            return res.status(403).json({
                message: 'Daily free sample limit reached. Please make a payment to continue.',
                requiresPayment: true // Flag for frontend to show payment button
            });
        }

        next();

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }

}