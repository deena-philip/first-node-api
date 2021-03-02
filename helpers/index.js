//@ts-check
const nodeMailer = require('nodemailer')

exports.sendEmail = (data) => {
    console.log('Sending email...')
    console.log(data)
    const transporter = nodeMailer.createTransport({
        host: 'smtp.mail.yahoo.com',
        port: 465,
        secure: true,
        requireTLS: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PW
        }
    })
    // const transporter = nodeMailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 587,
    //     secure: false,
    //     requireTLS: true,
    //     auth: {
    //         user: 'phptrainees123@gmail.com',
    //         pass: '123php123'
    //     }
    // })
    return transporter.sendMail(data)
        .then(info => {
            console.log(`Email sent: ${info.response}`)
        })
        .catch(err => {
            console.log(`Unable to send email: ${err.message}`)
        })
}