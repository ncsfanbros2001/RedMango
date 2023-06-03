import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { cartItemModel } from '../../Interfaces';
import { RootState } from '../../Storage/Redux/store';
import { inputHelper } from '../../Helper';
import { MiniLoader } from '../Page/Common';
function CartPickupDetails() {

    const shoppingCartFromStore: cartItemModel[] = useSelector(
        (state: RootState) => state.shoppingCartStore.cartItems ?? []
    )

    let grandTotal = 0;
    let totalItems = 0;

    const initialUserData = {
        name: "",
        email: "",
        phoneNumber: ""
    }

    const [loading, setLoading] = useState(false);
    const [userInput, setUserInput] = useState(initialUserData)
    
    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempData = inputHelper(e, userInput)
        setUserInput(tempData)
    }
    
    shoppingCartFromStore?.map((item: cartItemModel) => {
        totalItems += item.quantity ?? 0
        grandTotal += (item.menuItem?.price ?? 0) * (item.quantity ?? 0)
        return null
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true);
    }

    return (
        <div className="border pb-5 pt-3">
            <h1 style={{ fontWeight: "300" }} className="text-center text-success">
                Pickup Details
            </h1>
            <hr />
            <form className="col-10 mx-auto" onSubmit={handleSubmit}>
                <div className="form-group mt-3">
                    Pickup Name
                    <input
                        type="text"
                        className="form-control"
                        placeholder="name..."
                        name="name"
                        required
                        value={userInput.name}
                        onChange={handleUserInput}
                    />
                </div>
                <div className="form-group mt-3">
                    Pickup Email
                    <input
                        type="email"
                        className="form-control"
                        placeholder="email..."
                        name="email"
                        required
                        value={userInput.email}
                        onChange={handleUserInput}
                    />
                </div>

                <div className="form-group mt-3">
                    Pickup Phone Number
                    <input
                        type="number"
                        className="form-control"
                        placeholder="phone number..."
                        name="phoneNumber"
                        required
                        value={userInput.phoneNumber}
                        onChange={handleUserInput}
                    />
                </div>
                <div className="form-group mt-3">
                    <div className="card p-3" style={{ background: "ghostwhite" }}>
                        <h5>Grand Total : ${grandTotal.toFixed(2)}</h5>
                        <h5>No of items : {totalItems}</h5>
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-lg btn-success form-control mt-3"
                    disabled={loading}
                >
                    {loading ? <MiniLoader/> : "Place Order"}
                    
                </button>
            </form>
        </div>
    )
}

export default CartPickupDetails 