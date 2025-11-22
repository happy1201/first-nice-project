import {createRazorpayInstance} from '../../../config/razorpay.config.js';
import crypto from 'crypto';  

export const hello = (req, res) => {
  res.send("Hello from Skillspark Hub backend controller!");
};

export const firstIntegerValue = (req, res) => {
    console.log("First integer value endpoint hit");
    res.send(42);
};

// write an API to created order for payment processing
export const createOrder = async(req, res) => {
    const {course_id, amount} = req.body;
      
    const options = {
        amount: amount * 100, // amount in the smallest currency unit
        currency: "INR",
        receipt: `receipt_order_${course_id}`,
    };


    try {
      console.log("Creating order with options:", options);
      createRazorpayInstance.orders.create(options, (err, order) => {
          if(err) {
              console.error("Error creating order:", err);
              return res.status(500).json({error: err});
          }
          console.log("Order created:", order);
          res.status(200).json(order);
      });
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({error: "Something went wrong while creating order"});
    }

}


export const verifyPayment = (req, res) => {
    // to be implemented
    const {order_id, payment_id, signature} = req.body;
    
    // Verification logic will go here
    const key_secret = process.env.razor_pay_key_secret;
    
    // HMAC SHA256 signature verification
    const hmac = crypto.createHmac('sha256', key_secret);
    hmac.update(order_id + "|" + payment_id);
    const generated_signature = hmac.digest('hex');

    if (generated_signature === signature) {
        res.status(200).json({ success: true });
    } else {
        res.status(400).json({ success: false });
    }
}

