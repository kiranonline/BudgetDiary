import { StyleSheet } from 'react-native';
import { MD3Theme } from "react-native-paper";


export const getDrawerStyles = (theme?: MD3Theme) => StyleSheet.create({
    drawerWrapper: {
        height: '100%'
    },
    profileSectionWrapper: {
        padding: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    appInfo: {
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
        bottom: 30
    },
    appVersion: {
        textAlign: 'center'
    }
})
