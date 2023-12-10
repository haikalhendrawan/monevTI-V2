import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {login, refresh, logout, updateToken} from "../controller/auth.js";


const router = express.Router();

router.post("/login", login);
router.get("/refresh", refresh);
router.delete("/logout", logout);
router.post("/updateToken", updateToken);




export default router;