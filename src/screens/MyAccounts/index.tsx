import { createStackNavigator } from '@react-navigation/stack';
import CreateMyAccountsScreen from '../CreateMyAccount';
import MyAccountsScreen from './MyAccounts';
import { FC } from 'react';

const Stack = createStackNavigator();

export const MyAccountsScreenStack = (): JSX.Element => {
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

export default MyAccountsScreenStack;
