import { useState, useEffect } from "react";
import { Text, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";
import FraisForm from "../components/FraisForm";

export default function FraisEditScreen() {
  const route = useRoute();
  const { id } = route.params; // récupération de l'id passé en paramètre de navigate()
  const [frais, setFrais] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFrais = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`${API_URL}frais/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error || `Erreur HTTP ${response.status}`);
        }
        const data = await response.json();
        setFrais(data);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFrais();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" />;
  if (!frais) return <Text>Frais non trouvé</Text>;

  return <FraisForm frais={frais} />;
}
