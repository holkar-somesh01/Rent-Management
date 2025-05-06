
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../apis/authApi";

const storedUser = localStorage.getItem("user");

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: storedUser ? JSON.parse(storedUser) : null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder) =>
        builder
            .addMatcher(authApi.endpoints.loginAdmin.matchFulfilled, (state, { payload }) => {
                const userData = { ...payload, role: "SuperAdmin" };
                state.user = userData;
                localStorage.setItem("user", JSON.stringify(userData));
            })
            .addMatcher(authApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => {
                let role = payload?.role || "Tenant";
                const userData = { ...payload, role };

                state.user = userData;
                localStorage.setItem("user", JSON.stringify(userData));
            })
            .addMatcher(authApi.endpoints.logoutUser.matchFulfilled, (state) => {
                state.user = null;
                localStorage.removeItem("user");
            })
            .addMatcher(authApi.endpoints.logoutAdmin.matchFulfilled, (state) => {
                state.user = null;
                localStorage.removeItem("user");
            }),
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
