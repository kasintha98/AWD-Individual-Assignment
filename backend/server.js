//Connect the server to the PORT and connect the mongoDB atlas database to the application

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const xmlparser = require("express-xml-bodyparser");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());
app.use(xmlparser());

//connecting mongodb atlas database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connected!");
});

//adding routes to the server
const bookRouter = require("./routes/books"); //adding router files

app.use("/books", bookRouter);

// listen to the port to start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
