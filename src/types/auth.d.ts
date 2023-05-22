export interface TUser {
    id: string;
    email: string;
    name: string | null;
    photo: string | null;
}


export interface TAuthStoreSlice {
    isLoggedIn?: boolean;
    token: string | null;
    user?: User;
}