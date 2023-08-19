import { getCommonStyles } from '@app/common';
import { useMemo } from 'react';
import { View } from 'react-native';
import { Appbar, Avatar, Text, useTheme } from 'react-native-paper';
import { getSettingsStyle } from './styles';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { TRANSACTION_TYPE_NAME } from '@app/types';

export const SettingsListScreen = (): JSX.Element => {
    const theme = useTheme();
    const { t } = useTranslation();
    const navigation = useNavigation();
    const commonStyles = useMemo(() => getCommonStyles(theme), [theme]);
    const defaultStyles = useMemo(() => getSettingsStyle(theme), [theme]);

    return (
        <View style={[defaultStyles.settingsListWrapper]}>
            <Appbar.Header mode="small" elevated>
                <Appbar.Action
                    icon="menu"
                    onPress={() =>
                        navigation.dispatch(DrawerActions.openDrawer())
                    }
                />
                <Appbar.Content
                    title={t(
                        'screens.playgroundScreen.settings.pageTitle'
                    ).toString()}
                />
            </Appbar.Header>
            <FlatList
                data={[
                    {
                        id: '1',
                        lable: t(
                            'screens.playgroundScreen.settings.incomeCategorySettings'
                        ).toString(),
                        icon: 'battery-charging',
                        onPress: () =>
                            navigation.navigate(
                                'Transaction-Category-settings',
                                {
                                    transactionCategoryGroup:
                                        TRANSACTION_TYPE_NAME.INCOME
                                }
                            )
                    },
                    {
                        id: '2',
                        lable: t(
                            'screens.playgroundScreen.settings.expenseCategorySettings'
                        ).toString(),
                        icon: 'battery-alert',
                        onPress: () =>
                            navigation.navigate(
                                'Transaction-Category-settings',
                                {
                                    transactionCategoryGroup:
                                        TRANSACTION_TYPE_NAME.EXPENSE
                                }
                            )
                    }
                ]}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={[
                            commonStyles.row,
                            commonStyles.alighItemCenter,
                            commonStyles.justifyContentFlexStart,
                            defaultStyles.settingsListItem
                        ]}
                        onPress={item.onPress}
                    >
                        <Avatar.Icon icon={item.icon} size={45} style={[]} />
                        <View style={[commonStyles.justifyContentSpaceAround]}>
                            <Text numberOfLines={1} variant="titleMedium">
                                {item.lable}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default SettingsListScreen;
