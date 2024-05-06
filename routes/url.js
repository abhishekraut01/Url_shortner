const express = require('express');
const {handleGenerateNewShortURL,handleRedirectToWebsite , handleAnalytics} = require('../controllers/url')
const router = express.Router();

router.post('/',handleGenerateNewShortURL)


router.get('/analytics/:shortId',handleAnalytics)

router.get('/url/:shortId',handleRedirectToWebsite);



module.exports = router;