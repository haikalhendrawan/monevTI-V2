import express from "express";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import notifRoute from "./routes/notifRoute.js";
import cookieParser from "cookie-parser";

const app = express();

// ----------------------MIDDLEWARE---------------------
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(authRoute);
app.use(userRoute);
app.use(notifRoute);

// -------------------------------Db----------------------------------------

//-------------------------------  ENDPOINT ---------------------------------

app.listen('3001', ()=>{
    console.log("app running on port 3001")
})