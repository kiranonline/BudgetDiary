import { StyleSheet } from 'react-native';
import { MD3Theme } from "react-native-paper";

export const getCommonStyles = (theme?: MD3Theme) => StyleSheet.create({
    fullWidth: {
        width: '100%'
    },
    displayFlex: {
        display: 'flex'
    },
    flexOne: {
        flex: 1
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    },
    justifyContentSpaceBetween: {
        justifyContent: 'space-between'
    },
    justifyContentFlexStart: {
        justifyContent: 'flex-start'
    },
    justifyContentFlexEnd: {
        justifyContent: 'flex-end'
    },
    justifyContentCenter: {
        justifyContent: 'center'
    },
    justifyContentSpaceAround: {
        justifyContent: 'space-around'
    },
    alighItemCenter: {
        alignItems: 'center'
    },
    alignItemEnd: {
        alignItems: 'flex-end'
    },
    marginAuto: {
        margin: 'auto'
    },
    pushToRight: {
        marginLeft: 'auto'
    },


    redText: {
        color: theme?.colors.error,
    },
    redBg: {
        backgroundColor: theme?.colors.error
    },
    greenText: {
        color: '#28a745'
    },
    greenBg: {
        backgroundColor: '#28a745'
    },

    p_10: {
        padding: 10
    },
    p_20: {
        padding: 20
    },
    m_t_20: {
        marginTop: 20
    }
})