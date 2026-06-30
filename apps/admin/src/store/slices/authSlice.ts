import {
    createSlice
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface User {

    userId?: number;
    name?: string;
    email?: string;
    phone?: string;
    status?: string;
    token?: string;
    documentStatus?: string; // ✅ ADD THIS
    role?: string;
}

interface AuthState {

    user: User | null;

    token: string | null;

    isAuthenticated: boolean;
}

// ===============================
// LOAD USER FROM LOCAL STORAGE
// ===============================

const storedUser = localStorage.getItem("user");

const user: User | null = storedUser
    ? JSON.parse(storedUser)
    : null;


// ===============================
// INITIAL STATE
// ===============================

const initialState: AuthState = {
    user,
    token: user?.token || null,
    isAuthenticated: !!user?.token,
};

const authSlice = createSlice({

    name: "auth",

    initialState,

    reducers: {

        loginSuccess: (
            state,
            action: PayloadAction<User>
        ) => {

            state.user = action.payload;

            state.token = action.payload.token || null;

            state.isAuthenticated = true;
            // SAVE USER
            localStorage.setItem(
                "user",
                JSON.stringify(action.payload)
            );

            // SAVE TOKEN
            localStorage.setItem(
                "token",
                action.payload.token || ""
            );
        },

        registerSuccess: (
            state,
            action: PayloadAction<User>
        ) => {
            state.user = action.payload;
            state.token = action.payload.token || null;
            state.isAuthenticated = true;

            localStorage.setItem("user", JSON.stringify(action.payload));
            localStorage.setItem("token", action.payload.token || "");
        },

        logout: (state) => {

            state.user = null;

            state.token = null;

            state.isAuthenticated = false;

            localStorage.removeItem("user");

            localStorage.removeItem("token");
        }
    }
});

export const {
    loginSuccess,
    logout,
    registerSuccess
} = authSlice.actions;

export default authSlice.reducer;




