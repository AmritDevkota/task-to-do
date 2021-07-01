const express = require('express');
const session = require('express-session');
const path = require('path');

const router = require('./router/router');
const db = require('./database');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("static", express.static(path.join(__dirname, 'static')));

app.use(express.urlencoded());

app.use(session({
    secret: process.env.SESSION_SECRET
}))

app.use(router);
db();


app.listen(PORT);
console.log('Server Started in the port ', PORT);
