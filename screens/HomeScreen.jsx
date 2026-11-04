import { View, Text, Pressable } from "react-native";
import Navbar from "../components/Navbar."
import { useAuth } from "../context/AuthContext";

export default function HomeScreen({ navigation }) {
    const { user } = useAuth();

    return (
        <View>
            <Navbar />
            <Text>Bienvenue</Text>
            <Text>Bonjour {user?.prenom_visiteur} !</Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
                <Text>Aller à la connexion</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Dashboard")}>
                <Text>Aller au tableau de bord</Text>
            </Pressable>
        </View>
    );
}