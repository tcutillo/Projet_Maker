import React, { PureComponent, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import { selectDestination, selectOrigin } from "../../../slices/navSlice";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { setDestination } from "../../../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import MapViewDirections from "react-native-maps-directions";
import { useRef} from "react";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!origin || !destination) return;

    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
      },
    });
  }, [origin, destination]);

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={"AIzaSyCffod3g_2GfJvHflG1fhb6DlscfGhJrxs"}
          strokeWidth={3}
          strokeColor="green"
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Destination"
          description={origin.description}
          identifier="destination"
        />
      )}
    </MapView>
  );
};

const MapScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View>
      <View style={tw`h-1/2`}>
        <Map />
      </View>

      <View style={tw`h-1/2`}>
        <SafeAreaView>
          <View style={tw`border-t border-gray-200 flex-shrink`}>
            <View>
              <GooglePlacesAutocomplete
                styles={{
                  container: {
                    flex: 0,
                    width: 300,
                    left: 35,
                    top: 0,
                  },
                  textInput: {
                    fontSize: 18,
                  },
                }}
                placeholder="Where to ?"
                fetchDetails={true}
                returnKeyType={"search"}
                minLength={2}
                onPress={(data, details = null) => {
                  dispatch(
                    setDestination({
                      location: details.geometry.location,
                      description: data.description,
                    })
                  );
                }}
                enablePowerByContainer={false}
                query={{
                  key: "AIzaSyCffod3g_2GfJvHflG1fhb6DlscfGhJrxs",
                  language: "en",
                }}
                nearbyPlacesAPI="GooglePlacesSearch"
                debounce={400}
              />
              {/* <TouchableOpacity onPress={OnSignPressed} style={styles.button}>
                <Text style={{ color: "#fff" }}>Start</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    width: 100,
    height: 30,
    backgroundColor: "#326ed5",
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 10,
    borderColor: "#777",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
  },
});

export default MapScreen;
