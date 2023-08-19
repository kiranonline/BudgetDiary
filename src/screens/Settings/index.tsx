import { createStackNavigator } from '@react-navigation/stack';
import SettingsListScreen from './SettingsList';
import {
    MyTransactionCategoryScreen,
    CreateTransactionCategoryScreen
} from '@app/screens';

const Stack = createStackNavigator();

export const SettingsStackScreen = (): JSX.Element => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="SettingsList"
        >
            <Stack.Screen name="SettingsList" component={SettingsListScreen} />
            <Stack.Screen
                name="Transaction-Category-settings"
                component={MyTransactionCategoryScreen}
            />
            <Stack.Screen
                name="CreateTransactioncategory"
                component={CreateTransactionCategoryScreen}
            />
        </Stack.Navigator>
    );
};

export default SettingsStackScreen;
