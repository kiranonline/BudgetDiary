import { useMemo } from 'react';
import { GlobalState } from '@app/types';
import { useSelector } from 'react-redux';
import { getDrawerStyles } from './styles';
import { getCommonStyles } from '@app/styles/common';
import { Image, View, ScrollView, Text } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

export const Drawer = (props: DrawerContentComponentProps): JSX.Element => {
    const { appTheme, appAuth } = useSelector((state: GlobalState) => ({
        appTheme: state?.appTheme,
        appAuth: state?.appAuth
    }));
    const commonStyles = useMemo(() => getCommonStyles(appTheme), [appTheme]);
    const defaultStyles = useMemo(() => getDrawerStyles(appTheme), [appTheme]);

    return (
        <ScrollView style={[defaultStyles.drawerContainer]}>
            <View style={[defaultStyles.profileSectionWrapper]}>
                {appAuth?.user?.photo && (
                    <Image
                        alt="avatar"
                        source={{ uri: appAuth?.user?.photo }}
                        style={[defaultStyles?.profileImage]}
                    />
                )}
                <Text style={[defaultStyles?.userName, commonStyles?.boldText]}>
                    {appAuth?.user?.name}
                </Text>
            </View>
        </ScrollView>
    );
};

export default Drawer;
