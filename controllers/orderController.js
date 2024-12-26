const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const orderModel = require('../models/orderModel');
const userModel = require("../models/userModel");



exports.placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  const { items, amount, address } = req.body;
  const userId = req.payload;

  

  try {
    // Create a new order
    const newOrder = new orderModel({
      
      userId,
      items,
      amount,
      address,
    });

    await newOrder.save();

    // Clear the user's cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    const line_items = items.map((item) => ({
      price_data: {
        currency: "USD",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 , 
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "USD",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 200,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    res.json({ success: false, message: "error", error: error.message });
  }
};


exports.verifyOrder=async(req,res)=>{

  const {orderId,success} = req.body 

  try{if(success=="true"){
    await orderModel.findByIdAndUpdate(orderId,{payment:true});
    res.json({success:true,message:"paid"})
  }
  else{
    await orderModel.findByIdAndDelete(orderId)
    res.json({success:false,message:"Not Paid"})
  }}

  catch(error){
    res.json({success:false,message:"Error"})
  }


}

// user orders 

exports.userOrders=async(req,res)=>{

  const userId = req.payload

 try{ const order = await orderModel.find({userId})

  res.status(200).json({success:true,data:order})}

  catch(error){
    res.status(404).json({message:"userOrders api failed"})
  }

}

// listing order for admin pannel 


exports.listOrder=async(req,res)=>{

  try{const orders = await orderModel.find({})

  res.json({success:true,data:orders})}

  catch(error){
    res.status(404).json({success:false,message:"list oder api failed"})
  }

}


// updating order status 

exports.updateStatus=async(req,res)=>{

  const {orderId} = req.body 

  const {status} = req.body 

 try{ const updated = await orderModel.findByIdAndUpdate(orderId,{status})

  res.status(200).json({message:"Status Updated",success:true})}

  catch(error){
    res.status(404).json({message:"status update api failed",success:false})
  }

}
