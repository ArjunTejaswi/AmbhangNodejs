const express =  require('express')
//for handling more controllers
const router = express.Router()
const nodemailer = require('nodemailer');
const AWS = require('aws-sdk')
const path = require('path')
const mark = require('markup-js')
const fs = require('fs')
const ejs = require('ejs')
const pdf = require('html-pdf')
// const awsKeys =  {
//     region: 'ap-south-1',
//     accessKeyId: "AKIAUTHKIFGHFEZ4QQRO",
//     secretAccessKey: "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"
// }
// const SES = new AWS.SES(awsKeys)


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

router.get('/profile', (req,res,next) => {
    ejs.renderFile(path.join(__dirname, '../views', 'pdf/profile.ejs'), (err, data) => {
        if (err) {
            console.log(err)
        } else {
            var options = {
                height: '11.25in',
                width: '8.5in',
                header: {
                    height: '20mm'
                },
                footer: {
                    height: '20mm'
                }
            }
            pdf.create(data, options).toBuffer((err, buffer) => {
                res.writeHead(200,
                    {
                        'Content-Type': 'application/pdf',
                        'Content-Disposition': 'attachment;filename="Our-Profile.pdf"'
                    })
                res.end(buffer)
            })
        }
    })
})

router.get('/activities', (req,res,next) => {
    ejs.renderFile(path.join(__dirname, '../views', 'pdf/activities.ejs'), (err, data) => {
        if (err) {
            console.log(err)
        } else {
            var options = {
                height: '11.25in',
                width: '8.5in',
                header: {
                    height: '20mm'
                },
                footer: {
                    height: '20mm'
                }
            }
            pdf.create(data, options).toBuffer((err, buffer) => {
                res.writeHead(200,
                    {
                        'Content-Type': 'application/pdf',
                        'Content-Disposition': 'attachment;filename="activities.pdf"'
                    })
                res.end(buffer)
            })
        }
    })
})

router.get('/Contact-Us', (req,res,next) => {
    res.render('Contact-Us',{
        layout: 'layouts/layout',
    })
})

router.get('/Gallery', (req,res,next) => {
    res.render('Gallery',{
        layout: 'layouts/layout',
    })
})

// router.post('/Contact-Us', (req,res,next) => {
//     const subject = req.body.subject
//     const message = req.body.message
//     const name = req.body.first_name
//     const email = req.body.email_id
//     const messageBodyAttributes = {
//         toEmailAddress: 'arjuntejaswi.s@gmail.com',
//         // eslint-disable-next-line no-dupe-keys
//         subject: subject,
//         message: message,
//         name: name,
//         email: email,
//     }
//     fs.readFile(path.join(__dirname, '../views/template/contact.html'), 'utf8', function (err, data) {
//         if (err) {
//             console.log(err)
//             // context.fail('Internal Error: Failed to load template from s3.');
//         } else {
//             const templateBody = data.toString()
//             const messageBody = mark.up(templateBody, messageBodyAttributes)
//             const emailParams = {
//                 Destination: {
//                     ToAddresses: [
//                         'arjun.tejaswi@7edge.com'
//                     ]
//                 },
//                 Message: {
//                     Subject: {
//                         Data: messageBodyAttributes.subject,
//                         Charset: 'UTF-8'
//                     }
//                 },
//                 Source:'arjuntejaswi.s@gmail.com' ,
//                 // ReplyToAddresses: [
//                 //     'arjuntejaswi.s@gmail.com'
//                 // ]
//             }
//             emailParams.Message.Body = {
//                 Html: {
//                     Data: messageBody,
//                     Charset: 'UTF-8'
//                 }
//             }
//             // eslint-disable-next-line no-unused-vars
//             SES.sendEmail(emailParams, function (err, data) {
//                 if (err) {
//                     console.log(err)
//                 } else {
//                     res.redirect('/Home')
//                 }
//             })
//         }
//     })
// })

router.get('/PrivacyPolicy', (req,res,next) => {
    res.render('privacyPolicy',{
        layout: 'layouts/layout',
    })
})

router.get('/Terms', (req,res,next) => {
    res.render('Terms',{
        layout: 'layouts/layout',
    })
})
module.exports = router
