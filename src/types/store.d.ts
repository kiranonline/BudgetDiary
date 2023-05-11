import { ThemeVariables } from "./theme";

export interface ActionObject {
    type: string;
    payload: any
}

export interface Store {
    appTheme?: ThemeVariables;
}


export enum ACTIONS {
    SET_APP_THEME = 'SET_APP_THEME'
}