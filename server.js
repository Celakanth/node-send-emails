const config = require('./config/config');

const emailaddress = process.env.EMAIL_ADDRESS;
const password = process.env.PASSWORD;

const express = require('express'),
path = require('path'),
nodeMailer = require('nodemailer');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('index');
 });

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/send-email', function (req, res) {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: emailaddress, 
            pass: password
        }
    });
    let mailOptions = {
        from: '"Mac-book" ' + emailaddress, // sender address
        to: process.env.MESSAGE_TO, // list of receivers
        subject: process.env.SUBJECT, // Subject line
        html: '<b>' + process.env.MESSAGE + '</b>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
            res.render('index');
        });
    });

var port = 3000;
app.listen(port, function(req, res){
    console.log('Server is running at port: ',port);
});

