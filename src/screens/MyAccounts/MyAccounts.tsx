import { AccountCategoryBuilder } from '@app/builders';
import { getCommonStyles } from '@app/common';
import { deleteMyAccount } from '@app/data';
import { TGlobalState } from '@app/types';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Appbar, Avatar, Caption, FAB, Modal, Portal, Text, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import MyAccountsFilterScreen from './MyAccountsFilter';
import { getMyAccountsStyles } from './styles';
import { arrangeAccountsByCategory } from './utils';

const accountCategories = new AccountCategoryBuilder();

export const MyAccountsScreen = (): JSX.Element => {
    const theme = useTheme();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const myAccounts = useSelector((state: TGlobalState) => state?.myAccounts);
    const commonStyles = useMemo(() => getCommonStyles(theme), [theme]);
    const defaultStyles = useMemo(() => getMyAccountsStyles(theme), [theme]);
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [sortFilters, setSortFilters] = useState({
        sortOrder: 1,
        allowedCategories: accountCategories.getAllAccountTypes()
    });
    const filteredData = useMemo(
        () =>
            arrangeAccountsByCategory(
                myAccounts?.myAccounts,
                sortFilters.allowedCategories,
                sortFilters.sortOrder
            ),
        [sortFilters, myAccounts?.myAccounts]
    );

    const onDeleteMyAccountPress = (accountId: string) => {
        Alert.alert(
            t(
                'screens.playgroundScreen.myAccounts.confirmDelete.title'
            ).toString(),
            t(
                'screens.playgroundScreen.myAccounts.confirmDelete.description'
            ).toString(),
            [
                {
                    text: t(
                        'screens.playgroundScreen.myAccounts.confirmDelete.confirmButtonText'
                    ).toString(),
                    onPress: () => dispatch(deleteMyAccount(accountId))
                },
                {
                    text: t('common.others.cancelButtonText').toString(),
                    style: 'cancel'
                }
            ]
        );
    };

    return (
        <View style={[defaultStyles.myAccountListWrapper]}>
            <Appbar.Header mode="small" elevated>
                <Appbar.Action
                    icon="menu"
                    onPress={() =>
                        navigation.dispatch(DrawerActions.openDrawer())
                    }
                />
                <Appbar.Content
                    title={t(
                        'screens.playgroundScreen.myAccounts.pageTitle'
                    ).toString()}
                />
                <Appbar.Action
                    icon={
                        sortFilters?.sortOrder === 1
                            ? 'sort-ascending'
                            : 'sort-descending'
                    }
                    onPress={() =>
                        setSortFilters((oldSortFilters) => ({
                            ...oldSortFilters,
                            sortOrder: oldSortFilters.sortOrder * -1
                        }))
                    }
                />
                <Appbar.Action
                    icon="filter-menu"
                    onPress={() => setIsFilterModalVisible(true)}
                />
            </Appbar.Header>
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <View>
                        {filteredData[index]?.accountCategory?.id !==
                            filteredData[index - 1]?.accountCategory?.id && (
                            <View style={[defaultStyles.accountGroupTitle]}>
                                <Text variant="titleSmall">
                                    {
                                        filteredData[index]?.accountCategory
                                            ?.displayName
                                    }
                                </Text>
                            </View>
                        )}
                        <View
                            style={[
                                commonStyles.row,
                                commonStyles.alighItemCenter,
                                commonStyles.justifyContentFlexStart,
                                defaultStyles.myAccountListItemWrapper,
                                !!(
                                    index ===
                                    Number(myAccounts?.myAccounts?.length) - 1
                                )
                                    ? { marginBottom: 80 }
                                    : {}
                            ]}
                        >
                            <Avatar.Icon
                                size={45}
                                icon={item?.accountCategory?.icon}
                                style={[
                                    Number(item.amount) < 0
                                        ? commonStyles.redBg
                                        : commonStyles.greenBg
                                ]}
                            />
                            <View
                                style={[commonStyles.justifyContentSpaceAround]}
                            >
                                <Text numberOfLines={1} variant="titleMedium">
                                    {item.name}
                                </Text>
                                <View
                                    style={[
                                        commonStyles.row,
                                        commonStyles.alighItemCenter,
                                        defaultStyles.myAccountListItemDescription
                                    ]}
                                >
                                    <Text
                                        variant="titleSmall"
                                        style={[
                                            Number(item.amount) < 0
                                                ? commonStyles.redText
                                                : commonStyles.greenText
                                        ]}
                                    >
                                        {item.amount}
                                    </Text>
                                    <Caption>
                                        {item?.accountCategory?.displayName}
                                    </Caption>
                                </View>
                            </View>
                            <View
                                style={[
                                    commonStyles.pushToRight,
                                    commonStyles.row,
                                    defaultStyles.myAccountListItemActionWrapper
                                ]}
                            >
                                <TouchableOpacity
                                    hitSlop={10}
                                    onPress={() =>
                                        navigation.navigate('CreateMyAccount', {
                                            account: item
                                        })
                                    }
                                >
                                    <Avatar.Icon size={35} icon="lead-pencil" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    hitSlop={10}
                                    onPress={() =>
                                        onDeleteMyAccountPress(item.id)
                                    }
                                >
                                    <Avatar.Icon
                                        size={35}
                                        icon="delete"
                                        style={[commonStyles.redBg]}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            />
            <FAB
                icon="plus"
                style={defaultStyles.createNewAccountButton}
                onPress={() => navigation.navigate('CreateMyAccount' as never)}
            />
            <Portal>
                <Modal
                    visible={isFilterModalVisible}
                    contentContainerStyle={[defaultStyles.filterModalWrapper]}
                    onDismiss={() => setIsFilterModalVisible(false)}
                >
                    <MyAccountsFilterScreen
                        setSortFilters={setSortFilters}
                        allowedCategories={sortFilters.allowedCategories}
                    />
                </Modal>
            </Portal>
        </View>
    );
};

export default MyAccountsScreen;
