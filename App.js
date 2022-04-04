import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform } from "react-native";
import Navigation from "./src/navigation";
import { NavigationContainer } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Provider } from "react-redux";
import { store } from "./store";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1}}>
          <Navigation />
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
