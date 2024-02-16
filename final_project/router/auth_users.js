const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
let user = users.filter((use) => {
  return use.username === username
})

return user.length > 0


}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let user = users.filter((use) => {
  return use.username === username
})
  return (user.username === username) && (user.password === password)
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  let {username, password} = req.body
  if (isValid(username)) {
    if( authenticatedUser(username, password)) {
      let token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: username,
      }, 'access');
      req.session.authorization = {token}
      return res.status(200).json({"status": "user sucessfully login"})
    } else {
      return res.status(401).json({"error": "user not found"})
    }
  } 
  else {
    return res.status(401).json({"error": "user not registered"})
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
