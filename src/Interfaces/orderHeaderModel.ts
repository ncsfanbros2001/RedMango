import { SD_STATUS } from "../Utility/StaticDetail";
import orderDetailsModel from "./orderDetailsModel";

export default interface orderHeaderModel {
    orderHeaderId?: number;
    pickupName?: string;
    pickupPhoneNumber?: string;
    pickupEmail?: string;
    applicationUserId?: string;
    user?: any;
    orderTotal?: number;
    orderDate?: Date;
    stripePaymentIntentID?: string;
    status?: SD_STATUS;
    totalItems?: number;
    orderDetails?: orderDetailsModel[];
}