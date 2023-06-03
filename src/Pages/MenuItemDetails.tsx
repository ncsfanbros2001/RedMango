import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetMenuItemByIdQuery } from '../API/menuItemAPI';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUpdateShoppingCartMutation } from '../API/shoppingCartAPI';
import { MainLoader, MiniLoader } from '../Components/Page/Common';
import { apiResponse } from '../Interfaces';
import { toastNotify } from '../Helper';

// User ID: 39c652e4-e119-4888-9f94-6dae1875066a

function MenuItemDetails() {
    const { menuItemId } = useParams();
    const { data, isLoading } = useGetMenuItemByIdQuery(menuItemId);
    const navigate = useNavigate();
    const [isAddingtoCart, setIsAddingToCart] = useState<boolean>(false);
    const [quantity, setQuantity] = useState(1);
    const [updateShoppingCart] = useUpdateShoppingCartMutation();

    const handleQuantity = (count: number) => {
        let newQuantity = quantity + count
        if (newQuantity == 0) {
            newQuantity = 1
        }
        setQuantity(newQuantity);
        return;
    }

    const handleAddToCart = async (menuItemId: number) => {
        setIsAddingToCart(true);

        const response : apiResponse = await updateShoppingCart({
            menuItemId: menuItemId,
            updateQuantityBy: quantity,
            userId: "39c652e4-e119-4888-9f94-6dae1875066a"
        })

        if (response.data && response.data.isSuccess)
        {
            toastNotify("Item added to cart");
        }

        setIsAddingToCart(false);
    }

    return (
        <div className="container pt-4 pt-md-5">

            {!isLoading ? (<div className="row">
                <div className="col-7">
                    <h2 className="text-success">{data.result?.name}</h2>
                    <span>
                        <span
                            className="badge text-bg-dark pt-2"
                            style={{ height: "40px", fontSize: "20px" }}
                        >
                            {data.result?.category}
                        </span>
                    </span>
                    <span>
                        <span
                            className="badge text-bg-light pt-2"
                            style={{ height: "40px", fontSize: "20px" }}
                        >
                            {data.result?.specialTag}
                        </span>
                    </span>
                    <p style={{ fontSize: "20px" }} className="pt-2">
                        {data.result?.description}
                    </p>
                    <span className="h3">${data.result?.price}</span> &nbsp;&nbsp;&nbsp;
                    <span
                        className="pb-2  p-3"
                        style={{ border: "1px solid #333", borderRadius: "30px" }}
                    >
                        <i onClick={() => { handleQuantity(-1) }}
                            className="bi bi-dash p-1"
                            style={{ fontSize: "25px", cursor: "pointer" }}
                        ></i>
                        <span className="h3 mt-3 px-3">{quantity}</span>
                        <i onClick={() => { handleQuantity(+1) }}
                            className="bi bi-plus p-1"
                            style={{ fontSize: "25px", cursor: "pointer" }}
                        ></i>
                    </span>
                    <div className="row pt-4">
                        <div className="col-5">
                            {isAddingtoCart == true ? (
                                <button disabled className="btn btn-success form-control">
                                    <MiniLoader type="info" />
                                </button>
                            ) : (
                                <button className="btn btn-success form-control"
                                    onClick={() => { handleAddToCart(data.result?.id) }}>
                                    Add to Cart
                                </button>)}
                        </div>

                        <div className="col-5 ">
                            <button className="btn btn-secondary form-control" onClick={() => navigate(-1)}>
                                Back to Home
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-5">
                    <img
                        src={data.result.image}
                        width="100%"
                        style={{ borderRadius: "50%" }}
                        alt="No content"
                    ></img>
                </div>
            </div>)
                : (<div className="d-flex justify-content-center" style={{ width: "100%" }}>
                    <MainLoader />
                </div>)}
        </div>
    )
}

export default MenuItemDetails