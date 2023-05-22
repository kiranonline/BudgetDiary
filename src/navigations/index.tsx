import { TGlobalState } from '@app/types';
import { useSelector } from 'react-redux';
import { LoginScreen, DashboardScreen } from '@app/screens';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export const Navigations = (): JSX.Element => {
    const appAuth = useSelector((state: TGlobalState) => state?.appAuth);

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            {appAuth?.isLoggedIn ? (
                <>
                    <Stack.Screen
                        name="Dashboard"
                        component={DashboardScreen}
                    />
                </>
            ) : (
                <>
                    <Stack.Screen name="SignIn" component={LoginScreen} />
                </>
            )}
        </Stack.Navigator>
    );
};

export default Navigations;
