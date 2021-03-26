/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {GalleryFlatlist} from '../GalleryFlatlist/';

const Stack = createStackNavigator();

const StackData = [
  {
    name: 'Synced Flatlist Gallery',
    description:
      'Demonstration of a gallery ui using Multiple flatlist communication',
  },
  {
    name: 'Carousel',
    description:
      'Demonstration of a gallery ui using Multiple flatlist communication',
  },
];
function HomeScreen({navigation}) {
  const nav = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      /> */}
      <FlatList
        ItemSeparatorComponent={() => (
          <View
            style={{height: 1, backgroundColor: '#cccccc', width: '100%'}}
          />
        )}
        keyExtractor={(item, idex) => item.name.toString()}
        data={StackData}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('GalleryFlatlist')}
              style={{padding: 16}}>
              <Text
                style={{fontSize: 25, fontWeight: 'bold', color: '#4444aa'}}>
                {item.name}
              </Text>
              <Text style={{fontSize: 16, color: '#444444'}}>
                {item.description}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="GalleryFlatlist" component={GalleryFlatlist} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
