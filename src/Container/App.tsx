import React from 'react';
import { Header, Footer } from '../Components/Layout';
import {
    AccessDenied, AuthenticationTestAdmin, HomePage, Login, MenuItemDetails, NotFound, Register, ShoppingCart, AuthenticationTest
} from '../Pages';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useGetShoppingCartQuery } from '../API/shoppingCartAPI';
import { setShoppingCart } from '../Storage/Redux/shoppingCartSlice';
import { userModel } from '../Interfaces';
import { setLoggedInUser } from '../Storage/Redux/userAuthSlice';
import jwt_decode from 'jwt-decode';

function App() {
    const dispatch = useDispatch();

    const { data, isLoading } = useGetShoppingCartQuery("39c652e4-e119-4888-9f94-6dae1875066a");
    useEffect(() => {
        const localToken = localStorage.getItem("token")

        if (localToken) {
            const { fullName, id, email, role }: userModel = jwt_decode(localToken)
            dispatch(setLoggedInUser({ fullName, id, email, role }));
        }
    }, [])

    useEffect(() => {
        if (!isLoading) {
            dispatch(setShoppingCart(data.result?.cartItems))
        }
    }, [data])

    useEffect(() => {
        if (!isLoading) {
            dispatch(setShoppingCart(data.result?.cartItems))
        }
    }, [data])

    return (
        <div>
            <Header />
            <div className="pb-5">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/menuItemDetails/:menuItemId" element={<MenuItemDetails />} />
                    <Route path="/shoppingCart" element={<ShoppingCart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/accessDenied" element={<AccessDenied />} />
                    <Route path="/authorization" element={<AuthenticationTestAdmin />} />
                    <Route path="/authentication" element={<AuthenticationTest />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;

// adminID: 39c652e4-e119-4888-9f94-6dae1875066a
// username: inscifer@gmail.com
// password: monstercat