import { menuItemReducer } from "./menuItemSlice";
import { authAPI, menuItemAPI, orderAPI, paymentAPI, shoppingCartAPI } from "../../API";
import { configureStore } from "@reduxjs/toolkit";
import { shoppingCartReducer } from "./shoppingCartSlice";
import { userAuthReducer } from "./userAuthSlice";

const store = configureStore({
    reducer: {
        menuItemStore: menuItemReducer,
        shoppingCartStore: shoppingCartReducer,
        userAuthStore: userAuthReducer,
        [menuItemAPI.reducerPath]: menuItemAPI.reducer,
        [shoppingCartAPI.reducerPath]: shoppingCartAPI.reducer,
        [authAPI.reducerPath]: authAPI.reducer,
        [paymentAPI.reducerPath]: paymentAPI.reducer,
        [orderAPI.reducerPath]: orderAPI.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(menuItemAPI.middleware)
        .concat(shoppingCartAPI.middleware)
        .concat(authAPI.middleware)
        .concat(paymentAPI.middleware)
        .concat(orderAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>;

export default store;