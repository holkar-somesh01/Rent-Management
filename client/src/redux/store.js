import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apis/authApi";
import authReducer from "./slices/authSlice";
import { adminApi } from "./apis/adminApi";
import { paymentApi } from "./apis/paymentApi";
import { landlordApi } from "./apis/landlordApi";
import { userApi } from "./apis/userApi";
import { premiumApi } from "./apis/premiumApi";

const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [paymentApi.reducerPath]: paymentApi.reducer,
        [landlordApi.reducerPath]: landlordApi.reducer,
        [premiumApi.reducerPath]: premiumApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            adminApi.middleware,
            paymentApi.middleware,
            landlordApi.middleware,
            userApi.middleware,
            premiumApi.middleware
        ),
});

export default reduxStore;
