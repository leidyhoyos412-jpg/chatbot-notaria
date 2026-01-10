const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function responder(mensaje) {
  const texto = mensaje.toLowerCase().trim();

  /* SALUDO */
  if (
    texto.includes("hola") ||
    texto.includes("buen") ||
    texto === "menu"
  ) {
    return `👋 *Bienvenido a la Notaría 21 del Círculo de Bogotá*

Por favor escribe el número del trámite que deseas consultar:

1️⃣ Registro Civil  
2️⃣ Matrimonio Civil  
3️⃣ Autenticaciones  
4️⃣ Escrituras y bienes inmuebles  
5️⃣ Declaraciones extrajuicio  
6️⃣ Salida del país de menores  
7️⃣ Liquidaciones  
8️⃣ Protocolo  
9️⃣ Información general y horarios  
0️⃣ Hablar con un agente`;
  }

  /* 1 REGISTRO CIVIL */
  if (texto === "1" || texto.includes("registro")) {
    return `📄 *REGISTRO CIVIL*

📍 *Si estás en Bogotá*:
• Valor por copia: $10.300
• Entrega el mismo día
• Dirección: Calle 70 A #8-27
• Horario: 8:00 a.m. a 5:00 p.m.

🌎 *Si estás fuera de Bogotá*:
Debes consignar *$42.877* en:

🏦 Banco de Bogotá  
Cuenta corriente: 500315387  
Titular: Libardo Benjamín Veloza Rubiano  
(Notario 21 del Círculo de Bogotá)

Incluye:
• Copia: $10.300  
• Porte correo: $12.470  
• Comisión banco: $20.107  

📧 Envía el comprobante a:
registrocivil@notaria21bogota.com

Indica:
• Nombres y apellidos
• Número de registro o serial
• Dirección y teléfono
• A nombre de quién va el envío

Cada copia adicional: $10.300  
0️⃣ Hablar con un agente`;
  }

  /* 2 MATRIMONIO */
  if (texto === "2" || texto.includes("matrimonio")) {
    return `💍 *MATRIMONIO CIVIL*

Requisitos generales:
• Registro civil de nacimiento (máx. 3 meses)
• Cédulas de ambos contrayentes

Según el caso:
• Divorciado: registro con nota de divorcio
• Viudo: registro de defunción del cónyuge
• Hijos previos: inventario solemne de bienes

📞 Confirma requisitos:
601 7461017 / 601 7461011  
📧 informacion@notaria21bogota.com

0️⃣ Hablar con un agente`;
  }

  /* 3 AUTENTICACIONES */
  if (texto === "3" || texto.includes("autentic")) {
    return `✍️ *AUTENTICACIONES*

Debes llevar:
• Documento original
• Cédula de ciudadanía
• Personas jurídicas: certificado de existencia

📧 autenticaciones@notaria21bogota.com  
📞 7461014 ext. 126

0️⃣ Hablar con un agente`;
  }

  /* 4 ESCRITURAS */
  if (texto === "4" || texto.includes("escrit")) {
    return `🏠 *ESCRITURAS Y BIENES INMUEBLES*

Requisitos comunes:
• Certificado de tradición (≤ 60 días)
• Impuestos al día
• Escritura antecedente
• Cédulas de los comparecientes

📧 notaria@notaria21bogota.com  
📞 601 7461016

0️⃣ Hablar con un agente`;
  }

  /* 5 EXTRAJUICIO */
  if (texto === "5" || texto.includes("extraju")) {
    return `📄 *DECLARACIÓN EXTRAJUICIO*

Requisitos:
• Cédula original
• Registros civiles (si aplica)
• Se realiza bajo juramento en notaría

0️⃣ Hablar con un agente`;
  }

  /* 6 SALIDA DE MENORES */
  if (texto === "6" || texto.includes("menor")) {
    return `✈️ *SALIDA DEL PAÍS DE MENORES*

Requisitos:
• Cédulas de los padres
• Registro civil del menor
• Permiso de salida

0️⃣ Hablar con un agente`;
  }

  /* 7 LIQUIDACIONES */
  if (texto === "7" || texto.includes("liquid")) {
    return `💰 *LIQUIDACIONES*

📧 liquidacin@notaria21bogota.com  
📞 7461014 ext. 128

0️⃣ Hablar con un agente`;
  }

  /* 8 PROTOCOLO */
  if (texto === "8" || texto.includes("protocolo")) {
    return `📑 *PROTOCOLO*

📧 protocolo@notaria21bogota.com  
📞 7461014 ext. 121

0️⃣ Hablar con un agente`;
  }

  /* 9 INFORMACIÓN GENERAL */
  if (texto === "9" || texto.includes("informacion")) {
    return `📍 *INFORMACIÓN GENERAL*

📍 Dirección:
Calle 70 A #8-27  
Quinta Camacho – Bogotá D.C.

🕘 Horario:
Lunes a viernes: 8:00 a.m. a 5:00 p.m.
Sábados de turno: 8:00 a.m. a 12:00 m

📞 Teléfonos:
601 7461017 – 601 7461011  
Ext. 117 – 119

📧 Correos:
informacion@notaria21bogota.com  
radicacion@notaria21bogota.com

0️⃣ Hablar con un agente`;
  }

  /* AGENTE */
  if (texto === "0" || texto.includes("agente")) {
    return `📲 Gracias. Un agente de la Notaría 21 atenderá tu solicitud.`;
  }

  /* NO ENTENDIDO */
  return `ℹ️ No entendí tu mensaje.

Escribe *hola* para ver el menú nuevamente  
o escribe *0* para hablar con un agente.`;
}

/* WHATSAPP WEBHOOK */
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

/* PRUEBA WEB */
app.get("/", (req, res) => {
  res.send("Chatbot Notaría 21 activo ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor activo en puerto " + PORT));

