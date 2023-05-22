import { StyleSheet } from 'react-native';
import { MD3Theme } from "react-native-paper";

export const getMyAccountsStyles = (theme?: MD3Theme) => StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: theme?.colors?.background
    }

})
