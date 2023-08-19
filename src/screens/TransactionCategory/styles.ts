import { StyleSheet } from 'react-native';
import { MD3Theme } from "react-native-paper";

export const getTransactionCategoryStyles = (theme?: MD3Theme) => StyleSheet.create({
    myTransactioncategoryListWrapper: {
        flex: 1,
    },
    createtransactionCategoryButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        borderRadius: 500
    },
})
