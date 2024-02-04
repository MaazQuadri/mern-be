import mongoose from "mongoose";

const productsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "productCategory",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("products", productsSchema);
