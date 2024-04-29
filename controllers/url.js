const ShortUniqueId = require('short-unique-id');
const URL = require('../models/url')

async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'url is required'})
    const shortID = new ShortUniqueId({ length: 10 });

    await URL.create({
        shortId : shortID,
        redirectURL : body.url,
        visitHistory : [],
    })
    return res.json({id : shortID})
}

module.exports = {
    handleGenerateNewShortURL,
}