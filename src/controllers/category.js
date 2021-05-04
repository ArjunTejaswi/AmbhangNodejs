const express =  require('express')
//for handling more controllers
const router = express.Router()
const nodemailer = require('nodemailer');
const AWS = require('aws-sdk')
const path = require('path')
const mark = require('markup-js')
const fs = require('fs')
const awsKeys =  {
    region: 'ap-south-1',
        accessKeyId: 'AKIAUTHKIFGHMO47GJ6U',
        secretAccessKey: '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'
}
const SES = new AWS.SES(awsKeys)


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

// router.post('/Contact-Us', (req,res,next) => {
//     console.log(req.body)
//     var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'arjuntejaswi.s@gmail.com',
//             pass: 'arjunvivek'
//         }
//     });
//
//     var mailOptions = {
//         from: req.body.email_id,
//         to: 'arjuntejaswi.s@gmail.com',
//         subject: req.body.subject,
//         text: req.body.message
//     };
//
//     transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email sent: ' + info.response);
//             res.redirect('/Home')
//         }
//     });
// })

router.post('/Contact-Us', (req,res,next) => {
    const subject = req.body.subject
    const message = req.body.message
    const name = req.body.name
    const email = req.body.email_id
    const messageBodyAttributes = {
        toEmailAddress: 'arjuntejaswi.s@gmail.com',
        subject: 'The Steel Room',
        // eslint-disable-next-line no-dupe-keys
        subject: subject,
        message: message,
        name: name,
        email: email,
    }
    fs.readFile(path.join(__dirname, '../views/template/contact.html'), 'utf8', function (err, data) {
        if (err) {
            console.log(err)
            // context.fail('Internal Error: Failed to load template from s3.');
        } else {
            const templateBody = data.toString()
            const messageBody = mark.up(templateBody, messageBodyAttributes)
            const emailParams = {
                Destination: {
                    ToAddresses: [
                        'arjuntejaswi.s@gmail.com'
                    ]
                },
                Message: {
                    Subject: {
                        Data: messageBodyAttributes.subject,
                        Charset: 'UTF-8'
                    }
                },
                Source:'arjuntejaswi.s@gmail.com' ,
                ReplyToAddresses: [
                    'arjuntejaswi.s@gmail.com'
                ]
            }
            emailParams.Message.Body = {
                Html: {
                    Data: messageBody,
                    Charset: 'UTF-8'
                }
            }
            // eslint-disable-next-line no-unused-vars
            const email = SES.sendEmail(emailParams, function (err, data) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Hi")
                    res.redirect('/Home')
                }
            })
        }
    })
})

module.exports = router
