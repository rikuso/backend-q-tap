const cron = require('node-cron');
const sendEmail = require('./sendgrid');
const getSubscribersFromFirestore = require('./getSubscribersFromFirestore');

// Función para enviar boletines
const enviarBoletin = async (tipo) => {
  const contacts = await getSubscribersFromFirestore();
  contacts.forEach(contact => {
    let asunto = '';
    let texto = '';
    let html = '';

    if (tipo === 'semanal') {
      asunto = '🔹 Boletín Semanal | Novedades de Q-Tap Software';
      texto = 'Descubre las últimas actualizaciones, tendencias y consejos tecnológicos para tu negocio.';
      html = `
        <h2>📢 Novedades de la Semana en Q-Tap Software</h2>
        <p>Hola ${contact.name || ''},</p>
        <p>Te traemos las últimas noticias, innovaciones y estrategias digitales para impulsar tu negocio.</p>
        <p>🚀 Desarrollo web, marketing digital, NFC y más.</p>
        <p>Lee más en nuestro blog: <a href="https://q-tapsoftware.com/blog">Q-Tap Blog</a></p>
        <p>Gracias por ser parte de nuestra comunidad.</p>
        <p><strong>Equipo de Q-Tap Software</strong></p>
      `;
    } else if (tipo === 'mensual') {
      asunto = '📅 Boletín Mensual | Lo Mejor de Q-Tap Software';
      texto = 'Un resumen exclusivo con lo más destacado del mes en tecnología, innovación y estrategias digitales.';
      html = `
        <h2>🌟 Resumen Mensual de Q-Tap Software</h2>
        <p>Hola ${contact.name || ''},</p>
        <p>Este mes ha estado lleno de avances tecnológicos y estrategias digitales clave.</p>
        <p>🔹 Casos de éxito, tendencias en marketing, desarrollo web y más.</p>
        <p>Explora nuestro contenido exclusivo: <a href="https://q-tapsoftware.com/blog">Q-Tap Blog</a></p>
        <p>Nos encanta ayudarte a innovar.</p>
        <p><strong>Equipo de Q-Tap Software</strong></p>
      `;
    }

    sendEmail(contact.email, asunto, texto, html);
  });
};

// Programar la tarea semanal (Domingo a medianoche)
cron.schedule('0 0 * * 0', () => enviarBoletin('semanal'));

// Programar la tarea mensual (Día 1 de cada mes a medianoche)
cron.schedule('0 0 1 * *', () => enviarBoletin('mensual'));
