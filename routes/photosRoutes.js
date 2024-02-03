import express from "express";
import formidable from "express-formidable";
import {
  uploadPhotoController,
  getPhotoController,
} from "../controllers/photosController.js";

const router = express.Router();

router.post("/", formidable(), uploadPhotoController);

router.get("/:id", getPhotoController);

// formidable? injecting form values inside request object for the next middleware

// values ==> req.fields
// files ==> req.files

export default router;
