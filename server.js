const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// ---------------- WEB CHAT ----------------
app.post("/chat", (req, res) => {
  const mensaje = req.body.mensaje.toLowerCase();
  const respuesta = responderMensaje(mensaje);
  res.json({ respuesta });
});

// ---------------- WHATSAPP ----------------
app.post("/whatsapp", (req, res) => {
  const mensaje = req.body.Body.toLowerCase();
  const respuesta = responderMensaje(mensaje);

  const twiml = new twilio.twiml.MessagingResponse();
  twiml.message(respuesta);

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

// ---------------- FUNCION RESPONDER ----------------
function responderMensaje(mensaje) {
  let respuesta = "Lo siento, no entendí tu pregunta. ¿Puedes reformularla?";
  if (mensaje.includes("horario")) respuesta = "El horario de atención de la notaría es de lunes a viernes de 8:00 a.m. a 4:00 p.m.";
  else if (mensaje.includes("escritura")) respuesta = "Para una escritura pública necesitas cédula, documentos del bien y minuta si aplica.";
  else if (mensaje.includes("registro civil")) respuesta = "Para registro civil de nacimiento necesitas certificado de nacido vivo y cédula de los padres.";
  else if (mensaje.includes("autenticación")) respuesta = "Para autenticar un documento debes presentar tu cédula original y el documento a autenticar.";
  else if (mensaje.includes("poder")) respuesta = "Para otorgar un poder necesitas tu cédula y los datos completos del apoderado.";
  else if (mensaje.includes("costo") || mensaje.includes("precio")) respuesta = "Los costos notariales están regulados por ley. Te recomendamos consultar directamente en la notaría.";
  return respuesta;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
