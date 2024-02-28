import productsModel from "../models/productsModel.js";
import fs from "fs";

export const createProductController = async (req, res) => {
  try {
    const { title, price, description, category } = req.fields;
    const { image } = req.files;
    console.log(req.files);
    if (!title) {
      return res
        .status(401)
        .send({ success: false, message: `Title is Required` });
    }
    if (!price) {
      return res
        .status(401)
        .send({ success: false, message: `Price is Required` });
    }
    if (!description) {
      return res
        .status(401)
        .send({ success: false, message: `Description is Required` });
    }
    if (!category) {
      return res
        .status(401)
        .send({ success: false, message: `Title is Required` });
    }
    // if (!photo) {
    //   return res
    //     .status(401)
    //     .send({ success: false, message: `Title is Required` });
    // }

    const newProduct = new productsModel({
      title,
      price,
      description,
      category,
    });
    newProduct.image.data = fs.readFileSync(image.path);
    newProduct.image.contentType = image.type;
    await newProduct.save();
    res.status(201).send({
      success: true,
      message: `New Product Created`,
      product: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: `Error Creating Product`,
    });
  }
};

export const getAllProductsController = async (req, res) => {
  try {
    const products = await productsModel
      .find({})
      .populate("category")
      .select("-image");
    res.status(200).send({
      success: true,
      message: "Products Fetched",
      products,
    });
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "Error Fetching Products",
      error,
    });
  }
};
  
export const getProductPhotoController = async (req, res) => {
  try {
    const product = await productsModel.findById(req.params.pid);
    res.set("Content-Type", product.image.contentType);
    res.send(product.image.data);
  } catch (error) {
    res.status(404).send({
      success: false,
      message: `Error Fetching Product Image`,
      error,
    });
  }
};

      export const getSingleProductController= async (req,res)=>{
        try{
          const{pid}=req.params
      
          if (!pid) {
            return res.status(400).send({
              success: false,
              message: 'ProductId is required.',
            });
          }
      
          const product = await productsModel.findById(pid).select("-image")
      
          if (!product) {
            return res.status(404).send({
              success: false,
              message: 'Product not found.',
            });
          }
      
          res.status(200).send({
            success:true,
            message:`product fetched Successfully`,
            product,
          })
        }catch(error){
          res.status(401).send({
            success:false,
            message:`Error Fetching product`,
            error,
          })
        }
      }