import { TMyAccountCategrory } from './common.d';

export interface TMyAccountTag {
    id: string;
    name: string;
    accountCategory: TMyAccountCategrory;
}