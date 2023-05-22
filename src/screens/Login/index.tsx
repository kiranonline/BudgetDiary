import { useMemo } from 'react';
import { login } from '@app/data';
import { useTranslation } from 'react-i18next';
import { getLoginScreenStyles } from './styles';
import {
    GoogleSignin,
    statusCodes
} from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { View, Alert, SafeAreaView } from 'react-native';
import { useTheme, Button } from 'react-native-paper';

export const LoginScreen = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const { t } = useTranslation();
    const defaultStyles = useMemo(() => getLoginScreenStyles(theme), [theme]);

    const onLoginWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true
            });
            const userInfo = await GoogleSignin.signIn();
            dispatch(
                login({
                    token: userInfo?.idToken,
                    user: {
                        email: userInfo?.user?.email,
                        id: userInfo?.user?.id,
                        name: userInfo?.user?.name,
                        photo: userInfo?.user?.photo
                    }
                })
            );
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                Alert.alert(
                    t('screens.loginScreen.loginFailedTitle').toString(),
                    t(
                        'screens.loginScreen.loginCancelledDescription'
                    ).toString(),
                    [
                        {
                            text: t(
                                'screens.loginScreen.retryButtonText'
                            ).toString(),
                            onPress: onLoginWithGoogle
                        },
                        {
                            text: t(
                                'common.others.cancelButtonText'
                            ).toString(),
                            style: 'cancel'
                        }
                    ]
                );
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert(
                    t('screens.loginScreen.loginFailedTitle').toString(),
                    t(
                        'screens.loginScreen.playServiceNotAvailableDescription'
                    ).toString(),
                    [
                        {
                            text: t(
                                'common.others.cancelButtonText'
                            ).toString(),
                            style: 'cancel'
                        }
                    ]
                );
            } else {
                Alert.alert(
                    t('screens.loginScreen.loginFailedTitle').toString(),
                    t('common.errors.unknown').toString(),
                    [
                        {
                            text: t(
                                'common.others.cancelButtonText'
                            ).toString(),
                            style: 'cancel'
                        }
                    ]
                );
            }
        }
    };

    return (
        <SafeAreaView>
            <View style={defaultStyles.container}>
                <View style={defaultStyles.illustration1} />
                <View style={defaultStyles.loginButtonWrapper}>
                    <Button
                        onPress={onLoginWithGoogle}
                        style={[defaultStyles.loginButton]}
                        icon="google"
                        mode="contained"
                    >
                        {t('screens.loginScreen.loginButtonText')}
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;
