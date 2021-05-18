const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const routes = require('./backend/routes/MainRoutes');

app.set("views", __dirname + "/client/views");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: "todokey",
    resave: false,
    saveUninitialized: false,
    cookie : {}
}));
app.use('/',routes);



app.listen(4000, () => {
    console.log("App Listening At",4000);
})

module.exports = app;