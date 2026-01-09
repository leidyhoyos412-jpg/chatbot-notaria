import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

function generarRespuesta(mensaje) {
  mensaje = mensaje.toLowerCase();

  let respuesta =
    "Bienvenido(a) a la Notaría 21 del Círculo de Bogotá.\n\n" +
    "Gracias por comunicarse con nosotros. Este canal brinda información general sobre nuestros trámites notariales.\n\n" +
    "Puede consultar sobre escrituras, autenticaciones, registros civiles, costos, horarios o contactos.";

  if (mensaje.includes("escritura") || mensaje.includes("protocolo")) {
    respuesta =
      "Para información sobre escrituras públicas o trámites de protocolo, por favor comuníquese a:\n\n" +
      "📧 protocolo@notaria21bogota.com\n" +
      "☎ Teléfono: 601 746 1014 ext. 121\n\n" +
      "Allí atenderán y resolverán sus inquietudes.";
  }

  else if (mensaje.includes("autentic")) {
    respuesta =
      "Para información sobre autenticaciones o costos de autenticación, comuníquese a:\n\n" +
      "📧 autenticaciones@notaria21bogota.com\n" +
      "☎ Teléfono: 601 746 1014 ext. 126\n\n" +
      "Allí atenderán y resolverán sus inquietudes.";
  }

  else if (mensaje.includes("liquid")) {
    respuesta =
      "Para información sobre liquidaciones o costos, comuníquese a:\n\n" +
      "📧 liquidacion@notaria21bogota.com\n" +
      "☎ Teléfono: 601 746 1014 ext. 128\n\n" +
      "Allí atenderán y resolverán sus inquietudes.";
  }

  else if (mensaje.includes("registro")) {
    respuesta =
      "REGISTRO CIVIL – COPIAS\n\n" +
      "📍 En Bogotá:\n" +
      "Valor por copia: $10.300\n" +
      "Entrega el mismo día\n" +
      "Dirección: Calle 70 A No. 8-27\n" +
      "Horario: 8:00 a.m. a 5:00 p.m.\n\n" +
      "📍 Fuera de Bogotá:\n" +
      "Debe realizar consignación a la Cuenta Corriente Banco de Bogotá No. 500315387\n" +
      "Titular: Libardo Benjamín Veloza Rubiano – Notario 21\n" +
      "Valor total: $42.877\n\n" +
      "Enviar comprobante a 📧 registrocivil@notaria21bogota.com";
  }

  else if (mensaje.includes("direccion") || mensaje.includes("ubicacion")) {
    respuesta =
      "La Notaría 21 del Círculo de Bogotá se encuentra ubicada en:\n\n" +
      "📍 Calle 70 A No. 8-27\n" +
      "🕗 Horario: lunes a viernes de 8:00 a.m. a 5:00 p.m.";
  }

  else if (mensaje.includes("telefono") || mensaje.includes("contacto")) {
    respuesta =
      "CONTACTO GENERAL NOTARÍA 21\n\n" +
      "☎ Teléfonos: 601 746 1017 / 601 746 1011\n" +
      "📞 Extensiones: 117 – 119\n" +
      "📧 radicacion@notaria21bogota.com\n" +
      "📧 informacion@notaria21bogota.com";
  }

  return respuesta;
}

/* Web */
app.post("/chat", (req, res) => {
  const mensaje = req.body.mensaje || "";
  res.json({ respuesta: generarRespuesta(mensaje) });
});

/* WhatsApp (Twilio) */
app.post("/whatsapp", (req, res) => {
  const mensaje = req.body.Body || "";
  const respuesta = generarRespuesta(mensaje);

  res.set("Content-Type", "text/xml");
  res.send(`
    <Response>
      <Message>${respuesta}</Message>
    </Response>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor activo en puerto ${PORT}`);
});
