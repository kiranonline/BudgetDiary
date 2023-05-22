import { PaperProvider } from 'react-native-paper';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { TGlobalState } from '@app/types';

interface TThemeProviderProps {
    children: JSX.Element;
}

export const ThemeProvider: FC<TThemeProviderProps> = (
    props: TThemeProviderProps
): JSX.Element => {
    const { children } = props;
    const appTheme = useSelector(
        (state: TGlobalState) => state.appConfig?.appTheme
    );
    return <PaperProvider theme={appTheme?.vars}>{children}</PaperProvider>;
};

export default ThemeProvider;
