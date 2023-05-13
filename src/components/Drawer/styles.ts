import { StyleSheet } from 'react-native';
import { AppThemeStoreSlice } from '@localTypes';


export const getDrawerStyles = (theme?: AppThemeStoreSlice) => StyleSheet.create({
    drawerContainer: {
        flexDirection: 'column',
        backgroundColor: theme?.colors?.backgroundColor2,
    },
    profileSectionWrapper: {
        padding: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        borderBottomWidth: 2
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 100,
        borderColor: theme?.colors?.primaryColor1,
        borderWidth: 2
    },
    userName: {
        fontSize: theme?.font?.size1,
        color: theme?.font?.color2
    },
    options: {
        padding: 10,
        width: '100%',
        backgroundColor: 'red'
    }
})
