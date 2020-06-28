/* Import Modules */
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const favicon = require('serve-favicon');
const app = express();
const expressLayout = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const verifyUser = require('./routes/auth/verifyToken');


/* Import Routers */
const indexRouter = require('./routes/index.js');
const projectsRouter = require('./routes/projects.js');
const userRouter = require('./routes/user.js');
const loginRouter = require('./routes/login.js');
const registerRouter = require('./routes/register.js');
const authRouter = require('./routes/auth/auth.js');

/* Constant Variables */
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost/test";




/* Server Setup */
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayout);
app.use(express.static('public'));
app.use(favicon(__dirname + '/public/images/favicon.png'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(verifyUser);
app.use(cors());

/* DataBase */

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect(DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => {console.log('Mongoose is connected');});




/* Middleware */
app.use('/', indexRouter);
app.use('/projects', projectsRouter); //פרוייקטים
app.use('/user', userRouter); //הגדרות
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/auth', authRouter);

const getData = require('./data');
app.use(async function(req, res, next) {
    if(req.originalUrl.includes('/uploads')) {
        return res.redirect('/images/no-image.png');
    }
    const data = await getData('404', req.user);
    res.render('404.ejs', {data});
});




/* Server Listening */
app.listen(PORT, '0.0.0.0', () => {
    process.stdout.write('\033[2J');
    console.clear();
    //makeDir('elkana');

    console.log(`Listening at port ${PORT}...`);
});



