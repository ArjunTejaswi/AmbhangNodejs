const express =  require('express')
//for handling more controllers
const router = express.Router()
const nodemailer = require('nodemailer');



router.get('/Home', (req,res,next) => {
    res.render('home',{
        layout: 'layouts/layout',
    })
})

router.get('/About-Us', (req,res,next) => {
    res.render('aboutus',{
        layout: 'layouts/layout',
    })
})

router.get('/Downloads', (req,res,next) => {
    res.render('Downloads',{
        layout: 'layouts/layout',
    })
})

router.get('/Contact-Us', (req,res,next) => {
    res.render('Contact-Us',{
        layout: 'layouts/layout',
    })
})

router.post('/Contact-Us', (req,res,next) => {
    console.log(req.body)
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'arjuntejaswi.s@gmail.com',
            pass: 'arjunvivek'
        }
    });

    var mailOptions = {
        from: req.body.email_id,
        to: 'arjuntejaswi.s@gmail.com',
        subject: req.body.subject,
        text: req.body.message
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.redirect('/Home')
        }
    });
})

module.exports = router
