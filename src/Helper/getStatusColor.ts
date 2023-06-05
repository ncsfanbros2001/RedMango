import { SD_STATUS } from "../Utility/StaticDetail";

const getStatusColor = (status: SD_STATUS) => {
    return status === SD_STATUS.CONFIRMED ? "primary" : status === SD_STATUS.PENDING ? "secondary" : 
    status === SD_STATUS.CANCELLED ? "danger" : status === SD_STATUS.COMPLETED ? "success" :
    status === SD_STATUS.BEING_COOKED ? "info" : status === SD_STATUS.READY_FOR_PICKUP && "warning"
}

export default getStatusColor