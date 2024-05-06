const express = require('express');
const path = require('path');
const { connection } = require('./connect')
const cookieParser = require('cookie-parser')
const {restrictToLoggedinUserOnly} = require('./middlewares/auth')

const app = express();
const PORT = 8001;

const urlRoute = require('./routes/url')
const staticRouter = require('./routes/staticRouter')
const userRoute = require('./routes/user')

connection('mongodb://127.0.0.1:27017/url-shortener-database').then(() => {
    console.log("mongodb connection established")
})

app.set('view engine', 'ejs')
app.set('views', path.resolve('./view'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'stylesheets')));
app.use(cookieParser())


app.use('/url',restrictToLoggedinUserOnly, urlRoute);
app.use('/', urlRoute);
app.use('/', urlRoute);
app.use('/', staticRouter);
app.use('/user', userRoute);
app.listen(PORT, () => {
    console.log(`server is started at PORT ${PORT}`)
})
