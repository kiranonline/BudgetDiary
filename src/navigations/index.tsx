import { GlobalState } from '@app/types';
import { useSelector } from 'react-redux';
import { DashboardScreen, LoginScreen } from '@app/screens';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export const Navigations = (): JSX.Element => {
    const appAuth = useSelector((state: GlobalState) => state?.appAuth);

    return (
        <Stack.Navigator>
            {appAuth?.isLoggedIn ? (
                <>
                    <Stack.Screen
                        name="Dashboard"
                        component={DashboardScreen}
                        options={{ headerShown: false }}
                    />
                </>
            ) : (
                <>
                    <Stack.Screen
                        name="SignIn"
                        component={LoginScreen}
                        options={{ headerShown: false }}
                    />
                </>
            )}
        </Stack.Navigator>
    );
};

export default Navigations;
