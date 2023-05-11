import { iosConfig } from './ios';
import { Platform } from 'react-native';
import { defaultConfig } from './default';
import { androidConfig } from './android';

const finalConfig: Record<string, any> = {
    ...defaultConfig,
    ...Platform.select({
        ios: iosConfig,
        android: androidConfig,
        default: defaultConfig,
    }),
}

export const getConfig = (configName?: string) => configName ? finalConfig[configName] : finalConfig;