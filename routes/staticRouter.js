const express = require('express');
const URL = require('../models/url')
const router = express.Router();

router.get('/',async (req,res)=>{
    if(!req.user) return res.redirect('/login');
    const allUrls = await URL.find({createdBy : req.user_id})
    return res.render('home',{
        urls : allUrls
    });
});

router.get('/signup',(req,res)=>{
    return res.render('signup');
});

router.get('/login',(req,res)=>{
    return res.render('login');
})


router.get('/analytics',async (req,res)=>{
    if(!req.user) return res.redirect('/login');
    const allUrls = await URL.find({createdBy : req.user._id})
    return res.render('analytics',{
        urls : allUrls
    })
});

module.exports = router;