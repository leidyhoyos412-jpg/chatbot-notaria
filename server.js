function generarRespuesta(mensaje) {
  mensaje = mensaje.toLowerCase();

  // SALUDO
  if (mensaje.includes("hola") || mensaje.includes("buen")) {
    return `👋 Bienvenido a la Notaría 21 del Círculo de Bogotá.

Puedo ayudarte con:
• Registro civil
• Autenticaciones
• Liquidaciones y costos
• Protocolo
• Información general

Escribe el trámite que deseas consultar.`;
  }

  // REGISTRO CIVIL
  if (mensaje.includes("registro")) {
    return `📄 REGISTRO CIVIL – NOTARÍA 21

📍 En Bogotá:
• Valor por copia: $10.300
• Entrega el mismo día
• Dirección: Calle 70 A No. 8-27
• Horario: 8:00 a.m. a 5:00 p.m.

🌍 Fuera de Bogotá:
Debe realizar consignación por $42.877

📧 Enviar comprobante y datos a:
registrocivil@notaria21bogota.com

Si deseas más de una copia, suma $10.300 por cada una.

¿Deseas hablar con un agente?`;
  }

  // AUTENTICACIONES
  if (mensaje.includes("autentic")) {
    return `✍️ AUTENTICACIONES

Para información y costos:
📧 autenticaciones@notaria21bogota.com
📞 7461014 ext. 126

¿Deseas hablar con un agente?`;
  }

  // LIQUIDACIONES
  if (mensaje.includes("liquid") || mensaje.includes("costo")) {
    return `💰 LIQUIDACIONES Y COSTOS

📧 liquidacin@notaria21bogota.com
📞 7461014 ext. 128

¿Deseas hablar con un agente?`;
  }

  // PROTOCOLO
  if (mensaje.includes("protocolo")) {
    return `📑 PROTOCOLO NOTARIAL

📧 protocolo@notaria21bogota.com
📞 7461014 ext. 121

¿Deseas hablar con un agente?`;
  }

  // RADICACIÓN / INFORMACIÓN GENERAL
  if (mensaje.includes("radic") || mensaje.includes("informacion")) {
    return `📬 INFORMACIÓN GENERAL

📞 Teléfonos:
• 601 7461017
• 601 7461011
Ext. 117 – 119

📧 Correos:
• radicacion@notaria21bogota.com
• informacion@notaria21bogota.com

¿Deseas hablar con un agente?`;
  }

  // AGENTE
  if (mensaje.includes("agente")) {
    return `👩‍💼👨‍💼 Para atención personalizada comunícate por los canales oficiales:

📞 601 7461017 / 601 7461011
📧 informacion@notaria21bogota.com

Gracias por comunicarte con la Notaría 21.`;
  }

  // RESPUESTA POR DEFECTO
  return `Gracias por comunicarte con la Notaría 21 del Círculo de Bogotá.

Escribe el trámite que deseas consultar o escribe:
👉 hablar con un agente`;
}
