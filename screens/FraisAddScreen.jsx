import { View } from "react-native";
import Navbar from "../components/Navbar.";
import FraisForm from "../components/FraisForm";

export default function FraisAddScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Navbar />
      <FraisForm />
    </View>
  );
}
