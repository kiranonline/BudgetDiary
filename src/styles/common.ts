import { StyleSheet } from 'react-native';
import { ThemeVariables } from '@localTypes';

export const getCommonStyles = (theme?: ThemeVariables) => StyleSheet.create({
    transparentBg: {
        backgroundColor: 'transparent'
    }
})