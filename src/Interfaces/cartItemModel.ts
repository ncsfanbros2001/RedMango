import MenuItemModel from "./MenuItemModel"

export default interface cartItemModel {
    id?: number,
    menuItemId?: number,
    menuItem?: MenuItemModel,
    quantity?: number
}