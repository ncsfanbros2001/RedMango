import MenuItemModel from "./MenuItemModel";

export default interface orderDetailModel {
    orderDetailId?: number;
    orderHeaderId?: number;
    menuItemId?: number;
    menuItem?: MenuItemModel;
    quantity?: number;
    price?: number;
    itemName?: string;
}