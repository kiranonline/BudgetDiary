import { AppThemeStoreSlice } from '@localTypes';
import { StyleSheet } from 'react-native';

export const getLoginScreenStyles = (theme?: AppThemeStoreSlice) => StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: theme?.colors?.backgroundColor1,
        position: 'relative'
    },
    illustration1: {
        position: 'absolute',
        top: '-135%',
        left: 0,
        width: '200%',
        height: '200%',
        backgroundColor: theme?.colors?.primaryColor1,
        borderRadius: 700
    },
    loginButtonWrapper: {
        position: 'absolute',
        bottom: 90,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButton: {
        gap: 10,
        width: '70%',
        borderWidth: 3,
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        borderColor: theme?.colors?.primaryColor1,
    },
    loginButtonText: {
        fontSize: theme?.font?.size1,
        color: '#fff'
    }
})