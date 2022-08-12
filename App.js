import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppRouting from './config/routing/approuting';

export default function App() {
  return (<>
     {/* <NavigationContainer> */}
      <AppRouting />

     {/* </NavigationContainer> */}
    </> );
}