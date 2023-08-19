import { createStackNavigator } from '@react-navigation/stack';
import MyTransactions from './MyTransactions';
import CreateMyAccountsScreen from '../CreateMyTransaction';

const Stack = createStackNavigator();

export const MyTransactionsStackScreen = (): JSX.Element => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="MyTransactions" component={MyTransactions} />
            <Stack.Screen
                name="CreateMyTransactions"
                component={CreateMyAccountsScreen}
            />
        </Stack.Navigator>
    );
};

export default MyTransactionsStackScreen;
