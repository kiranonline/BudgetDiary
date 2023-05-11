import { useMemo } from 'react';
import { useStore } from '@app/store';
import { getButtonStyles } from './styles';
import { getCommonStyles } from '@app/styles/common';
import {
    GestureResponderEvent,
    TouchableOpacity,
    ViewStyle
} from 'react-native';

export interface Props {
    children: JSX.Element;
    onPress?: (event: GestureResponderEvent) => void;
    styles?: ViewStyle;
    appearance?: 'TRANSPARENT' | 'BLOCK';
}

export const Button = (props: Props): JSX.Element => {
    const {
        styles,
        onPress,
        children,
        appearance = 'TRANSPARENT',
        ...rest
    } = props;
    const { state } = useStore();
    const commonStyles = useMemo(
        () => getCommonStyles(state.appTheme),
        [state.appTheme]
    );
    const defaultStyles = useMemo(
        () => getButtonStyles(state.appTheme),
        [state.appTheme]
    );

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                defaultStyles.buttonWrapper,
                appearance === 'TRANSPARENT'
                    ? commonStyles.transparentBg
                    : null,
                styles
            ]}
        >
            {children}
        </TouchableOpacity>
    );
};

export default Button;
