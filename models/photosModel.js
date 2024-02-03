import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
});

export default mongoose.model("photos", photoSchema);
