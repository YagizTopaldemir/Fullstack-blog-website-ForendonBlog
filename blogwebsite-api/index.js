import express from "express"
import authRouter from "./routes/authR.js"
import postRouter from "./routes/postR.js"
import cors from "cors"
import cookieparser from "cookie-parser"
import multer from "multer";

const app = express()

app.use(express.json())
app.use(cookieparser())
app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true,
}));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../blogwebsite-client/public/uploads");
    },
    filename: function (req, file, cb) {
      
      cb(null,file.originalname);
    },
  });
  
  
  const upload = multer({ storage });

app.post("/api/upload", upload.single('file'), function (req,res) {
})

app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)


app.listen(1562,() => {
    console.log("1562 connected")
})