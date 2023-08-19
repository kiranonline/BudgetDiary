import { getCommonStyles } from '@app/common';
import { TGlobalState } from '@app/types';
import { logoutAndClear } from '@app/utils';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, View } from 'react-native';
import {
    Avatar,
    Drawer as DrawerWrapper,
    Text,
    useTheme
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { getDrawerStyles } from './styles';

export const Drawer = (props: DrawerContentComponentProps): JSX.Element => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const navigation = useNavigation();
    const appAuth = useSelector((state: TGlobalState) => state?.appAuth);
    const commonStyles = useMemo(() => getCommonStyles(theme), [theme]);
    const defaultStyles = useMemo(() => getDrawerStyles(theme), [theme]);

    const onLogout = async () => {
        try {
            logoutAndClear(dispatch);
        } catch (error) {
            Alert.alert(
                t('drawer.options.logoutFailedTitle').toString(),
                t('common.errors.unknown').toString(),
                [
                    {
                        text: t('drawer.options.retryLogout').toString(),
                        onPress: onLogout
                    },
                    {
                        text: t('common.others.cancelButtonText').toString(),
                        style: 'cancel'
                    }
                ]
            );
        }
    };

    return (
        <SafeAreaView>
            <DrawerWrapper.Section style={[defaultStyles.drawerWrapper]}>
                <View
                    style={[
                        defaultStyles.profileSectionWrapper,
                        commonStyles.p_20
                    ]}
                >
                    {appAuth?.user?.photo && (
                        <Avatar.Image source={{ uri: appAuth?.user?.photo }} />
                    )}
                    <Text variant="titleLarge">{appAuth?.user?.name}</Text>
                </View>
                <DrawerWrapper.Item
                    active
                    icon={'home'}
                    label={t('drawer.options.playground').toString()}
                    onPress={(): void =>
                        navigation.navigate('Playground' as never)
                    }
                />
                <DrawerWrapper.Item
                    icon={'account'}
                    label={t('drawer.options.myProfile').toString()}
                    onPress={(): void =>
                        navigation.navigate('Profile' as never)
                    }
                />
                <DrawerWrapper.Item
                    icon={'hammer-screwdriver'}
                    label={t('drawer.options.settings').toString()}
                    onPress={(): void =>
                        navigation.navigate('Settings' as never)
                    }
                />
                <DrawerWrapper.Item
                    icon={'logout'}
                    label={t('drawer.options.logout').toString()}
                    onPress={onLogout}
                />
                <View style={[defaultStyles.appInfo]}>
                    <Text
                        variant="labelLarge"
                        style={[defaultStyles.appVersion]}
                    >
                        Version 1.0.0
                    </Text>
                </View>
            </DrawerWrapper.Section>
        </SafeAreaView>
    );
};

export default Drawer;
