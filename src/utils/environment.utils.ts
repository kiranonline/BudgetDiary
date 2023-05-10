import { APP_ENVIRONMENTS } from '../types/index';

export const getCurrentEnvironment = (): APP_ENVIRONMENTS => __DEV__ ? APP_ENVIRONMENTS.DEVELOPMENT : APP_ENVIRONMENTS.PRODUCTION