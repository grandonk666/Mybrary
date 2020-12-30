const express = require("express");
const router = express.Router();
const Author = require("../models/author");

// All Authors route
router.get("/", async (req, res) => {
  let searchOption = {};
  if (req.query.name !== null && req.query.name !== "") {
    searchOption.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find(searchOption);
    res.render("authors/index", {
      authors: authors,
      searchOption: req.query,
    });
  } catch (err) {
    res.redirect("/");
  }
});

// New Author route
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

// Create Author route
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    // res.redirect(`authors/${newAuthor.id}`)
    res.redirect(`authors`);
  } catch (err) {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating author",
    });
  }
  // author.save((err, newAuthor) => {
  //   if (err) {
  //     const locals = {
  //       author: author,
  //       errorMessage: "Error creating author",
  //     }
  //     res.render("authors/new", locals );
  //   } else {
  //     // res.redirect(`authors/${newAuthor.id}`)
  //     res.redirect(`authors`);
  //   }
  // });
});

module.exports = router;
