let nodeMailer = require('nodemailer');
let Email = {};

Email.transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
        user: '',
        pass: ''
    },
    tls:{ rejectUnauthorized: false}
},
{
    from:'',
    headers: {
    }
    
})

module.exports = Email;