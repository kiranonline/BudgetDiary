import { AccountCategoryBuilder } from '@app/builders';
import { getCommonStyles } from '@app/common';
import {
    createTransactionCategory,
    updateTransactionCategory,
    deleteTransactionCategory
} from '@app/data';
import {
    TMyAccount,
    TMyAccountCategrory,
    TRANSACTION_CATEGORY_TYPE_NAME,
    TTransactionCategrory
} from '@app/types';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { isEmpty } from 'lodash';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
    Appbar,
    Button,
    HelperText,
    RadioButton,
    Text,
    TextInput,
    useTheme
} from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { getCreateMyTransactionCategoryStyles } from './styles';

export const CreateTransactionCategoryScreen = (): JSX.Element => {
    const theme = useTheme();
    const route = useRoute();
    const commonStyles = useMemo(() => getCommonStyles(theme), [theme]);
    const defaultStyles = useMemo(
        () => getCreateMyTransactionCategoryStyles(theme),
        [theme]
    );
    const form = useForm({
        defaultValues: route?.params?.transactionCategory
    });
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const submitForm = () => {
        form.handleSubmit(
            async (formData) => {
                try {
                    if (route?.params?.transactionCategory?.id) {
                        // const updateAccountPayload: TMyAccount = {
                        //     id: route?.params?.account?.id,
                        //     name: formData?.name,
                        //     amount: formData?.amount,
                        //     accountCategory: formData?.accountCategory
                        // };
                        // await dispatch(updateMyAccount(updateAccountPayload));
                    } else {
                        console.log('1111111............');
                        const newTransactionCategory: Omit<
                            TTransactionCategrory,
                            'id'
                        > = {
                            name: formData?.name,
                            type: route?.params?.transactionCategoryType,
                            group: route?.params?.transactionCategoryGroup
                        };
                        if (
                            route?.params?.transactionCategoryType ===
                                TRANSACTION_CATEGORY_TYPE_NAME.SUB_CATEGORY &&
                            route?.params?.rootTransactionCategory?.id
                        ) {
                            newTransactionCategory.rootCategoryId =
                                route?.params?.rootTransactionCategory?.id;
                        } else {
                            newTransactionCategory.type =
                                TRANSACTION_CATEGORY_TYPE_NAME.ROOT_CATEGORY;
                        }
                        console.log(
                            newTransactionCategory,
                            'newTransactionCategory'
                        );
                        await dispatch(
                            createTransactionCategory(newTransactionCategory)
                        );
                    }
                    navigation.navigate('Transaction-Category-settings', {
                        transactionCategoryGroup:
                            route?.params?.transactionCategoryGroup
                    });
                } catch (error) {
                    console.log('Errors', error);
                } finally {
                }
            },
            (formErrors) => console.log('Form submited with errors', formErrors)
        )();
    };

    return (
        <View>
            <Appbar.Header mode="small" elevated>
                <Appbar.BackAction
                    onPress={() =>
                        navigation.navigate('Transaction-Category-settings', {
                            transactionCategoryGroup:
                                route?.params?.transactionCategoryGroup
                        })
                    }
                />
                <Appbar.Content
                    title={t(
                        route?.params?.account?.id
                            ? 'screens.playgroundScreen.createTransactionCategory.updateAccountTitle'
                            : 'screens.playgroundScreen.createTransactionCategory.pageTitle',
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
            </Appbar.Header>

            <KeyboardAvoidingView>
                <ScrollView>
                    <View style={[defaultStyles.formContainer]}>
                        <View>
                            <Controller
                                name="name"
                                control={form.control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: t(
                                            'screens.playgroundScreen.addNewAccount.formFields.name.validationMessages.required'
                                        ).toString()
                                    }
                                }}
                                render={({ field }) => (
                                    <TextInput
                                        ref={field.ref}
                                        mode="outlined"
                                        value={field.value}
                                        onBlur={field.onBlur}
                                        onChangeText={field.onChange}
                                        label={t(
                                            'screens.playgroundScreen.addNewAccount.formFields.name.label'
                                        ).toString()}
                                        placeholder={t(
                                            'screens.playgroundScreen.addNewAccount.formFields.name.placeholder'
                                        ).toString()}
                                    />
                                )}
                            />
                            <HelperText
                                type="error"
                                visible={!isEmpty(form.formState?.errors?.name)}
                            >
                                {form.formState?.errors?.name?.message?.toString()}
                            </HelperText>
                        </View>
                        <Button
                            mode="contained"
                            style={[commonStyles.m_t_20]}
                            onPress={submitForm}
                        >
                            {t(
                                'screens.playgroundScreen.addNewAccount.formFields.saveButtontext'
                            ).toString()}
                        </Button>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default CreateTransactionCategoryScreen;
