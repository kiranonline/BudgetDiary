import CreateMyAccountsScreen from '@app/screens/CreateMyAccount';
import MyAccountsScreen from '@app/screens/MyAccounts';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { BottomNavigation } from 'react-native-paper';

const Tab = createBottomTabNavigator();

export const PlaygroundScreen = (): JSX.Element => {
    const { t } = useTranslation();
    return (
        <Tab.Navigator
            initialRouteName="Accounts"
            screenOptions={{
                headerShown: false
            }}
            tabBar={({ navigation, state, descriptors, insets }) => (
                <BottomNavigation.Bar
                    navigationState={state}
                    safeAreaInsets={insets}
                    onTabPress={({ route, preventDefault }) => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true
                        });

                        if (event.defaultPrevented) {
                            preventDefault();
                        } else {
                            navigation.dispatch({
                                ...CommonActions.navigate(
                                    route.name,
                                    route.params
                                ),
                                target: state.key
                            });
                        }
                    }}
                    renderIcon={({ route, focused, color }) => {
                        const { options } = descriptors[route.key];
                        if (options.tabBarIcon) {
                            return options.tabBarIcon({
                                focused,
                                color,
                                size: 24
                            });
                        }

                        return null;
                    }}
                    getLabelText={({ route }) => {
                        const { options } = descriptors[route.key];
                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                ? options.title
                                : route.title;

                        return label;
                    }}
                />
            )}
        >
            <Tab.Screen
                name="Accounts"
                component={MyAccountsScreen}
                options={{
                    title: t(
                        'screens.playgroundScreen.tabs.myAccountsLabel'
                    ).toString(),
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="cash" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name="CreateAccounts"
                component={CreateMyAccountsScreen}
                options={{
                    title: t(
                        'screens.playgroundScreen.tabs.createMyAccountsLabel'
                    ).toString(),
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="plus" color={color} size={size} />
                    )
                }}
            />
        </Tab.Navigator>
    );
};

export default PlaygroundScreen;
