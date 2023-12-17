import express from "express";
import authenticate from "../middlewares/authenticate.js";
import multer from "multer";
import {addProfilePicture, addDataDukung, deleteDataDukung} from "../controller/upload.js";

const router = express.Router();
const upload = multer();

router.post("/addProfilePicture/:filename", authenticate, addProfilePicture);
router.post("/addDataDukung/:chId/:junctionId/:wsSection/:fileNum/:username/:date", authenticate, addDataDukung);
router.post("/deleteDataDukung", authenticate, deleteDataDukung);

export default router;