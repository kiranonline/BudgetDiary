import { ThemeVariables } from '@localTypes';
import { StyleSheet } from 'react-native';

export const getButtonStyles = (theme?: ThemeVariables) => StyleSheet.create({
    buttonWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'red'
    }

})
