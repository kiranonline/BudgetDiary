import { getConfig } from '@app/config';
import { persistor, store } from '@app/data/store';
import { Navigations } from '@app/navigations';
import { ThemeProvider } from '@app/providers';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

export const App = (): JSX.Element => {
    GoogleSignin.configure({
        iosClientId: getConfig('IOS_GOOGLE_API_KEY'),
        webClientId: getConfig('WEB_GOOGLE_API_KEY')
    });

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ThemeProvider>
                        <NavigationContainer>
                            <Navigations />
                        </NavigationContainer>
                    </ThemeProvider>
                </PersistGate>
            </Provider>
        </GestureHandlerRootView>
    );
};

export default App;
