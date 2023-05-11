import { LoginScreen } from '@screens';
import { ThemeGuard } from '@app/guards';
import { StoreProvider } from '@app/store';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

export const App = (): JSX.Element => {
    return (
        <NavigationContainer>
            <StoreProvider>
                <ThemeGuard>
                    <SafeAreaView>
                        <LoginScreen />
                    </SafeAreaView>
                </ThemeGuard>
            </StoreProvider>
        </NavigationContainer>
    );
};

export default App;
