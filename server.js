'use strict';

// load package
const express = require('express');
const bodyParser = require("body-parser");
const mysql = require('mysql')

const PORT = 3000;
const HOST = '0.0.0.0';
const app = express();
 
app.use(bodyParser.urlencoded({ extended: true }));

// create connection to mysql

var connection = mysql.createConnection({
  host     : 'mysql1',
  user     : 'root',
  password : 'admin'
 });
 
 connection.connect();

 app.get('/init', (req, res) => {

  console.log("init");

  connection.query(`CREATE DATABASE IF NOT EXISTS testpostdb`, function (error,result) {
 if (error) console.log(error);
});

connection.query(`USE testpostdb`, function (error, results) {
 if (error) console.log(error);
});

connection.query(`CREATE TABLE IF NOT EXISTS posts
( id int unsigned NOT NULL auto_increment, topic varchar(100) NOT NULL,
data varchar(500) NOT NULL,
time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (id)
)`, function (error,result) {
    if (error) console.log(error);

 });

 res.send("ok");

  });

 app.post('/addPost', (req,res) => {

  console.log("add your post");

  var topic = req.body.topic;
  var data = req.body.data;


  connection.query(`USE testpostdb`, function (error, results) {
    if (error) console.log(error);
   });



  var query = `INSERT INTO posts (topic, data) VALUES ('${topic}', '${data}')`;
console.log(query);

   connection.query(query, function (error,result) { if(error) {console.log(error);}; });
   res.send({status: 'post saved'}); 
  });


 app.get('/getPosts', (req,res) => { 

    console.log("get your posts");
    connection.query(`USE testpostdb`, function (error, results) {
        if (error) console.log(error);
         });

    connection.query(`SELECT * FROM posts`, function (error, results) {
    if (error) console.log(error);
    res.send(results); });
 });


 

// serve static files

 app.use('/', express.static('public'));

 
   
app.listen(PORT, HOST);

console.log('up and running');