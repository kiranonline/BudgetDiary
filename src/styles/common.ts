import { StyleSheet } from 'react-native';
import { AppThemeStoreSlice } from '@localTypes';

export const getCommonStyles = (theme?: AppThemeStoreSlice) => StyleSheet.create({
    transparentBg: {
        backgroundColor: 'transparent'
    },
    boldText: {
        fontWeight: "500"
    }
})