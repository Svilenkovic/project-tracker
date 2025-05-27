import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import ProjectDetailsScreen from './src/screens/ProjectDetailsScreen';
import AddProjectScreen from './src/screens/AddProjectScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Moji Projekti' }}
        />
        <Stack.Screen 
          name="ProjectDetails" 
          component={ProjectDetailsScreen} 
          options={{ title: 'Detalji Projekta' }}
        />
        <Stack.Screen 
          name="AddProject" 
          component={AddProjectScreen} 
          options={{ title: 'Novi Projekat' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App; 