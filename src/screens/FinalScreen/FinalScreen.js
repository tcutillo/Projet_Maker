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
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  selectTravelTimeInformation,
  setTravelTimeInformation,
} from "../../../slices/navSlice";
import { setDestination } from "../../../slices/navSlice";

const FinalScreen = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.destination}>Latest Course</Text>
      </View>
      <View>
        <Text style={tw`text-center py-2 text-xl`}>
          You walkt {travelTimeInformation?.distance.text} from{" "}
          {origin.description} to {destination.description}
        </Text>
      </View>
      <View>
        <TouchableOpacity></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  destination: {
    marginTop: 30,
    marginBottom: 15,
    textDecorationLine: "underline",
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

export default FinalScreen;
