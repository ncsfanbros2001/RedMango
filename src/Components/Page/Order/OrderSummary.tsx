import React from 'react'
import { orderSummaryProps } from './OrderSummaryProps'
import { cartItemModel } from '../../../Interfaces'
import { getStatusColor } from '../../../Helper'
import { useNavigate } from 'react-router-dom';
import { SD_Roles, SD_STATUS } from '../../../Utility/StaticDetail';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Storage/Redux/store';


function OrderSummary({ data, userInput }: orderSummaryProps) {

    const badgeTypeColor = getStatusColor(data.status!);
    const navigate = useNavigate();

    const userData = useSelector((state: RootState) => state.userAuthStore)

    const nextStatus: any = data.status! == SD_STATUS.CONFIRMED ?
        { color: "info", value: SD_STATUS.BEING_COOKED } : data.status! === SD_STATUS.BEING_COOKED ?
            { color: "warning", value: SD_STATUS.READY_FOR_PICKUP } : data.status! === SD_STATUS.READY_FOR_PICKUP &&
            { coloe: "success", value: SD_STATUS.COMPLETED }


    return (
        <div>
            {" "}
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="text-success">Order Summary</h3>
                <span className={`btn btn-outline-${badgeTypeColor} fs-6`}>
                    {data.status}
                </span>
            </div>

            <div className="mt-3">
                <div className="border py-3 px-2">Name: {userInput.name}</div>
                <div className="border py-3 px-2">Email: {userInput.email}</div>
                <div className="border py-3 px-2">Phone: {userInput.phoneNumber}</div>
                <div className="border py-3 px-2">
                    <h4 className="text-success">Menu Items</h4>
                    <div className="p-3">
                        {data.cartItems?.map((cartItem: cartItemModel, index: number) => {
                            return (
                                <div className="d-flex" key={index}>
                                    <div className="d-flex w-100 justify-content-between">
                                        <p>{cartItem.menuItem?.name}</p>
                                        <p>${cartItem.menuItem?.price} x {cartItem.quantity} = </p>
                                    </div>
                                    <p style={{ width: "70px", textAlign: "right" }}>
                                        $
                                        {(cartItem.menuItem?.price ?? 0) * (cartItem.quantity ?? 0)}
                                    </p>
                                </div>
                            )
                        })}

                        <hr />
                        <h4 className="text-danger" style={{ textAlign: "right" }}>
                            ${data.cartTotal?.toFixed(2)}
                        </h4>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back to Orders</button>
                {userData.role == SD_Roles.ADMIN && (
                    <div>
                        <button className="btn btn-danger mx-2">
                            Cancel
                        </button>
                        <button className={`btn btn-${nextStatus.color}`}>
                            {nextStatus.value}
                        </button>
                    </div>
                )}
            </div>

        </div>
    )
}

export default OrderSummary