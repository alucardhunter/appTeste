import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import Routes from '#/Routes/Routes';
import {store,persistor} from '#/Store/storeConfig';

const App = () => {

  return (
  <SafeAreaView style={{flex:1}}>
    <Provider store={ store } >
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  </SafeAreaView>
  );
}

export default App;