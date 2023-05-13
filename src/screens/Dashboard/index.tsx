import HomeScreen from '../Home';
import { Drawer as CustomDrawer } from '@app/components';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export const DashboardScreen = (): JSX.Element => {
    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={CustomDrawer}>
            <Drawer.Screen component={HomeScreen} name="Home" />
        </Drawer.Navigator>
    );
};

export default DashboardScreen;
