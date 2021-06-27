// to call apis from the backend and do CRUD operations
const router = require("express").Router();
var fs = require("fs"),
  parseString = require("xml2js").parseString,
  xml2js = require("xml2js");

let Book = require("../models/book.model");

router.get("/", (req, res) => {
  Book.find()
    .then((books) => res.json(books))
    .catch((err) => res.status(400).json("error" + err));

  //code for xml
  fs.readFile("book.xml", "utf-8", function (err, data) {
    if (err) console.log(err);

    // we then pass the data to our method here
    parseString(data, function (err, result) {
      if (err) console.log(err);
    });
  });
});

router.post("/add", (req, res) => {
  const newBook = new Book({
    author: req.body.author,
    title: req.body.title,
    genre: req.body.genre,
    price: req.body.price,
    publish_date: req.body.publish_date,
    description: req.body.description,
  });

  newBook
    .save()
    .then(() => {
      res.json("Book added");
    })
    .catch((err) => res.status(400).json("Error: " + err));

  //code for adding xml element
  fs.readFile("book.xml", "utf-8", function (err, data) {
    if (err) console.log(err);

    // we then pass the data to our method here
    parseString(data, function (err, result) {
      if (err) console.log(err);

      var json = result;

      //creating new book element
      xmlBookEl = {
        $: { id: Math.random() },
        author: req.body.author,
        title: req.body.title,
        genre: req.body.genre,
        price: req.body.price,
        publish_date: req.body.publish_date,
        description: req.body.description,
      };

      //adding the new book element to xml
      json.catalog.book.push(xmlBookEl);

      // create a new builder object and then convert
      // our json back to xml.
      var builder = new xml2js.Builder();
      var xml = builder.buildObject(json);

      fs.writeFile("book.xml", xml, function (err, data) {
        if (err) console.log(err);
      });
    });
  });
});

module.exports = router;
