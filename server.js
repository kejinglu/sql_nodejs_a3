'use strict';

// load package
const express = require('express');
const bodyParser = require("body-parser");
const mysql = require('mysql')

const PORT = 3000;
const HOST = '0.0.0.0';
const app = express();
app.use( bodyParser.json());
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

  connection.query(`CREATE DATABASE IF NOT EXISTS postdb`, function (error,result) {
 if (error) console.log(error);
});

connection.query(`USE postdb`, function (error, results) {
 if (error) console.log(error);
});

connection.query(`CREATE TABLE IF NOT EXISTS posts
( id int unsigned NOT NULL auto_increment, topic varchar(100) NOT NULL,
data varchar(500) NOT NULL,
time VARCHAR(255),
PRIMARY KEY (id)
)`, function (error,result) {
    if (error) console.log(error);
    res.send("create table ok");
 });
  });

 app.post('/addPost', (req,res) => {
  var book = req.body.book;
  var comment = req.body.comment;
  var dateObj = new Date();
    var dateString = dateObj.getMonth() + "-" + dateObj.getDate() + "-" + dateObj.getFullYear();
    var timeString = dateObj.getHours() + ":" + dateObj.getMinutes() + ":" + dateObj.getSeconds();
    var timestamp = dateString + " " + timeString;

  var query = `INSERT INTO posts (topic, data, time) VALUES ('${book}', '${comment}', '${timestamp}')`;
   connection.query(query, function (error,result) { 
    if(error) console.log(error); 
    res.send('post saved'); 
    console.log("...Posts Added");
  });
  
});

 app.get('/getPosts', (req,res) => { 
    connection.query(`USE postdb`, function (error, results) {
        if (error) console.log(error);
         });

    connection.query(`SELECT * FROM posts`, function (error, results) {
    if (error) console.log(error);
    res.send(results); });
    console.log("...Posts Loaded");
 });

// serve static files
 app.use('/', express.static('public'));

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);