import axios from 'axios'
import User from '../models/userSchema.js'
import Payment from '../models/paymentSchema.js';

const initializePayment = async (req, res) => {
    try {

        // Destructure the required Fields 
        const { email, amount } = req.body;
        const requiredFields = ["email", "amount"];

        // Verify the Fields 
        const missingFields = requiredFields.filter(f => !req.body[f]);
        if (missingFields.length > 0) {
            return res.status(404).json({ message: `Missing Required Fields ${missingFields}` })
        }

        // get the user from the Data Base withe the id Passed from Middle Ware 
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const latestPayment = await Payment.findOne({
            user:user._id,
            status:"successful"
        }).sort({createdAt:-1})

        if(latestPayment){
            const now = new Date();
            const timeSinceLastPayment = now - new Date(latestPayment.createdAt);
            const hours = timeSinceLastPayment / (1000 * 60 * 60);

            if (hours < 24){
                return res.status(403).json({
                    message: "You have already made a payment. You can only make another after 24 hours."
                });
            }
        }

        
        // Set the Amount to Kobo 
        const amountInKobo = amount * 100;

        // Send a Request to Paystack
        //1.) send the details 
        //2.) Send the Hesders 
        // console.log("Using Paystack key:", process.env.PAYSTACK_API_KEY);

      
            const response = await axios.post(
                'https://api.paystack.co/transaction/initialize',
                {
                    email: email,
                    amount: amountInKobo,
                    callback_url: "http://localhost:3000/payment-success",
                    metadata: {
                        userId: user._id.toString()
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`, 
                        'Content-Type': 'application/json'
                    }
                }
            );
    
     
      

        //Set The expiryDate for the Payment
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 24);

        const payment = await Payment.create({
            user: user._id,
            paymentReference: response.data.data.reference, 
            amount,
            expiryDate
        })

        // console.log(payment)

        // Send the Auth Url
        res.status(200).json({
            authorizationUrl: response.data.data.authorization_url
        });
    } catch (error) {

        res.status(500).json({ message: error});
    }
}

const verifyPayment = async (req,res) => {
    try {
        // Get the refereence from the Params
        const {reference} = req.params;

        // Send a request to pasytack to verify Payment 

        const response = await axios.get( 
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers:{
                    Authorization:`Bearer ${process.env.PAYSTACK_API_KEY}`
                }
            }
        );

        if(response.data.data.status === "success"){
            await Payment.findOneAndUpdate({
                paymentReference:reference,

            },{
                status:"successful"
            });
            return res.json({ success: true, message: 'Payment verified successfully' });
        }
        res.json({ success: false, message: 'Payment not successful' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

export {initializePayment, verifyPayment}
