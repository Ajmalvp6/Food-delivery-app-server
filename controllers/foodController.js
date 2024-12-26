const foodModel = require("../models/foodModel");

const fs = require("fs");

// add food

exports.addFood = async (req, res) => {
  const { name, description, price, category } = req.body;

  try {
  let image = `${req.file.filename}`;

  
    const food = new foodModel({
      name,
      description,
      price,
      category,
      image: image,
    });

    await food.save();

    res
      .status(201)
      .json({ message: "new food added successfully", success: true });
  } catch (error) {
    res.status(404).json({ message: "addFood api failed", success: false });
  }
};

// all food list

exports.listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});

    res.json({ success: true, data: foods });
  } catch {
    res.status(404).json({ message: "list foodapi faild", success: false });
  }
};



// remove food

exports.removeFood = async (req, res) => {

  const  id  = req.body.id;

  if(!id){
    return res.json({message: "Food ID is required"})
  }
  

  try{const food = await foodModel.findById(id);

  if (!food) {
    return res.status(404).json({ message: "food not found" });
  } else {
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(id);

    res.status(200).
      json({ message: "food removed successfully", success: true });
  }}

  catch{
    res.status(404).json({message:"removefood api faild"})
  }
};
