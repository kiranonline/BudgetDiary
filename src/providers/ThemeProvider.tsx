import { FC, useEffect } from 'react';
import { setAppTheme } from '@app/data';
import { useDispatch } from 'react-redux';
import { getCurrentTheme } from '@services';

interface ThemeProviderProps {
    children: JSX.Element;
}

export const ThemeProvider: FC<ThemeProviderProps> = (
    props: ThemeProviderProps
): JSX.Element => {
    const { children } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        const currentTheme = getCurrentTheme();
        dispatch(setAppTheme(currentTheme));
    }, []);

    return children;
};

export default ThemeProvider;
