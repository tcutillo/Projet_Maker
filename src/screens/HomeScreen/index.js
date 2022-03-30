import React from "react";
import { View, Text } from "react-native";
import { useAuth } from "../../../firebase";

const HomePage = () => {
    const currentUser = useAuth();
  return (
    <View>
      <Text>Currently logged in as: {currentUser?.email}</Text>
    </View>
  );
};

export default HomePage;