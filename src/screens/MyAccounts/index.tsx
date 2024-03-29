import { createStackNavigator } from '@react-navigation/stack';
import CreateMyAccountsScreen from '../CreateMyAccount';
import MyAccountsScreen from './MyAccounts';

const Stack = createStackNavigator();

export const MyAccountsStackScreen = (): JSX.Element => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="MyAccounts" component={MyAccountsScreen} />
            <Stack.Screen
                name="CreateMyAccount"
                component={CreateMyAccountsScreen}
            />
        </Stack.Navigator>
    );
};

export default MyAccountsStackScreen;
