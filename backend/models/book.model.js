const mongoose = require("mongoose");
const { Schema, Mongoose } = require("mongoose");

const bookSchema = new Schema(
  {
    author: {
      type: String, //data type
      required: true, //not null
    },
    title: {
      type: String, //data type
      required: true, //not null
    },
    genre: {
      type: String, //data type
      required: true, //not null
    },
    price: {
      type: String, //data type
      required: true, //not null
    },
    publish_date: {
      type: String, //data type
      required: true, //not null
    },
    description: {
      type: String, //data type
      required: true, //not null
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
