import { TMyAccount, TMyAccountCategrory } from '@app/types';
import { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { KeyboardAvoidingView, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getCreateMyAccountsStyles } from './styles';
import { useTranslation } from 'react-i18next';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { AccountTypeBuilder } from '@app/builders';
import { isEmpty } from 'lodash';
import { createNewMyAccount } from '@app/data';
import {
    Appbar,
    Button,
    HelperText,
    RadioButton,
    Text,
    TextInput,
    useTheme
} from 'react-native-paper';

const accountTypes = new AccountTypeBuilder();

export const CreateMyAccountsScreen = (): JSX.Element => {
    const theme = useTheme();
    const defaultStyles = useMemo(
        () => getCreateMyAccountsStyles(theme),
        [theme]
    );
    const form = useForm();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const selectedAccountType = form.watch('accountType');

    const submitForm = () => {
        form.handleSubmit(
            async (formData) => {
                try {
                    const newAccount: Omit<TMyAccount, 'id'> = {
                        name: formData?.name,
                        amount: formData?.amount,
                        accountType: formData?.accountType
                    };
                    await dispatch(createNewMyAccount(newAccount));
                    navigation.navigate('Accounts');
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
                    onPress={() => navigation.navigate('Accounts')}
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
                                        value: /^\d+(\.\d{1,2})?$/,
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
                                {accountTypes
                                    .getAllAccountTypes()
                                    .map(
                                        (
                                            accountType: TMyAccountCategrory,
                                            accountTypeIndex: number
                                        ) => (
                                            <Controller
                                                key={accountTypeIndex}
                                                name="accountType"
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message: t(
                                                            'screens.playgroundScreen.addNewAccount.formFields.accountType.validationMessages.required'
                                                        ).toString()
                                                    }
                                                }}
                                                control={form.control}
                                                render={({ field }) => (
                                                    <TouchableOpacity
                                                        ref={field.ref}
                                                        style={[
                                                            defaultStyles.accountTypeRadioOption
                                                        ]}
                                                        onPress={() => {
                                                            field.onChange(
                                                                accountType
                                                            );
                                                            field.onBlur();
                                                        }}
                                                    >
                                                        <RadioButton.Android
                                                            value={
                                                                accountType.id
                                                            }
                                                        />
                                                        <Text>
                                                            {
                                                                accountType.displayName
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
                                        form.formState?.errors?.accountType
                                    )
                                }
                            >
                                {form.formState?.errors?.accountType?.message?.toString()}
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
