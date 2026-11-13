import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, TextInput, Switch, FlatList, ActivityIndicator, StyleSheet, Alert } from "react-native";
import Navbar from "../components/Navbar.";
import FraisCard from "../components/FraisCard";
import { useAuth } from "../context/AuthContext";
import { getFraisList, deleteFrais } from "../services/fraisService";

export default function DashboardScreen({ navigation }) {
  const { user, token } = useAuth();
  const [fraisList, setFraisList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterNonNull, setFilterNonNull] = useState(true);
  const [minMontant, setMinMontant] = useState("");
  const [error, setError] = useState("");

  useFocusEffect(
    useCallback(() => {
      const fetchFrais = async () => {
        try {
          setFraisList(await getFraisList(user.id_visiteur, token));
          setError("");
        } catch (err) {
          console.error("Erreur lors de la récupération des frais :", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchFrais();
    }, [user, token])
  );

  // Ouverture du formulaire de modification
  function handleEdit(id) {
    navigation.navigate("FraisEdit", { id });
  }

  async function removeFrais(id) {
    try {
      await deleteFrais(id, token);
      setFraisList((prev) => prev.filter((f) => f.id_frais !== id));
    } catch (error) {
      Alert.alert("Erreur lors de la suppression :", error.message);
    }
  }

  const handleDelete = (id) => {
    Alert.alert(
      "Confirmation",
      "Êtes-vous sûr de vouloir supprimer cette note de frais ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => removeFrais(id),
        },
      ]
    );
  };

  const filteredFrais = fraisList
    .filter((f) => !filterNonNull || f.montantvalide !== null)
    .filter((frais) =>
      frais.anneemois.includes(searchTerm) ||
      frais.id_visiteur.toString().includes(searchTerm)
    )
    .filter((f) => minMontant === "" || f.montantvalide > parseFloat(minMontant));

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

  return (
    <View style={{ flex: 1 }}>
      <Navbar />
      <View style={styles.container}>
        <Text>Tableau de bord de {user.prenom_visiteur}</Text>

        <TextInput
          placeholder="Rechercher par année-mois ou ID visiteur..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={styles.searchInput}
        />

        <View style={styles.filterRow}>
          <Switch
            value={filterNonNull}
            onValueChange={setFilterNonNull}
          />
          <Text>Afficher seulement les frais avec un montant validé</Text>
        </View>

        <TextInput
          placeholder="Montant validé minimum"
          value={minMontant}
          onChangeText={setMinMontant}
          keyboardType="numeric"
          style={styles.searchInput}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}
        <FlatList
          data={filteredFrais}
          keyExtractor={(item) => item.id_frais.toString()}
          renderItem={({ item }) => <FraisCard frais={item} onEdit={handleEdit} onDelete={handleDelete} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: "#FFF",
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  error: {
    color: "red",
    marginBottom: 12,
  },
});
