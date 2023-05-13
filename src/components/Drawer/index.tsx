import { useMemo } from 'react';
import { logout } from '@app/data';
import { GlobalState } from '@app/types';
import { getDrawerStyles } from './styles';
import { useTranslation } from 'react-i18next';
import { getCommonStyles } from '@app/styles/common';
import { useDispatch, useSelector } from 'react-redux';
import { Image, View, Text } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import {
    FlatList,
    ScrollView,
    TouchableHighlight
} from 'react-native-gesture-handler';

export const Drawer = (props: DrawerContentComponentProps): JSX.Element => {
    const { appTheme, appAuth } = useSelector((state: GlobalState) => ({
        appTheme: state?.appTheme,
        appAuth: state?.appAuth
    }));
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const commonStyles = useMemo(() => getCommonStyles(appTheme), [appTheme]);
    const defaultStyles = useMemo(() => getDrawerStyles(appTheme), [appTheme]);

    return (
        <View style={[defaultStyles.drawerContainer]}>
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
            <FlatList
                data={[
                    {
                        title: t('drawer.options.logout').toString(),
                        onPress: () => {
                            dispatch(logout());
                        }
                    }
                ]}
                renderItem={({ index, item }) => (
                    <TouchableHighlight
                        onPress={item?.onPress}
                        style={[defaultStyles.options]}
                    >
                        <Text key={index}>{item?.title}</Text>
                    </TouchableHighlight>
                )}
            />
        </View>
    );
};

export default Drawer;
