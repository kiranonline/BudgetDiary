import { logout } from "@app/data";
import { Dispatch } from "@reduxjs/toolkit";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export const logoutAndClear = async (dispatch: Dispatch) => {
    try {
        await GoogleSignin.signOut();
        dispatch(logout());
    }
    catch (error) {
        console.log(error)
    }
}