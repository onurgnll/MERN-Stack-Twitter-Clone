const express = require("express");
const app = express();
const cors = require("cors");


const dotenv = require("dotenv");
const connectDB = require("./helpers/MongoDB/ConnectDB");
const defaultRouter = require("./routers/defaultRouter");

dotenv.config();


app.listen(process.env.PORT, (arg) => {
        connectDB.then(() => {
                console.log("Server started Successfully");
        }).catch((err) => {
                console.log(err);
        })


})

app.use(express.json());
app.use(cors());

app.use("/api" , defaultRouter)