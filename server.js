const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* ===============================
   INFORMACIÓN COMPLETA NOTARÍA
================================ */

const notariaInfo = `
📍 NOTARÍA 21

🕘 Horarios de atención:
Lunes a Viernes: 8:00 a.m. – 4:00 p.m.
Sábados: 8:00 a.m. – 12:00 m.

📄 TRÁMITES DISPONIBLES:

1️⃣ Registro Civil
- Nacimiento
- Matrimonio
- Defunción

💰 Precios aproximados:
• Copia registro civil: $8.000
• Registro extemporáneo: consultar

2️⃣ Autenticaciones
- Documentos
- Firmas
- Huellas

💰 Precio:
• Autenticación: desde $7.000

3️⃣ Poderes
- Poder especial
- Poder general

💰 Precio:
• Desde $35.000 (según extensión)

4️⃣ Escrituras Públicas
- Compra y venta
- Hipoteca
- Cancelaciones

💰 Precio:
• Según cuantía del acto

5️⃣ Declaraciones Extra juicio
- Unión marital
- Dependencia económica
- Testimoniales

💰 Precio:
• Desde $45.000

📌 Requisitos generales:
- Documento de identidad original
- Copias legibles
- Pago del trámite

📲 Si no tienes claridad sobre el trámite adecuado,
puedes solicitar ayuda directa.
`;

/* ===============================
   RESPUESTAS INTELIGENTES
================================ */

function generarRespuesta(mensaje) {
  const texto = mensaje.toLowerCase();

  if (texto.includes("hola") || texto.includes("buenas")) {
    return `👋 Hola, bienvenido a la Notaría 21.

Puedo ayudarte con:
• Información de trámites
• Precios
• Requisitos
• Horarios

Escribe el trámite que necesitas o dime:
👉 "hablar con un agente"`;
  }

  if (texto.includes("registro")) {
    return `📄 REGISTRO CIVIL

Realizamos:
• Nacimiento
• Matrimonio
• Defunción

💰 Precios:
• Copia: $8.000
• Otros casos: consultar

¿Deseas hablar con un agente?`;
  }

  if (texto.includes("autentic")) {
    return `✍️ AUTENTICACIONES

Autenticamos:
• Firmas
• Documentos
• Huellas

💰 Precio desde $7.000

¿Deseas hablar con un agente?`;
  }

  if (texto.includes("poder")) {
    return `📜 PODERES NOTARIALES

• Poder especial
• Poder general

💰 Desde $35.000 (varía según contenido)

¿Deseas hablar con un agente?`;
  }

  if (texto.includes("escritura")) {
    return `🏛️ ESCRITURAS PÚBLICAS

• Compra y venta
• Hipoteca
• Cancelaciones

💰 El valor depende del monto del acto.

¿Deseas hablar con un agente?`;
  }

  if (texto.includes("horario")) {
    return `🕘 HORARIOS

Lunes a Viernes:
8:00 a.m. – 4:00 p.m.

Sábados:
8:00 a.m. – 12:00 m.`;
  }

  if (texto.includes("precio") || texto.includes("costo")) {
    return notariaInfo + `

¿Deseas hablar con un agente?`;
  }

  if (texto.includes("agente")) {
    return `📲 Un agente de la notaría se comunicará contigo en breve.
Por favor espera.`;
  }

  return `ℹ️ No logré identificar tu solicitud.

Puedes preguntar por:
• Registro civil
• Autenticaciones
• Poderes
• Escrituras
• Horarios
• Precios

¿Deseas hablar con un agente?`;
}

/* ===============================
   WEBHOOK WHATSAPP (TWILIO)
================================ */

app.post("/whatsapp", (req, res) => {
  const mensajeUsuario = req.body.Body || "";
  const respuesta = generarRespuesta(mensajeUsuario);

  res.set("Content-Type", "text/xml");
  res.send(`
    <Response>
      <Message>${respuesta}</Message>
    </Response>
  `);
});

/* ===============================
   PRUEBA WEB
================================ */

app.get("/", (req, res) => {
  res.send("Chatbot Notaría 21 activo ✅");
});

/* ===============================
   INICIO SERVIDOR
================================ */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor activo en puerto " + PORT);
});
