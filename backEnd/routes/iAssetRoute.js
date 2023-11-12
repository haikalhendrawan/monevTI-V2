import express from "express";
import {getIAsset} from "../controller/iasset.js";
import authenticate from "../middlewares/authenticate.js";

const Router = express.Router();


Router.get(("/getIAsset"), authenticate, getIAsset);

export default Router;
