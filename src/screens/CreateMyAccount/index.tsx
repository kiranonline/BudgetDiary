import { AccountCategoryBuilder } from '@app/builders';
import { createNewMyAccount } from '@app/data';
import { TMyAccount, TMyAccountCategrory } from '@app/types';
import { useNavigation } from '@react-navigation/native';
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

import { getCreateMyAccountsStyles } from './styles';
import { getCommonStyles } from '@app/common';

const accountCategories = new AccountCategoryBuilder();

export const CreateMyAccountsScreen = (): JSX.Element => {
    const theme = useTheme();
    const commonStyles = useMemo(() => getCommonStyles(theme), [theme]);
    const defaultStyles = useMemo(
        () => getCreateMyAccountsStyles(theme),
        [theme]
    );
    const form = useForm();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const selectedAccountType = form.watch('accountCategory');

    const submitForm = () => {
        form.handleSubmit(
            async (formData) => {
                try {
                    const newAccount: Omit<TMyAccount, 'id'> = {
                        name: formData?.name,
                        amount: formData?.amount,
                        accountCategory: formData?.accountCategory
                    };
                    await dispatch(createNewMyAccount(newAccount));
                    navigation.navigate('MyAccounts');
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
                    onPress={() => navigation.navigate('MyAccounts')}
                />
                <Appbar.Content
                    title={t(
                        'screens.playgroundScreen.addNewAccount.pageTitle'
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
                        <View>
                            <Controller
                                name="amount"
                                control={form.control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: t(
                                            'screens.playgroundScreen.addNewAccount.formFields.amount.validationMessages.required'
                                        ).toString()
                                    },
                                    pattern: {
                                        value: /^[-+]?\d+(\.\d{1,2})?$/,
                                        message: t(
                                            'screens.playgroundScreen.addNewAccount.formFields.amount.validationMessages.pattern'
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
                                        keyboardType="decimal-pad"
                                        label={t(
                                            'screens.playgroundScreen.addNewAccount.formFields.amount.label'
                                        ).toString()}
                                        placeholder={t(
                                            'screens.playgroundScreen.addNewAccount.formFields.amount.placeholder'
                                        ).toString()}
                                    />
                                )}
                            />
                            <HelperText
                                type="error"
                                visible={
                                    !isEmpty(form.formState?.errors?.amount)
                                }
                            >
                                {form.formState?.errors?.amount?.message?.toString()}
                            </HelperText>
                        </View>
                        <View>
                            <RadioButton.Group
                                value={selectedAccountType?.id}
                                onValueChange={() => undefined}
                            >
                                {accountCategories
                                    .getAllAccountTypes()
                                    .map(
                                        (
                                            accountCategory: TMyAccountCategrory,
                                            accountTypeIndex: number
                                        ) => (
                                            <Controller
                                                key={accountTypeIndex}
                                                name="accountCategory"
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message: t(
                                                            'screens.playgroundScreen.addNewAccount.formFields.accountCategory.validationMessages.required'
                                                        ).toString()
                                                    }
                                                }}
                                                control={form.control}
                                                render={({ field }) => (
                                                    <TouchableOpacity
                                                        ref={field.ref}
                                                        style={[
                                                            commonStyles.row,
                                                            commonStyles.alighItemCenter,
                                                            commonStyles.justifyContentFlexStart
                                                        ]}
                                                        onPress={() => {
                                                            field.onChange(
                                                                accountCategory
                                                            );
                                                            field.onBlur();
                                                        }}
                                                    >
                                                        <RadioButton.Android
                                                            value={
                                                                accountCategory.id
                                                            }
                                                        />
                                                        <Text>
                                                            {
                                                                accountCategory.displayName
                                                            }
                                                        </Text>
                                                    </TouchableOpacity>
                                                )}
                                            />
                                        )
                                    )}
                            </RadioButton.Group>
                            <HelperText
                                type="error"
                                visible={
                                    !isEmpty(
                                        form.formState?.errors?.accountCategory
                                    )
                                }
                            >
                                {form.formState?.errors?.accountCategory?.message?.toString()}
                            </HelperText>
                        </View>
                        <Button
                            mode="contained"
                            style={[defaultStyles.saveButton]}
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

export default CreateMyAccountsScreen;
