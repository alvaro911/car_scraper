const cron = require('cron')
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'alvaro.gomez911@gmail.com',
        pass: "a'sand8's"
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"Alvaro G" <alvaro.gomez911@gmail.com>',
    to: 'alvaro.gomez911@gmail.com',
    subject: 'node cron email',
    text: 'Hello world ?',
    html: '<b>Hello world ?</b>'
};

const emails = new cron.CronJob({
  cronTime: '00 00 14 * * *',
  onTick:()=>{
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    })
  }
})

emails.start();
