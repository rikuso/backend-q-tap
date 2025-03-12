const db = require('../firebase');
const ContactMessage = require('../models/contactModel');
const sendEmail = require('../sendgrid');

exports.saveContactMessage = async (req, res) => {
  const data = req.body;
  const contactMessage  = new ContactMessage(data)
  try {
    const simpleContactData = contactMessage.toFirestoreObject();
    const docRef = await db.collection('contact').add(simpleContactData);

    // Enviar correo electrónico al administrador (tu correo)
    await sendEmail(
        'qtapsoftware@gmail.com', 
        'Nuevo Mensaje de Contacto',
        `Nombre: ${data.name}\nEmail: ${data.email}\nCelular: ${data.celphone}\nMensaje: ${data.message}`,
        `<p><strong>Nombre:</strong> ${data.name}</p>
         <p><strong>Email:</strong> ${data.email}</p>
         <p><strong>Celular:</strong> ${data.celphone}</p>
         <p><strong>Mensaje:</strong> ${data.message}</p>`
    );

    // Enviar correo electrónico al usuario
    await sendEmail(
        data.email,
        '📩 Hemos recibido tu mensaje - Q-Tap Software',
        `Hola ${data.name}, 

        Gracias por ponerte en contacto con Q-Tap Software. 

        Hemos recibido tu mensaje y nuestro equipo se comunicará contigo lo antes posible. 
        Si necesitas asistencia inmediata, puedes escribirnos por WhatsApp o responder a este correo.

        🌐 Visita nuestra web: www.qtapsoftware.com
        📧 Si tienes más dudas, responde a este mensaje.

        ¡Gracias por confiar en nosotros!

        Saludos,
        Equipo Q-Tap Software`,
        `<p>Hola <strong>${data.name}</strong>,</p>
         <p>Gracias por ponerte en contacto con <strong>Q-Tap Software</strong>.</p>
         <p>Hemos recibido tu mensaje y nuestro equipo se comunicará contigo lo antes posible.</p>
         <p>Si necesitas asistencia inmediata, puedes escribirnos por <a href="https://wa.me/+573116231415">WhatsApp</a> o responder a este correo.</p>
         <p>🌐 <a href="https://www.qtapsoftware.com">Visita nuestra web</a></p>
         <p>📧 Si tienes más dudas, responde a este mensaje.</p>
         <p>¡Gracias por confiar en nosotros!</p>
         <p>Saludos,<br><strong>Equipo Q-Tap Software</strong></p>`
    );

    res.status(201).json({ id: docRef.id, ...simpleContactData });
} catch (error) {
    res.status(500).send(error.message);
}
};

