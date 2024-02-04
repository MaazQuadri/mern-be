import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name, slug } = req.body;
    if (!name) {
      return res.status(401).send({
        success: false,
        message: `Name is Required`,
      });
    }
    const newCategory = await new categoryModel({
      name,
      slug: name.split(" ").join("-"),
    }).save();
    res.status(201).send({
      success: true,
      message: `New Category Created`,
      category: newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: `Error Creating Category`,
    });
  }
};

export const getProductCategory = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (!categories) {
      return res.status(401).send({
        success: false,
        message: `Error Fetching Categories`,
      });
    }
    res.status(200).send({
      success: true,
      message: `All Categories Fetched`,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: `Error Fetching Categories`,
    });
  }
};
