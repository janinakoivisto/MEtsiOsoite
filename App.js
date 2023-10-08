import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

export default function App() {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  
  const handleShowMap = async () => {
    try {
      const response = await axios.get(
        `https://www.mapquestapi.com/geocoding/v1/address?key=VmlEhjI9WIquqpXj6SsO00LHNiKRpBZ4&location=${address}`
      );
  
      const { latLng } = response.data.results[0].locations[0];
      setCoordinates(latLng);
    } catch (error) {
      console.error('Error fetching coordinates', error);
    }
  };
  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        placeholder="Enter address"
        value={address}
        onChangeText={(text) => setAddress(text)}
        style={{ width: 200, borderWidth: 1, padding: 10, margin: 30, marginTop: 50, marginBottom: 50 }}
      />
      <Button title="Show" onPress={handleShowMap}/>
      {coordinates && (
  <MapView
    style={{ flex: 1, width: '100%', marginTop: 30 }}
    initialRegion={{
      latitude: coordinates.lat,
      longitude: coordinates.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  >
    <Marker coordinate={{ latitude: coordinates.lat, longitude: coordinates.lng }} />
  </MapView>
)}


    </View>
  );
}