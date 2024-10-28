const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose  = require("mongoose");
dotenv.config();
const cors = require("cors")
app.use(cors());
app.use(express.json());

//model imported here
const userRouter = require("./Routes/userRoute");



//Connect to mongodb database(locally)
mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected Successfully");
    app.listen(process.env.PORT , (err) => {
      if (err) console.log(err);
      console.log(`running at port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log("Failed to connect", error));


app.use(userRouter);