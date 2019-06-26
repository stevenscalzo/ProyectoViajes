const Email = require('../config/emailConf');
const hbs = require('nodemailer-express-handlebars');
const Path = require('path');



function emailRestablecer(email, code) {
   const handlebarOptions = {
    viewEngine: {
      extName: '.hbs',
      partialsDir: 'views/email-templates/partials',
      layoutsDir: 'views/email-templates/layouts',
      defaultLayout: 'email.body.hbs',
    },
    viewPath: Path.join(__dirname, '../views/email-templates/partials'),
    extName: '.hbs',
  };

  Email.transporter.use('compile', hbs(handlebarOptions));

  let message = {
    to: email,
    subject: 'Reestablecer contraseña',
    template: 'Reestablecer contraseña',
    html: `Para reestablecer su contraseña de click en el siguiente enlace: http://localhost:3000/users/restablecer/${code}`,
  }

  Email.transporter.sendMail(message, (error, info) => {
    if (error) {
      return res.status(500).send(error);
    } else {
      Email.transporter.close();
      console.log(`Mensaje Enviado a: ${message.to}`);
      res.status(200).send('Respuesta "%s"' + info.response);
    }
  });

}

module.exports = emailRestablecer;