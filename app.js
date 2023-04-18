//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Hello There! This Blog website is a part of my practice and its my first web application to deployed. I guess this site looks better as time passes.You can redirect to about, contact and compose. You can write a new Blog by visiting compose page. The Blogs that you wrote can be viewed in the Home page. Have a goodday!";
const aboutContent = "Hi there! this is Hemanth Kumar. I am interested in programming and I have recently started learning Web Development. I am working on a web dev course right know, as a part of it I have learnt HTML,CSS,JavaScript. The good part here is that we programmers have frameworks like BootStrap,Node.js,Express.js,jQuery and tools like EJS template engine,git,API's to make our job easy.";
const contactContent = "I will edit it Later";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));

// Data
let posts = [];

app.get("/",(req,res) => {
  
  res.render("home",{ posts:posts,homeText: homeStartingContent, aboutText: aboutContent, contactText: contactContent});

});
app.get("/about",(req,res) => {
  
  res.render("about",{ posts:posts,homeText: homeStartingContent, aboutText: aboutContent, contactText: contactContent});

});
app.get("/contact",(req,res) => {
  
  res.render("contact",{ posts:posts,homeText: homeStartingContent, aboutText: aboutContent, contactText: contactContent});

});
app.get("/compose",(req,res) => {
  
  res.render("compose",{ posts:posts,homeText: homeStartingContent, aboutText: aboutContent, contactText: contactContent});

});
app.get("/:movie",(req,res) => {
  const reqString  = _.lowerCase(req.params.movie);
  posts.forEach((post) => {
    if(_.lowerCase(post['title']) === reqString){
      res.render("post",{ title: post['title'], body: post['body']});
    }
    else{
      console.log(_.lowerCase(post['title']),reqString);
    }
  })
  res.redirect("/");
});

app.post("/compose",(req,res) => {
  const post = {
    title: req.body.postTitle,
    body: req.body.postBody
  }
  posts.push(post);
  // console.log(posts);
  res.redirect("/");
});



app.listen("5500", function() {
  console.log("Server started on port 5500");
});
