import { useMemo } from 'react';
import { login } from '@app/data';
import { getConfig } from '@app/config';
import { GlobalState } from '@app/types';
import { Button } from '@app/components';
import { useTranslation } from 'react-i18next';
import { getLoginScreenStyles } from './styles';
import {
    GoogleSignin,
    statusCodes
} from '@react-native-google-signin/google-signin';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View, Alert, SafeAreaView } from 'react-native';

export const LoginScreen = (): JSX.Element => {
    const dispatch = useDispatch();
    const appTheme = useSelector((state: GlobalState) => state?.appTheme);
    const { t } = useTranslation();
    const styles = useMemo(() => getLoginScreenStyles(appTheme), [appTheme]);

    const onLoginWithGoogle = async () => {
        try {
            GoogleSignin.configure({
                iosClientId: getConfig('IOS_GOOGLE_API_KEY'),
                webClientId: getConfig('WEB_GOOGLE_API_KEY')
            });
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
            // console.log(userInfo, 'userInfouserInfo');
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
                                'screens.loginScreen.cancelButtonText'
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
                                'screens.loginScreen.cancelButtonText'
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
                                'screens.loginScreen.cancelButtonText'
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
            <View style={styles.container}>
                <View style={styles.illustration1} />
                <View style={styles.loginButtonWrapper}>
                    <Button
                        onPress={onLoginWithGoogle}
                        appearance="TRANSPARENT"
                        styles={styles.loginButton}
                    >
                        <>
                            <Icon
                                name="google"
                                size={appTheme?.font?.size1}
                                color={appTheme?.colors?.primaryColor1}
                            />
                            <Text style={styles.loginButtonText}>
                                {t('screens.loginScreen.loginButtonText')}
                            </Text>
                        </>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;
