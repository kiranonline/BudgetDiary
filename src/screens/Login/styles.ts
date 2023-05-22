import { StyleSheet } from 'react-native';
import { MD3Theme } from "react-native-paper";

export const getLoginScreenStyles = (theme?: MD3Theme) => StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: theme?.colors?.background,
        position: 'relative'
    },
    illustration1: {
        position: 'absolute',
        top: '-135%',
        left: 0,
        width: '200%',
        height: '200%',
        backgroundColor: theme?.colors?.primary,
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
        width: '60%'
    }
})