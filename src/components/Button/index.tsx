import {
    GestureResponderEvent,
    TouchableOpacity,
    ViewStyle
} from 'react-native';
import { useMemo } from 'react';
import { GlobalState } from '@app/types';
import { useSelector } from 'react-redux';
import { getButtonStyles } from './styles';
import { getCommonStyles } from '@app/styles/common';

interface Props {
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
    const appTheme = useSelector((state: GlobalState) => state?.appTheme);
    const commonStyles = useMemo(() => getCommonStyles(appTheme), [appTheme]);
    const defaultStyles = useMemo(() => getButtonStyles(appTheme), [appTheme]);

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
