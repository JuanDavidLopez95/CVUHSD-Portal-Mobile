import 'react-native-gesture-handler';

import React from 'react';

import { registerRootComponent } from 'expo';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'

import App from './components/App/App.js';

if (__DEV__) {
    //Initialize Reactotron
    import('./config/reactotron.dev.js').then(() => console.log('Reactotron Configured'));
}

const theme = {
    ...DefaultTheme,
    roundness: 10,
    colors: {
      ...DefaultTheme.colors,
      primary: '#6200ee',
      accent: 'yellow',
    },
  };

const AppWithProviders = () => {
    return (
        <PaperProvider theme={theme}>
            <SafeAreaProvider>
                <ActionSheetProvider>
                    <App/>
                </ActionSheetProvider>
            </SafeAreaProvider>
        </PaperProvider>
       
    ); //end return statement
}; //end SafeProvidedAp

registerRootComponent(AppWithProviders);


