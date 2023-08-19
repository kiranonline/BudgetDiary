import { StyleSheet } from 'react-native';
import { MD3Theme } from "react-native-paper";

export const getSettingsStyle = (theme?: MD3Theme) => StyleSheet.create({
    settingsListWrapper: {
        flex: 1,
    },
    settingsListItem: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        gap: 10,
        marginBottom: 0
    }
})
