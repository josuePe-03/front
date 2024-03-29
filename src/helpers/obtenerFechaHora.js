export function obtenerFechaHora(fechaString) {
    // Crear un objeto Date a partir de la fecha y hora proporcionada
    var fecha = new Date(fechaString);
   
    // Extraer el día, mes, año y hora
    var dia = fecha.getUTCDate();
    var mes = fecha.getUTCMonth() + 1; // Sumar 1 porque los meses están indexados desde 0
    var ano = fecha.getUTCFullYear();
    var hora = fecha.getUTCHours();
    var minutos = fecha.getUTCMinutes();
   
    // Formatear la fecha y hora en una cadena
    var fechaHoraFormateada = "Día: " + dia + ", Mes: " + mes + ", Año: " + ano + ", Hora: " + hora + ":" + minutos;
   
    // Devolver la cadena formateada
    return fechaHoraFormateada;
   }
