import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors";
import dotenv from "dotenv"
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import Path from "path";
import { fileURLToPath } from "url";


/* configuration*/

const __filename=fileURLToPath(import.meta.url)
const __dirname=Path.dirname(__filename)
dotenv.config()
const app=express()
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginEmbedderPolicy())
app.use(morgan("common"))
app.use(bodyParser.json({limit:"30mb", extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb', extended:true}))
app.use(cors())
app.use("/assests",express.static(Path.join(__dirname,"public/assets")));

/*file storage*/

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/assests");
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
})
const upload=multer({storage});

/*MONGOOSE SETUP*/

const PORT =process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    app.listen(PORT,()=>console.log(`server port :${PORT}`));
}).catch(error=>{
    console.log(error)
})