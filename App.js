import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator } from "react-native";
import { AuthProvider, useAuth } from "./context/AuthContext";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import FraisAddScreen from "./screens/FraisAddScreen";
import FraisEditScreen from "./screens/FraisEditScreen";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { user, sessionLoading } = useAuth();

  if (sessionLoading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      {user ? (
        <>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="FraisAdd" component={FraisAddScreen} />
          <Stack.Screen name="FraisEdit" component={FraisEditScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}