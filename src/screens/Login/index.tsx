import { useMemo } from 'react';
import { useStore } from '@app/store';
import { getConfig } from '@app/config';
import { Button } from '@app/components';
import { useTranslation } from 'react-i18next';
import { getLoginScreenStyles } from './styles';
import { Text, View, Alert } from 'react-native';
import {
    GoogleSignin,
    statusCodes
} from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/FontAwesome';

export const LoginScreen = (): JSX.Element => {
    const { state } = useStore();
    const { t } = useTranslation();
    const styles = useMemo(
        () => getLoginScreenStyles(state.appTheme),
        [state.appTheme]
    );
    console.log(
        getConfig('WEB_GOOGLE_API_KEY'),
        getConfig('IOS_GOOGLE_API_KEY')
    );
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
            console.log(userInfo, 'userInfouserInfo');
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
                console.log(error);
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
                            size={state.appTheme?.font?.size1}
                            color={state.appTheme?.colors.primaryColor1}
                        />
                        <Text style={styles.loginButtonText}>
                            {t('screens.loginScreen.loginButtonText')}
                        </Text>
                    </>
                </Button>
            </View>

            {/* <Button
                title={'Sign in with Google'}
                onPress={() => {
                    GoogleSignin.configure({
                        iosClientId:
                            '60625034685-fgg3843cr3po6jb8q7un3f8gk5c2o81b.apps.googleusercontent.com'
                    });
                    GoogleSignin.hasPlayServices()
                        .then((hasPlayService) => {
                            if (hasPlayService) {
                                GoogleSignin.signIn()
                                    .then((userInfo) => {
                                        console.log(JSON.stringify(userInfo));
                                    })
                                    .catch((e) => {
                                        console.log(
                                            'ERROR IS: ' + JSON.stringify(e)
                                        );
                                    });
                            }
                        })
                        .catch((e) => {
                            console.log('ERROR IS: ' + JSON.stringify(e));
                        });
                }}
            /> */}
        </View>
    );
};

export default LoginScreen;
