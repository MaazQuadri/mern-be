import photosModel from "../models/photosModel.js";
import fs from "fs";
export const uploadPhotoController = async (req, res) => {
  try {
    const { name } = req.fields;
    const { photo } = req.files;
    if (!name) {
      return res.status(401).send({
        success: false,
        message: `Image Title is Required`,
      });
    }
    if (!photo) {
      return res.status(401).send({
        success: false,
        message: `Photo is Required`,
      });
    }
    const newPhoto = new photosModel({ name });
    newPhoto.photo.data = fs.readFileSync(photo.path);
    newPhoto.photo.contentType = photo.type;
    await newPhoto.save();
    res.status(201).send({
      success: true,
      message: `Photo Upload Successful`,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: `Error uploading image`,
    });
  }
};

export const getPhotoController = async (req, res) => {
  try {
    // api/v1/photo/65b777f088a3485d9a26ccfa
    // api/v1/photo/abcd

    const selectedPhoto = await photosModel.findById(req.params.id);
    res.set("Content-Type", selectedPhoto.photo.contentType);
    res.status(200).send(selectedPhoto.photo.data);
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: `Error Fetching Photo`,
    });
  }
};
// Formidable --> req.fields --> name
//            --> req.files --> photo

// const newPhoto = await new photosModel({name})
// newPhoto.photo.data = fs.readFileSync(photo.path);
// newPhoto.photo.contentType = photo.type;
