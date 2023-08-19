import { getCommonStyles } from '@app/common';
import { deleteMyAccount } from '@app/data';
import { TGlobalState, TRANSACTION_CATEGORY_TYPE_NAME } from '@app/types';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { CreateTransactionCategoryScreen } from '@app/screens';
import {
    Appbar,
    Avatar,
    Caption,
    FAB,
    Modal,
    Portal,
    Text,
    useTheme,
    List
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { getTransactionCategoryStyles } from './styles';

export const MyTransactionCategoryScreen = (): JSX.Element => {
    const theme = useTheme();
    const route = useRoute();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const transactionCategories = useSelector(
        (state: TGlobalState) => state?.transactionCategories
    );
    const commonStyles = useMemo(() => getCommonStyles(theme), [theme]);
    const defaultStyles = useMemo(
        () => getTransactionCategoryStyles(theme),
        [theme]
    );

    // const onDeleteMyAccountPress = (accountId: string) => {
    //     Alert.alert(
    //         t(
    //             'screens.playgroundScreen.myAccounts.confirmDelete.title'
    //         ).toString(),
    //         t(
    //             'screens.playgroundScreen.myAccounts.confirmDelete.description'
    //         ).toString(),
    //         [
    //             {
    //                 text: t(
    //                     'screens.playgroundScreen.myAccounts.confirmDelete.confirmButtonText'
    //                 ).toString(),
    //                 onPress: () => dispatch(deleteMyAccount(accountId))
    //             },
    //             {
    //                 text: t('common.others.cancelButtonText').toString(),
    //                 style: 'cancel'
    //             }
    //         ]
    //     );
    // };
    console.log(transactionCategories, 'transactionCategories');
    return (
        <View style={[defaultStyles.myTransactioncategoryListWrapper]}>
            <Appbar.Header mode="small" elevated>
                <Appbar.BackAction
                    onPress={() => navigation.navigate('SettingsList' as never)}
                />
                <Appbar.Content
                    title={t(
                        'screens.playgroundScreen.transactionCategory.pageTitle',
                        {
                            transactionCategoryGroup:
                                route?.params?.transactionCategoryGroup
                                    .charAt(0)
                                    .toUpperCase() +
                                route?.params?.transactionCategoryGroup
                                    .slice(1)
                                    .toLowerCase()
                        }
                    ).toString()}
                />
                {/* <Appbar.Action icon="add" onPress={() => {}} /> */}
            </Appbar.Header>
            <FlatList
                data={transactionCategories?.transactionCategories}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <View key={index}>
                        <List.Accordion title={item.name}>
                            {item.subCategories?.map?.(
                                (subCategory, index2) => (
                                    <List.Item
                                        key={index2}
                                        title={subCategory.name}
                                    />
                                )
                            )}
                            <List.Item
                                left={(props) => (
                                    <List.Icon {...props} icon="plus-circle" />
                                )}
                                title="Add sub category"
                                onPress={() =>
                                    navigation.navigate(
                                        'CreateTransactioncategory',
                                        {
                                            transactionCategoryGroup:
                                                route?.params
                                                    ?.transactionCategoryGroup,
                                            transactionCategoryType:
                                                TRANSACTION_CATEGORY_TYPE_NAME.SUB_CATEGORY,
                                            rootTransactionCategory: item
                                        }
                                    )
                                }
                            />
                        </List.Accordion>
                    </View>
                )}
            />
            <FAB
                icon="plus"
                style={defaultStyles.createtransactionCategoryButton}
                onPress={() =>
                    navigation.navigate('CreateTransactioncategory', {
                        transactionCategoryGroup:
                            route?.params?.transactionCategoryGroup,
                        transactionCategoryType:
                            TRANSACTION_CATEGORY_TYPE_NAME.ROOT_CATEGORY
                    })
                }
            />
        </View>
    );
};

export default MyTransactionCategoryScreen;
