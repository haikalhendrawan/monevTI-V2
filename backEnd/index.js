import express from "express";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import notifRoute from "./routes/notifRoute.js";
import iAssetRoute from "./routes/iAssetRoute.js";
import cookieParser from "cookie-parser";


const app = express();

// ----------------------MIDDLEWARE---------------------
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(authRoute);
app.use(userRoute);
app.use(notifRoute);
app.use(iAssetRoute);

// -------------------------------Db----------------------------------------

//-------------------------------  ENDPOINT ---------------------------------
app.get('/', (req, res) => {
    res.json({msg:"ok"})
})
app.listen('8080', ()=>{
    console.log("app running on port 8080")
})