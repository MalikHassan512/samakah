import React from 'react';
import AppNavigation from './src/Navigation/Main';
import {Provider} from 'react-redux';
import {store, persistor} from './src/Redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {PaperProvider} from 'react-native-paper';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider>
          <AppNavigation />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
