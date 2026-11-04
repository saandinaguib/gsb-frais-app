import { View, Text, StyleSheet, Pressable } from "react-native";

export default function FraisCard({ frais, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Note [{frais.id_frais}] Visiteur n°{frais.id_visiteur} - {frais.anneemois}</Text>
      <Text style={styles.meta}>Justificatifs : {frais.nbjustificatifs}</Text>
      <Text style={styles.montant}>Montant validé : {frais.montantvalide}</Text>
      <Text style={styles.meta}>Montant saisi : —</Text>
      <View style={styles.buttonRow}>
        <Pressable onPress={() => onEdit(frais.id_frais)} style={styles.editButton}>
          <Text>Modifier</Text>
        </Pressable>
        <Pressable onPress={() => onDelete(frais.id_frais)} style={styles.deleteButton}>
          <Text style={styles.deleteText}>Supprimer</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#161B33",
  },
  meta: {
    fontSize: 14,
    color: "#5B6270",
    marginTop: 4,
  },
  montant: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0E8C7C",
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  editButton: {
    borderWidth: 1,
    borderColor: "#5B6270",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: "#D9534F",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 8,
  },
  deleteText: {
    color: "#D9534F",
  },
});
