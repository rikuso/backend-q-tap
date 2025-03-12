const app = require('./app');
// En cooreo enviado
require('./scheduledTasks');


// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
