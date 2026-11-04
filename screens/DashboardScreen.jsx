import { useState, useEffect } from "react";
import { View, Text, TextInput, Switch, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import Navbar from "../components/Navbar.";
import FraisCard from "../components/FraisCard";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../services/authService";

export default function DashboardScreen() {
  const { user, token } = useAuth();
  const [fraisList, setFraisList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterNonNull, setFilterNonNull] = useState(true);
  const [minMontant, setMinMontant] = useState("");

  useEffect(() => {
    const fetchFrais = async () => {
      try {
        const response = await fetch(`${API_URL}frais/liste/${user.id_visiteur}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setFraisList(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des frais :", error);
        setLoading(false);
      }
    };
    fetchFrais();
  }, []);

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

        <FlatList
          data={filteredFrais}
          keyExtractor={(item) => item.id_frais.toString()}
          renderItem={({ item }) => <FraisCard frais={item} />}
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
});
