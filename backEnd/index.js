import express from "express";
import cors from "cors";
import path from "path"; 
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import "dotenv/config";

import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import notifRoute from "./routes/notifRoute.js";
import iAssetRoute from "./routes/iAssetRoute.js";
import iUserRoute from "./routes/iUserRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import worksheetRoute from "./routes/worksheetRoute.js";
import logbookRoute from "./routes/logbookRoute.js";
import worksheetRefRoute from "./routes/adminRoute/worksheetRefRoute.js";

// -----------------------setting static file -------------------------------------

const __filename = fileURLToPath(import.meta.url); //  dapetin url file index.js which is C:/monevTI-v2/backEnd/index.js
const __dirname = path.dirname(__filename); //  dapetin dirname which is C:/monevTI-v2/backEnd/
const app = express();

// ----------------------MIDDLEWARE------------------------------------------
app.use(cors({
    origin: "*"
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(authRoute);
app.use(userRoute);
app.use(notifRoute);
app.use(iAssetRoute);
app.use(iUserRoute);
app.use(uploadRoute);
app.use(worksheetRoute);
app.use(logbookRoute);
app.use(worksheetRefRoute)

// -------------------------------Db----------------------------------------

//-------------------------------  ENDPOINT ---------------------------------
app.get('/', (req, res) => {
    res.json({msg:"ok"})
});
app.listen(process.env.DEV_PORT, ()=>{
    console.log(`app running on port ${process.env.DEV_PORT}`)
});