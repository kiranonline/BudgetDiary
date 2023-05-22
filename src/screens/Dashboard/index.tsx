import PlaygroundScreen from '../Playground';
import { useEffect } from 'react';
import MyProfileScreen from '../MyProfile';
import { logoutAndClear } from '@app/utils';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer as CustomDrawer } from '@app/components';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { TGlobalState } from '@app/types';
import CreateMyAccountsScreen from '../CreateMyAccount';

const Drawer = createDrawerNavigator();

export const DashboardScreen = (): JSX.Element => {
    const dispatch = useDispatch();
    const appAuth = useSelector((state: TGlobalState) => state?.appAuth);

    useEffect(() => {
        syncUserInfoWithServer();
    }, []);

    const syncUserInfoWithServer = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            if (userInfo?.user?.id !== appAuth?.user?.id) {
                logoutAndClear(dispatch);
            }
        } catch (error) {
            console.log(error);
            logoutAndClear(dispatch);
        }
    };

    return (
        <Drawer.Navigator
            initialRouteName="Playground"
            drawerContent={CustomDrawer}
            screenOptions={{
                headerShown: false
            }}
        >
            <Drawer.Screen component={PlaygroundScreen} name="Playground" />
            <Drawer.Screen component={MyProfileScreen} name="Profile" />
            <Drawer.Screen component={CreateMyAccountsScreen} name="Test" />
        </Drawer.Navigator>
    );
};

export default DashboardScreen;
