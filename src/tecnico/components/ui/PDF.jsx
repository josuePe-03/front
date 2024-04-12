import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { obtenerFechaHora } from "../../../helpers";

const styles = StyleSheet.create({

  table: {
    flex: 1,
    padding: 10,
    borderWidth: 1, // Define el ancho del borde
    borderColor: '#ddd', // Define el color del borde
    borderStyle: 'solid', // Define el estilo del borde
   },
   row: {
    flexDirection: "row",
    justifyContent: "space-between",
   },
   header: {
    fontWeight: 800,
    fontSize: 10,

    flex: 1,
    display:"flex",
    borderWidth: 1,
    borderColor: "#ddd",
    padding:4
   },
   cell: {
    flex: 1,
    display:"flex",
    fontSize: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    padding:4
   },
   
});
export default function PDF({ incidencia }) {
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>

        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.header}>No Serie</Text>
            <Text style={styles.header}>Marca</Text>
            <Text style={styles.header}>Modelo</Text>
            <Text style={styles.header}>Unidad Medica</Text>
            <Text style={styles.header}>Detalle</Text>
            <Text style={styles.header}>Fecha Registrada</Text>
            <Text style={styles.header}>Tipo Incidencia</Text>
            <Text style={styles.header}>Estado</Text>
          </View>

          {incidencia.map((items) => (
            <View key={items._id} style={styles.row}>
              <Text style={styles.cell}>{items.id_equipo.no_serie}</Text>
              <Text style={styles.cell}>{items.id_equipo.marca}</Text>
              <Text style={styles.cell}>{items.id_equipo.modelo}</Text>
              <Text style={styles.cell}>{items.id_operador.unidad_medica}</Text>
              <Text style={styles.cell}>{items.detalle}</Text>
              <Text style={styles.cell}>{obtenerFechaHora(items.fecha_registrada)}</Text>
              <Text style={styles.cell}>{items.tipo_incidencia}</Text>
              <Text style={styles.cell}>{items.estado}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
