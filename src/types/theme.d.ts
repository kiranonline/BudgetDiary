export interface ThemeVariables {
    name: string;
    colors: {
        backgroundColor1: string;
        backgroundColor2: string;

        primaryColor1: string;
        primaryColor2: string;

        secondaryColor1: string;
    },
    font: {
        size1: number
    },
    shadows: Record<string, string>
}