import { Drawer as CustomDrawer } from '@app/components';
import { TGlobalState } from '@app/types';
import { logoutAndClear } from '@app/utils';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MyProfileScreen from '../MyProfile';
import PlaygroundScreen from '../Playground';
import SettingsStackScreen from '../Settings';

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
            <Drawer.Screen component={SettingsStackScreen} name="Settings" />
        </Drawer.Navigator>
    );
};

export default DashboardScreen;
