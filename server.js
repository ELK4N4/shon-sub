/* Import Modules */
require('dotenv').config();

const express = require('express');
const favicon = require('serve-favicon');
const app = express();
const expressLayout = require('express-ejs-layouts');
const bodyParser = require('body-parser');

/* Import Routers */
const indexRouter = require('./routes/index.js');
const booksRouter = require('./routes/books.js');

/* Constant Variables */
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost/test";

/* Server Setup */
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayout);
app.use(express.static('public'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

/* DataBase */
/*
const mongoose = require('mongoose');
mongoose.connect(DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => {console.log('Mongoose is connected');});
/*


/* Middleware */
app.use('/', indexRouter);
app.use('/books', booksRouter);

/* Server Listening */
app.listen(PORT, '0.0.0.0', () => {
    process.stdout.write('\033[2J');
    console.clear();
    console.log(`Listening at port ${PORT}...`);
});