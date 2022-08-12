import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../../pages/home';
import SignUpPage from '../../pages/signup';
import LogInPage from '../../pages/login';
import BookingForm from '../../pages/bookingform';
import { Image } from 'react-native';

const Stack = createNativeStackNavigator();

function AppRouting() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Home" component={HomePage}
          options={{
            title: 'Home', //Set Header Title
            headerStyle: {
              backgroundColor: '#0288d1', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style  
            },
            headerRight: () => <Image style={{ width: 50, height: 50, borderRadius: 100 }} source={require("../../img/1.jpg")} />,

          }} />


        <Stack.Screen name="Signup" component={SignUpPage}
          options={{
            title: 'SignUp Form',
            headerTitleAlign: "center",

            headerStyle: {
              backgroundColor: '#674d3c',

            },
            headerTintColor: '#fff',

          }} />


        <Stack.Screen name="Login" component={LogInPage}
          options={{
            title: 'LogIn Form',
            headerTitleAlign: "center",

            headerStyle: {
              backgroundColor: '#674d3c',

            },
            headerTintColor: '#fff',

          }} />


        <Stack.Screen name="BookingForm" component={BookingForm}
          options={{
            title: 'Booking Form',
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: '#674d3c',

            },
            headerTintColor: '#fff',
          }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppRouting;