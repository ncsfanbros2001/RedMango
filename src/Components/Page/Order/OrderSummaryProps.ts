import { shoppingCartModel } from "../../../Interfaces"
import { SD_STATUS } from "../../../Utility/StaticDetail"

export interface orderSummaryProps {
    data: {
        id?: number
        cartItems?: shoppingCartModel[]
        cartTotal?: number
        userId?: string
        stripePaymentIntentId?: string
        status?: SD_STATUS
    }
    userInput: {
        name: string
        email: string
        phoneNumber: string
    }
}