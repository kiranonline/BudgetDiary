import { StyleSheet } from 'react-native';
import { MD3Theme } from "react-native-paper";

export const getCreateMyAccountsStyles = (theme?: MD3Theme) => StyleSheet.create({
    formContainer: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 30,
        gap: 5
    },
    accountTypeRadioOption: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    saveButton: {
        marginTop: 30
    }
})
