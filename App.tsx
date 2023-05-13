import { Provider } from 'react-redux';
import { Navigations } from '@app/navigations';
import { ThemeProvider } from '@app/providers';
import { persistor, store } from '@app/data/store';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';

export const App = (): JSX.Element => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <ThemeProvider>
                        <Navigations />
                    </ThemeProvider>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
};

export default App;
