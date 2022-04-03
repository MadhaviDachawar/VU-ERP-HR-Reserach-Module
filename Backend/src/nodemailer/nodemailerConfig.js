import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
          user: 'noreply.vupune.ac.in@gmail.com',
          pass: 'noreply@123$%' // naturally, replace both with your real credentials or an application-specific password
     }
});

// const mailOptions = {
//      from: '"VU ERP" <noreply.vupune@gmail.com>', // sender address
//      to: "ayman.parkar@gmail.com", // list of receivers
//      subject: "Hello ✔", // Subject line
//      text: "Hello world?", // plain text body
//      html: "<b>Hello world?</b>", // html body
// }
   
// Only to send email without logging; use this
// transporter.sendMail({
//      from: '"VU ERP" <noreply.vupune@gmail.com>', // sender address
//      to: "ayman.parkar@gmail.com", // list of receivers
//      subject: "Hello ✔", // Subject line
//      text: "Hello world?", // plain text body
//      html: "<b>Hello world?</b>", // html body
// })

// to send email and log it
// transporter.sendMail(mailOptions, function(error, info){
//      if (error) {
//           console.log(error);
//      } else {
//           console.log('Email sent: ' + info.response);
//      }
// });