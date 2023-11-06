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

  connection.query(`CREATE DATABASE IF NOT EXISTS bookcomments`, function (error,result) {
 if (error) console.log(error);
});

connection.query(`USE bookcomments`, function (error, results) {
 if (error) console.log(error);
});

connection.query(`CREATE TABLE IF NOT EXISTS comments
( id int unsigned NOT NULL auto_increment, book varchar(100) NOT NULL,
data varchar(500) NOT NULL,
time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (id)
)`, function (error,result) {
    if (error) console.log(error);

 });

 res.send("ok");

  });

 app.post('/addComment', (req,res) => {

  console.log("add Comment");
  var book = req.body.book;
  var data = req.body.comment;




  connection.query(`USE bookcomments`, function (error, results) {
    if (error) console.log(error);
   });



  var query = `INSERT INTO comments (book, data) VALUES ('${book}', '${data}')`;
console.log(query);

   connection.query(query, function (error,result) { if(error) {console.log(error);}; });
   res.send({status: 'post saved'}); 
  });


 app.get('/getComments', (req,res) => { 

  connection.query(`SELECT * FROM comments`, function (error, results) {
  if (error) console.log(error);
  res.send(results); });
 });


 

// serve static files

 app.use('/', express.static('public'));

 
   
app.listen(PORT, HOST);

console.log('up and running');