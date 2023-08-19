import MyAccountsFilterScreen from './MyAccountsFilter';
import { arrangeAccountsByCategory } from './utils';
import { AccountCategoryBuilder } from '@app/builders';
import { getCommonStyles } from '@app/common';
import { deleteMyAccount } from '@app/data';
import { TGlobalState } from '@app/types';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import moment from 'moment';
import {
    FlatList,
    ScrollView,
    TouchableOpacity
} from 'react-native-gesture-handler';
import {
    Appbar,
    IconButton,
    Caption,
    FAB,
    Modal,
    Portal,
    Text,
    useTheme
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { getMyTransactionsStyles } from './styles';

export const MyTransactions = (): JSX.Element => {
    const theme = useTheme();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const myAccounts = useSelector((state: TGlobalState) => state?.myAccounts);
    const [viewProps, setViewProps] = useState({
        viewType: 'monthly',
        relativeMonthIndex: 0
    });
    const commonStyles = useMemo(() => getCommonStyles(theme), [theme]);
    const defaultStyles = useMemo(
        () => getMyTransactionsStyles(theme),
        [theme]
    );

    const moveToPreviousMonth = () =>
        setViewProps((oldViewProps) => ({
            ...oldViewProps,
            relativeMonthIndex: oldViewProps.relativeMonthIndex - 1
        }));
    const moveToNextMonth = () =>
        setViewProps((oldViewProps) => ({
            ...oldViewProps,
            relativeMonthIndex: oldViewProps.relativeMonthIndex + 1
        }));

    return (
        <View style={[defaultStyles.myTransactionsScreenWrapper]}>
            <Appbar.Header mode="small" elevated>
                <Appbar.Action
                    icon="menu"
                    onPress={() =>
                        navigation.dispatch(DrawerActions.openDrawer())
                    }
                />
                <Appbar.Content
                    title={t(
                        'screens.playgroundScreen.myTransactions.pageTitle'
                    ).toString()}
                />
            </Appbar.Header>
            <View
                style={[
                    commonStyles.row,
                    commonStyles.justifyContentSpaceBetween,
                    commonStyles.alighItemCenter,
                    defaultStyles.monthChangerWrapper
                ]}
            >
                <IconButton
                    icon="step-backward"
                    onPress={moveToPreviousMonth}
                />
                <Text variant="labelLarge">
                    {moment()
                        .add(viewProps.relativeMonthIndex, 'month')
                        .format('MMMM YYYY')}
                </Text>
                <IconButton icon="step-forward" onPress={moveToNextMonth} />
            </View>
            <ScrollView>
                <Text>Hi</Text>
            </ScrollView>
            <FAB
                icon="plus"
                style={defaultStyles.createNewTransactionButton}
                onPress={() =>
                    navigation.navigate('CreateMyTransactions' as never)
                }
            />
        </View>
    );
};

export default MyTransactions;
