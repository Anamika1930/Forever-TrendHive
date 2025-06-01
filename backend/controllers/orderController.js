import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import Razorpay from "razorpay";

// Global Variables
const currency = "inr";
const deliveryCharge = 10;

// Gateway Initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "default_stripe_key");
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "default_razorpay_key_id",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "default_razorpay_key_secret",
});

// Placing Orders Using COD Method
const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId; // From  auth middleware 

    if (!userId || !items || !amount || !address) {
      return res.status(400).json({ success: false, message: "Invalid input data." });
    }

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: true,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.status(201).json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    console.error("COD Order Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Placing Orders Using Stripe Method
const placeOrderStripe = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const { origin } = req.headers;
    const userId = req.userId; // From middleware

    if (!userId || !items || !amount || !address || !origin) {
      return res.status(400).json({ success: false, message: "Invalid input data." });
    }

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency,
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency,
        product_data: { name: "Delivery Charges" },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.status(201).json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Stripe Order Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Verify Stripe Payment
const verifyStripe = async (req, res) => {
  try {
    const { orderId, success} = req.body;
    const userId = req.userId; // From middleware
    if (!orderId || !userId || !success) {
      return res.status(400).json({ success: false, message: "Invalid input data." });
    }

    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Stripe Verification Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Placing Orders Using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
  try {
    const { items, amount, address } = req.body;

    if (!items || !amount || !address) {
      return res.status(400).json({ success: false, message: "Invalid input data." });
    }

    const userId = req.userId; // Ensure this is coming from middleware

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.error("Razorpay Order Creation Error:", error);
        return res.status(500).json({ success: false, message: error.message });
      }
      res.status(201).json({ success: true, order });
    });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Verify Razorpay Payment
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const userId = req.userId;

    if (!userId || !razorpay_order_id) {
      return res.status(400).json({ success: false, message: "Invalid input data." });
    }

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true, message: "Payment Successful" });
    } else {
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.error("Razorpay Verification Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// All Orders Data For Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Fetching Orders Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// User Order Data For Frontend
const userOrders = async (req, res) => {
  try {
    const userId = req.userId; // Assuming authUser middleware attaches `req.user`
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Fetching User Orders Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Order Status from Admin Panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    if (!orderId || !status) {
      return res.status(400).json({ success: false, message: "Invalid input data." });
    }

    // Prepare update object
    const updateData = { status };

    // If order is delivered, also update payment status to true
    if (status === "Delivered") {
      updateData.payment = true;
    }

    await orderModel.findByIdAndUpdate(orderId, updateData);
    res.json({ success: true, message: "Status Updated Successfully" });
  } catch (error) {
    console.error("Updating Order Status Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  verifyRazorpay,
  verifyStripe,
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
