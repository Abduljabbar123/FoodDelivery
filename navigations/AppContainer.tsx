import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LogBox} from 'react-native';
import AppNavigation from './AppNavigation';
import AuthNavigation from './AuthNavigation';
import {useAppSelector} from '../Helper/Hooks/reduxHooks';

//Ignore all log notifications
LogBox.ignoreAllLogs();

export default function AppContainer() {
  const {user, token} = useAppSelector(state => state.auth);

  const data = null;
  console.log('user =====>', user);
  console.log('user =====>', token);
  return (
    <SafeAreaProvider>
      {user && token ? <AppNavigation /> : <AuthNavigation />}
    </SafeAreaProvider>
  );
}
