import { View, Text, Pressable } from "react-native";
import Navbar from "../components/Navbar."

export default function HomeScreen({ navigation }) {
    return (
        <View>
            <Navbar />
            <Text>Bienvenue</Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
                <Text>Aller à la connexion</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Dashboard")}>
                <Text>Aller au tableau de bord</Text>
            </Pressable>
        </View>
    );
}