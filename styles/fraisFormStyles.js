import { StyleSheet } from "react-native";

export const fraisFormStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },

  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 12,
    marginTop: 4,
    marginBottom: 16,
  },

  smallButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  smallbutton: {
    flex: 1,
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 4,
    alignItems: "center",
  },

  button: {
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },

  error: {
    color: "red",
    marginTop: 12,
  },
});
