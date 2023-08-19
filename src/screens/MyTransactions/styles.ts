import { StyleSheet } from 'react-native';
import { MD3Theme } from "react-native-paper";

export const getMyTransactionsStyles = (theme?: MD3Theme) => StyleSheet.create({
    myTransactionsScreenWrapper: {
        flex: 1,
    },
    createNewTransactionButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        borderRadius: 500
    },
    monthChangerWrapper: {
        backgroundColor: theme?.colors?.secondaryContainer,
    }
})
