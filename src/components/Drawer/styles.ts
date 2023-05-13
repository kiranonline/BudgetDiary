import { StyleSheet } from 'react-native';
import { AppThemeStoreSlice } from '@localTypes';


export const getDrawerStyles = (theme?: AppThemeStoreSlice) => StyleSheet.create({
    drawerContainer: {
        flexDirection: 'column',
        backgroundColor: theme?.colors?.backgroundColor1,
    },
    profileSectionWrapper: {
        padding: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 100,
        borderColor: '#fff',
        borderWidth: 2
    },
    userName: {
        fontSize: theme?.font?.size1,
        color: theme?.colors?.primaryColor1
    }
})
