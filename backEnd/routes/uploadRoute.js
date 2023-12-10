import express from "express";
import authenticate from "../middlewares/authenticate.js";
import multer from "multer";
import {addProfilePicture} from "../controller/upload.js";

const router = express.Router();
const upload = multer();

router.post("/addProfilePicture/:filename", authenticate, addProfilePicture);

export default router;