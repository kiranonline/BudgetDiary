import { GlobalState } from '@app/types';
import { useMemo, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useSelector } from 'react-redux';

import { getMyAccountsStyles } from './styles';
import { Text } from 'react-native-paper';

export const MyAccountsScreen = (): JSX.Element => {
    const { appTheme, myAccounts } = useSelector((state: GlobalState) => ({
        appTheme: state?.appTheme,
        myAccounts: state?.myAccounts
    }));
    const defaultStyles = useMemo(
        () => getMyAccountsStyles(appTheme),
        [appTheme]
    );

    return (
        <SafeAreaView>
            <View style={[defaultStyles.container]}>
                {myAccounts?.myAccounts?.map((ele, id) => (
                    <Text key={id}>{ele.name}</Text>
                ))}
            </View>
        </SafeAreaView>
    );
};

export default MyAccountsScreen;
