import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {addUser, getUser} from "../controller/user.js"


const router = express.Router();

router.post("/addUser", authenticate, addUser);
router.get("/getUser", authenticate, getUser);


export default router;