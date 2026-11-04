import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import Navbar from "../components/Navbar.";
import { loginStyles as styles } from "../styles/loginStyles";

export default function LoginScreen() {
  // 1. États locaux pour les champs du formulaire
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  // 2. Récupérer loginUser depuis le contexte
  const { loginUser } = useAuth();

  // 3. Hook pour la redirection après connexion
  const navigation = useNavigation();

  // 4. Fonction appelée au clic sur le bouton
  const handleSubmit = () => {
    if (loginUser(login, password)) {
      navigation.navigate("Dashboard"); // Succès : redirige vers Dashboard
    } else {
      Alert.alert("Identifiants incorrects"); // Échec : affiche une erreur
    }
  };
  // 5. Rend le formulaire
  return (
    <>
      <Navbar />
      <View style={styles.container}>
        <Text style={styles.title}>Connexion</Text>

        <View>
          <Text>Login :</Text>
          <TextInput
            style={styles.input}
            value={login}
            onChangeText={setLogin}
            
          />
        </View>

        <View>
          <Text>Password :</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
               />
        </View>

        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </Pressable>
      </View>
    </>
  );
}