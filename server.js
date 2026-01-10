const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* ===============================
   RESPUESTAS OFICIALES NOTARÍA 21
================================ */
function responder(mensaje) {
  mensaje = mensaje.toLowerCase();

  if (mensaje.includes("autentic")) {
    return `📄 *Autenticaciones Notaría 21*
📧 autenticaciones@notaria21bogota.com
📞 Tel: 601 746 1014 ext. 126
Los costos están regulados por ley.`;
  }

  if (mensaje.includes("registro")) {
    return `📜 *Registro Civil Notaría 21*
📧 registrocivil@notaria21bogota.com
📞 Tel: 601 746 1014 ext. 117 - 119

📍 Dirección: Calle 70A No. 8-27, Bogotá
💲 Valor copia: $10.300 (entrega mismo día en Bogotá)`;
  }

  if (mensaje.includes("liquid")) {
    return `💰 *Liquidaciones*
📧 liquidacion@notaria21bogota.com
📞 Tel: 601 746 1014 ext. 128`;
  }

  if (mensaje.includes("direccion") || mensaje.includes("ubicacion")) {
    return `📍 *Notaría 21 del Círculo de Bogotá*
Calle 70A No. 8-27
🕗 Lunes a viernes de 8:00 a.m. a 5:00 p.m.`;
  }

  if (
    mensaje.includes("agente") ||
    mensaje.includes("asesor") ||
    mensaje.includes("humano")
  ) {
    return `👩‍💼 *Atención humana*
📞 601 746 1017 / 601 746 1011
📧 informacion@notaria21bogota.com`;
  }

  return `🤖 *Asistente Virtual Notaría 21*
Puedo ayudarte con:
- Autenticaciones
- Registro civil
- Liquidaciones
- Dirección y horarios

Si deseas hablar con un asesor humano, escribe *AGENTE*.`;
}

/* ===============================
   RUTAS
================================ */
app.get("/", (req, res) => {
  res.send("🤖 Chatbot Notaría 21 activo");
});

app.post("/chat", (req, res) => {
  const mensaje = req.body.mensaje || "";
  const respuesta = responder(mensaje);
  res.json({ respuesta });
});

/* ===============================
   WHATSAPP TWILIO
================================ */
app.post("/whatsapp", (req, res) => {
  const mensaje = req.body.Body || "";
  const respuesta = responder(mensaje);

  res.set("Content-Type", "text/xml");
  res.send(`
    <Response>
      <Message>${respuesta}</Message>
    </Response>
  `);
});

/* ===============================
   SERVIDOR
================================ */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor Notaría 21 activo en puerto", PORT);
});
