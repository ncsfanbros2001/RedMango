import React from 'react'
import { withAuth } from '../../HOC'
import { useSelector } from 'react-redux'
import { RootState } from '../../Storage/Redux/store'
import { useGetAllOrdersQuery } from '../../API/orderAPI';
import OrderList from './OrderList';
import { MainLoader } from '../../Components/Page/Common';

function MyOrder() {

    const userId = useSelector((state: RootState) => state.userAuthStore.id);

    const { data, isLoading } = useGetAllOrdersQuery({ userId });

    return (
        <>
            {isLoading && <MainLoader />}
            {!isLoading &&
                (<>
                    <div className='d-flex aligm-items-center justify-content-between mx-5 mt-5'>
                        <h1 className="text-success">My Orders</h1>
                    </div>
                    <OrderList isLoading={isLoading} orderData={data?.apiResponse.result} />
                </>)}
        </>
    )
}

export default withAuth(MyOrder)