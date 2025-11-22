import razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

export const createRazorpayInstance = new razorpay({
    key_id: process.env.razor_pay_key_id,
    key_secret: process.env.razor_pay_key_secret,
});