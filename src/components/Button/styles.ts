import { StyleSheet } from 'react-native';
import { AppThemeStoreSlice } from '@localTypes';

export const getButtonStyles = (theme?: AppThemeStoreSlice) => StyleSheet.create({
    buttonWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'red'
    }

})
