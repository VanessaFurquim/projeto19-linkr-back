import express from "express";
import cors from "cors";
import router from "./Routes/indexRouter.js";


const app = express();
app.use(cors());
app.use(express.json());
app.use(router);



const PORT = process.env.PORT || 4000
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});