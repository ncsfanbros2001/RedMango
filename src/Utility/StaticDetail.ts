export enum SD_Roles {
    ADMIN = "admin",
    CUSTOMER = "customer"
}

export enum SD_STATUS {
    PENDING = "Pending",
    CONFIRMED = "Confirmed",
    BEING_COOKED = "Being Cooked",
    READY_FOR_PICKUP = "Ready for Pickup",
    COMPLETED = "Completed",
    CANCELLED = "Cancelled"
}

export enum SD_CATEGORIES {
    APPETIZER = "Appetizer",
    ENTREE = "Entree",
    DESSERT = "Dessert",
    BEVERAGES = "Beverages"
}

export enum SD_SortMode {
    PRICE_LOW_2_HIGH = "Price Low - High",
    PRICE_HIGH_2_LOW = "Price High - Low",
    NAME_A_Z = "Name A - Z",
    NAME_Z_A = "Name Z - A"
}