const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

// Configurar SendGrid con tu API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, text, html) => {
  const msg = {
    to: to, // Dirección de correo del destinatario
    from: 'qtapsoftware@gmail.com', 
    subject: subject,
    text: text,
    html: html,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;



