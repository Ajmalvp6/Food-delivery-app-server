const userModel = require("../models/userModel");

// add to cart

exports.addToCart = async (req, res) => {
  const { itemId } = req.body;

  const userId = req.payload;

  try {
    const userData = await userModel.findById({ _id: userId });

    const cartData = await userData.cartData;

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

      await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ message: "added to cart", success: true});
  } catch (error) {
    res.status(404).json({ message: "add to cart api failed",success:false });
  }
};

// remove form cart

exports.removeFromCart = async (req, res) => {
  const userId = req.payload;

  const {itemId} = req.body;

 try{ const userData = await userModel.findOne({ _id: userId });

  const cartData = await userData.cartData;

  if (cartData[itemId] > 0) {
    cartData[itemId] -= 1;
  }

  await userModel.findByIdAndUpdate(userId, { cartData });

  res.status(200).json({ message: "removed from cart" });}
  catch(error){
    res.status(404).json({message:"remove from cart api failed",success:false})
  }
};

// fetch user cart data

exports.getCart = async (req, res) => {
  const userId = req.payload;

 

  const userData = await userModel.findOne({ _id: userId });

  const cartData = userData.cartData

  

  res.status(200).json({ message: "success",cartData,success:true });

  
};

