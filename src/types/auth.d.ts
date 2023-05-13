export interface User {
    id: string;
    email: string;
    name: string | null;
    photo: string | null;
}


export interface AuthStoreSlice {
    isLoggedIn?: boolean;
    token: string | null;
    user?: User;
}