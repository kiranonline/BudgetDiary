import { StyleSheet } from 'react-native';
import { MD3Theme } from "react-native-paper";

export const getMyAccountsStyles = (theme?: MD3Theme) => StyleSheet.create({
    myAccountListWrapper: {
        flex: 1,
    },
    accountGroupTitle: {
        paddingLeft: 13,
        paddingTop: 25
    },
    createNewAccountButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        borderRadius: 500
    },
    myAccountListItemWrapper: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        gap: 10,
        marginBottom: 0
    },
    myAccountListItemDescription: {
        gap: 8,
    },
    myAccountListItemActionWrapper: {
        gap: 8
    },
    filterModalWrapper: {
        width: '80%',
        marginHorizontal: '10%',
        backgroundColor: '#fff',
        justifyContent: 'flex-start'
    },
    filtersTitleWrapper: {

    },
    filtersOptionsWrapper: {

    }
})
