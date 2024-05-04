const express = require('express');
const {handleGenerateNewShortURL,handleRedirectToWebsite , handleAnalytics} = require('../controllers/url')
const router = express.Router();

router.post('/url',handleGenerateNewShortURL)


router.get('/analytics/:shortId',handleAnalytics)

router.get('/:shortId',handleRedirectToWebsite);

module.exports = router;