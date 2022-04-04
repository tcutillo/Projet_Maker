import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
} from "react-native";
import { useAuth } from "../../../firebase";
import { useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../../../slices/navSlice";
import tw from "tailwind-react-native-classnames";

const HomePage = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [wherefrom, setWherefrom] = useState("");
  const navigation = useNavigation();
  const currentUser = useAuth();

  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Image
            style={{
              width: 40,
              height: 40,
              resizeMode: "contain",
              left: 20,
              top: 10,
            }}
            source={require("../../../assets/arrow.png")}
          />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>
          Welcome back, {currentUser?.email}
        </Text>
        <Text style={styles.destination}>
          Where are you ? 
        </Text>
        {/* <Text>Currently logged in as: {currentUser?.email}</Text> */}
        <GooglePlacesAutocomplete
          placeholder="Wher from *"
          styles={{
            container: {
              flex: 0,
              width: 300,
              left: 40,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
            dispatch(setDestination(null));
          }}
          fetchDetails={true}
          returnKeyType={"search"}
          enablePoweredByContainer={false}
          minLength={2}
          onFail={(error) => console.error(error)}
          query={{
            key: "AIzaSyCffod3g_2GfJvHflG1fhb6DlscfGhJrxs",
            language: "en",
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Map");
          }}
          style={styles.button}
        >
          <Text style={{ color: "#000000" }}>START</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  destination: {
    marginTop: 30,
    marginBottom: 15,
    fontSize: 30,
    left: 85,
    color: "#000000",
    fontWeight: "bold",

  },
  button: {
    width: 150,
    height: 30,
    left: 110,
    backgroundColor: "#00ff00",
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 30,
    marginBottom: 25,
    borderColor: "#00ff00",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
  },
});

export default HomePage;
