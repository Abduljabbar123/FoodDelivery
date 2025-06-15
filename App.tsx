import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LogBox} from 'react-native';
import {ThemeProvider} from './theme/ThemeProvider';
import AppNavigation from './navigations/AppNavigation';
import {Provider} from 'react-redux';
import {persistor, store} from './Redux/ConfigureStore';
import {PersistGate} from 'redux-persist/integration/react';
import Snackbar from './components/Snackbar';
import AuthNavigation from './navigations/AuthNavigation';
import AppContainer from './navigations/AppContainer';

//Ignore all log notifications
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <SafeAreaProvider>
            <AppContainer />
          </SafeAreaProvider>
        </ThemeProvider>
        <Snackbar />
      </PersistGate>
    </Provider>
  );
}
