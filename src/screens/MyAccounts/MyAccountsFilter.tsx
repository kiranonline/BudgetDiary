import { AccountCategoryBuilder } from '@app/builders';
import { getCommonStyles } from '@app/common';
import { TMyAccountCategrory } from '@app/types';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Checkbox, Surface, Text, useTheme } from 'react-native-paper';

import { getMyAccountsStyles } from './styles';

const accountCategories = new AccountCategoryBuilder();

export interface TMyAccountsFilterScreenProps {
    setSortFilters: Function;
    allowedCategories: TMyAccountCategrory[];
}

export const MyAccountsFilterScreen: FC<TMyAccountsFilterScreenProps> = (
    props: TMyAccountsFilterScreenProps
): JSX.Element => {
    const { allowedCategories, setSortFilters } = props;
    const theme = useTheme();
    const { t } = useTranslation();
    const commonStyles = useMemo(() => getCommonStyles(theme), [theme]);
    const defaultStyles = useMemo(() => getMyAccountsStyles(theme), [theme]);

    const selectAll = () =>
        setSortFilters((oldSortFilters) => ({
            ...oldSortFilters,
            allowedCategories: accountCategories.getAllAccountTypes()
        }));
    const deSelectAll = () =>
        setSortFilters((oldSortFilters) => ({
            ...oldSortFilters,
            allowedCategories: []
        }));

    return (
        <ScrollView>
            <Surface
                style={[defaultStyles.filtersTitleWrapper, commonStyles.p_10]}
            >
                <Text variant="titleMedium">
                    {t(
                        'screens.playgroundScreen.myAccounts.sortFilters.filterTitle'
                    )}
                </Text>
            </Surface>
            <View
                style={[defaultStyles.filtersOptionsWrapper, commonStyles.p_20]}
            >
                {accountCategories
                    .getAllAccountTypes()
                    .map(
                        (
                            accountCategory: TMyAccountCategrory,
                            accountTypeIndex: number
                        ) => (
                            <TouchableOpacity
                                key={accountTypeIndex}
                                style={[
                                    commonStyles.row,
                                    commonStyles.alighItemCenter,
                                    commonStyles.justifyContentFlexStart
                                ]}
                                onPress={() => {
                                    setSortFilters((oldSortFilters) => ({
                                        ...oldSortFilters,
                                        allowedCategories:
                                            oldSortFilters.allowedCategories.find(
                                                (allowedCategory) =>
                                                    allowedCategory.id ===
                                                    accountCategory.id
                                            )
                                                ? oldSortFilters.allowedCategories.filter(
                                                      (allowedCategory) =>
                                                          allowedCategory.id !==
                                                          accountCategory.id
                                                  )
                                                : [
                                                      ...oldSortFilters.allowedCategories,
                                                      accountCategory
                                                  ]
                                    }));
                                }}
                            >
                                <Checkbox.Android
                                    status={
                                        allowedCategories.find(
                                            (allowedCategory) =>
                                                allowedCategory.id ===
                                                accountCategory.id
                                        )
                                            ? 'checked'
                                            : 'unchecked'
                                    }
                                />
                                <Text>{accountCategory.displayName}</Text>
                            </TouchableOpacity>
                        )
                    )}
            </View>
            <Surface style={[commonStyles.p_10]}>
                <View
                    style={[
                        commonStyles.row,
                        commonStyles.alighItemCenter,
                        commonStyles.justifyContentFlexEnd
                    ]}
                >
                    <Button mode="text" onPress={selectAll}>
                        {t(
                            'screens.playgroundScreen.myAccounts.sortFilters.selectAll'
                        )}
                    </Button>
                    <Button mode="text" onPress={deSelectAll}>
                        {t(
                            'screens.playgroundScreen.myAccounts.sortFilters.deselectAll'
                        )}
                    </Button>
                </View>
            </Surface>
        </ScrollView>
    );
};

export default MyAccountsFilterScreen;
