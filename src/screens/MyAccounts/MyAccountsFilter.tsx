import { getCommonStyles } from '@app/common';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Surface, Text, useTheme, Checkbox } from 'react-native-paper';
import { getMyAccountsStyles } from './styles';
import { AccountCategoryBuilder } from '@app/builders';
import { TMyAccountCategrory } from '@app/types';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

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

    return (
        <ScrollView>
            <Surface style={[defaultStyles.filtersTitleWrapper]}>
                <Text variant="titleMedium">
                    {t(
                        'screens.playgroundScreen.myAccounts.sortFilters.filterTitle'
                    )}
                </Text>
            </Surface>
            <View style={[defaultStyles.filtersOptionsWrapper]}>
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
        </ScrollView>
    );
};

export default MyAccountsFilterScreen;
