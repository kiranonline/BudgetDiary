import { FC, useEffect } from 'react';
import { useStore } from '@app/store';
import { getCurrentTheme } from '@services';
import { ACTIONS } from '@app/types';

export interface Props {
    children: JSX.Element;
}

export const ThemeGuard: FC<Props> = (props: Props): JSX.Element => {
    const { children } = props;
    const { dispatch } = useStore();

    useEffect(() => {
        const currentTheme = getCurrentTheme();
        dispatch({
            type: ACTIONS.SET_APP_THEME,
            payload: currentTheme
        });
    }, []);

    return children;
};

export default ThemeGuard;
