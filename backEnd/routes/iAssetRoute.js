import express from "express";
import {getIAsset, addIAsset, editIAsset, deleteIAsset} from "../controller/iasset.js";
import authenticate from "../middlewares/authenticate.js";

const Router = express.Router();


Router.get(("/getIAsset"), authenticate, getIAsset);
Router.post(("/addIAsset"), authenticate, addIAsset);
Router.post(("/editIAsset"), authenticate, editIAsset);
Router.delete(("/deleteIAsset/:rowId/kppn/:kppn"), authenticate, deleteIAsset);

export default Router;
