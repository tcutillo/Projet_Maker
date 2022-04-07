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
import {
  selectDestination,
  selectOrigin,
  selectTravelTimeInformation,
  setTravelTimeInformation,
} from "../../../slices/navSlice";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { setDestination } from "../../../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useRef } from "react";
import { async } from "@firebase/util";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?
        units=imperial&origins=${origin.description}&destinations=${destination.description}
        &key=AIzaSyCffod3g_2GfJvHflG1fhb6DlscfGhJrxs`
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
          console.log(data);
        });
    };
    getTravelTime();
  }, [origin, destination, "AIzaSyCffod3g_2GfJvHflG1fhb6DlscfGhJrxs"]);

  return (
    <MapView
      ref={mapRef}
      mapType="mutedStandard"
      style={tw`flex-1`}
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

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        />
      )}
    </MapView>
  );
};

const MapScreen = () => {
  const dispatch = useDispatch();
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const origin = useSelector(selectOrigin);
  const navigation = useNavigation();

  return (
    <View>
      <View style={tw`h-1/2`}>
        <Map />
      </View>

      <View style={tw`h-1/2`}>
        <SafeAreaView>
          <Text style={tw`text-center py-5 text-xl`}>Good Morning, Sonny</Text>
          <View style={tw`border-t border-gray-200 flex-shrink`}>
            <View>
              <GooglePlacesAutocomplete
                styles={{
                  container: {
                    flex: 0,
                    width: 300,
                    left: 35,
                    top: 0,
                    marginBottom: 10,
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
            </View>
            <Text style={tw`text-center py-2 text-xl`}>
              Travel Distance - {travelTimeInformation?.distance.text}
            </Text>
            <Text style={tw`text-center py-4 text-xl`}>
              Travel Time - {travelTimeInformation?.duration.text}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("FinalScreen");
              }}
              style={styles.buttons}
            >
              <Text>Done</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Home");
              }}
              style={styles.button}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    width: 80,
    height: 30,
    left: 145,
    backgroundColor: "#00ff00",
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    borderColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
  },
  button: {
    width: 80,
    height: 30,
    left: 145,
    backgroundColor: "#ff0000",
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 0,
    marginBottom: 25,
    borderColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
  },
});

export default MapScreen;
