import React, { useState } from 'react';
import { Header, Footer } from '../Components/Layout';
import {
    AccessDenied, HomePage, Login, MenuItemDetails, NotFound, Register, ShoppingCart, Payment, OrderConfirmed, MyOrder, OrderDetails,
    AllOrders, MenuItemListPage, MenuItemUpsert
} from '../Pages';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useGetShoppingCartQuery } from '../API/shoppingCartAPI';
import { setShoppingCart } from '../Storage/Redux/shoppingCartSlice';
import { userModel } from '../Interfaces';
import { setLoggedInUser } from '../Storage/Redux/userAuthSlice';
import jwt_decode from 'jwt-decode';
import { RootState } from '../Storage/Redux/store';

function App() {
    const dispatch = useDispatch();
    const [skip, setSkip] = useState(true)
    const userData: userModel = useSelector((state: RootState) => state.userAuthStore)
    const { data, isLoading } = useGetShoppingCartQuery(userData.id);


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
                    <Route path='/payment' element={<Payment />} />
                    <Route path='/order/orderConfirmed/:id' element={<OrderConfirmed />} />
                    <Route path='/order/orderDetails/:id' element={<OrderDetails />} />
                    <Route path='/order/myOrder' element={<MyOrder />} />
                    <Route path='/order/allOrders' element={<AllOrders />} />
                    <Route path='/menuItem/menuItemListPage' element={<MenuItemListPage />} />
                    <Route path='/menuItem/menuItemUpsert/:id' element={<MenuItemUpsert />} />
                    <Route path='/menuItem/menuItemUpsert' element={<MenuItemUpsert />} />
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