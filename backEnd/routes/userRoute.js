import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {addUser, getUser, editUserProfile, editPICProfile, editPassword} from "../controller/user.js"


const router = express.Router();

router.post("/addUser", authenticate, addUser);

router.post("/editUserProfile", authenticate, editUserProfile);
router.post("/editPICProfile", authenticate, editPICProfile);
router.post("/editPassword", authenticate, editPassword);
router.get("/getUser", authenticate, getUser);


export default router;