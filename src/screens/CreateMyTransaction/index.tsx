import { AccountCategoryBuilder } from '@app/builders';
import { getCommonStyles } from '@app/common';
import { createNewMyAccount, updateMyAccount } from '@app/data';
import { TMyAccount, TMyAccountCategrory } from '@app/types';
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

import { getCreateMyTransactionStyles } from './styles';

export const CreateMyTransactionScreen = (): JSX.Element => {
    const theme = useTheme();
    const route = useRoute();
    const commonStyles = useMemo(() => getCommonStyles(theme), [theme]);
    const defaultStyles = useMemo(
        () => getCreateMyTransactionStyles(theme),
        [theme]
    );
    const form = useForm({
        defaultValues: route?.params?.transaction
    });
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const selectedAccountType = form.watch('accountCategory');

    const submitForm = () => {
        form.handleSubmit(
            async (formData) => {
                try {
                    // if (route?.params?.account?.id) {
                    //     const updateAccountPayload: TMyAccount = {
                    //         id: route?.params?.account?.id,
                    //         name: formData?.name,
                    //         amount: formData?.amount,
                    //         accountCategory: formData?.accountCategory
                    //     };
                    //     await dispatch(updateMyAccount(updateAccountPayload));
                    // } else {
                    //     const newAccount: Omit<TMyAccount, 'id'> = {
                    //         name: formData?.name,
                    //         amount: formData?.amount,
                    //         accountCategory: formData?.accountCategory
                    //     };
                    //     await dispatch(createNewMyAccount(newAccount));
                    // }
                    // navigation.navigate('MyAccounts');
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
                        navigation.navigate('MyTransactions' as never)
                    }
                />
                <Appbar.Content
                    title={t(
                        route?.params?.account?.id
                            ? 'screens.playgroundScreen.addNewTransaction.updateAccountTitle'
                            : 'screens.playgroundScreen.addNewTransaction.pageTitle'
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

export default CreateMyTransactionScreen;
