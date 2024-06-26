const ShortUniqueId = require('short-unique-id');
const URL = require('../models/url')

async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'url is required'})
    const shortID = new ShortUniqueId({ length: 10 }).randomUUID();

    await URL.create({
        shortId : shortID,
        redirectURL : body.url,
        visitHistory : [],
        createdBy : req.user._id,
    })
    return res.render('home',{
        id : shortID
    });
}

const handleRedirectToWebsite = async (req, res) => {
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
    if (!entry) {
        return res.status(404).send("URL not found");
    }
    
    res.redirect(entry.redirectURL);
    
}

async function handleAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks : result.visitHistory.length,
        analytics : result.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortURL,
    handleRedirectToWebsite,
    handleAnalytics
}