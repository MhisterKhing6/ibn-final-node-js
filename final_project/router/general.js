const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  let user = req.body
  users.push(user)
  return res.status(201).json(user)
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json(books)
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {

    return res.status(200).json(books[req.params.isbn])
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let book  = Object.values(books).filter((book) => {
    return book.author === req.params['author']
 })
  return res.status(200).json(book);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let book  = books.filter((book) => {
    return book.title === req.params['title']
 })
  return res.status(200).json(book);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let review  = books.filter((book) => {
    return book.isbn === req.params['isbn']
 }).map((book) => {
  return book.reviews
 })
  return res.status(300).json(review)
});

module.exports.general = public_users;
