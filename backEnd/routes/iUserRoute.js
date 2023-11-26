import express from "express";
import {getIUser, addIUser, editIUser, deleteIUser} from "../controller/iuser.js";
import authenticate from "../middlewares/authenticate.js";

const Router = express.Router();

Router.get(("/getIUser"), authenticate, getIUser);
Router.post(("/addIUser"), authenticate, addIUser);
Router.post(("/editIUser"), authenticate, editIUser);
Router.delete(("/deleteIUser/:rowId"), authenticate, deleteIUser);

export default Router;
