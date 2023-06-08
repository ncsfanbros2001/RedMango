import React from 'react'
import { withAdminAuth, withAuth } from '../../HOC'
import { useSelector } from 'react-redux'
import { RootState } from '../../Storage/Redux/store'
import { useGetAllOrdersQuery } from '../../API/orderAPI';
import OrderList from './OrderList';
import { MainLoader } from '../../Components/Page/Common';

function AllOrders() {

    const { data, isLoading } = useGetAllOrdersQuery("");

    return (
        <>
            {isLoading && <MainLoader />}
            {!isLoading && (<OrderList isLoading={isLoading} orderData={data.result} />)}
        </>
    )
}

export default withAdminAuth(AllOrders)