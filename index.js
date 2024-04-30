const express = require('express');
const { connection } = require('./connect')
const urlRoute = require('./routes/url')
const app = express();
const PORT = 8001;
const URL = require('./models/url')

connection('mongodb://127.0.0.1:27017/url-shortener-database').then(() => {
    console.log("mongodb connection established")
})
app.use(express.json())
app.use('/url', urlRoute);
app.use('/', urlRoute);


app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
   const entry =  await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory:{
                timestamp : Date.now(),
            }
        }
    })
    res.redirect(entry.redirectURL)
})
app.listen(PORT, () => {
    console.log(`server is started at PORT ${PORT}`)
})
