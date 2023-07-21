import React, { useState, useEffect } from 'react'
import { withAdminAuth, withAuth } from '../../HOC'
import { useGetAllOrdersQuery } from '../../API/orderAPI';
import OrderList from './OrderList';
import { MainLoader } from '../../Components/Page/Common';
import { inputHelper } from '../../Helper';
import { SD_STATUS } from '../../Utility/StaticDetail';
import { orderHeaderModel } from '../../Interfaces';

const filterOptions = [
    "All",
    SD_STATUS.CONFIRMED,
    SD_STATUS.BEING_COOKED,
    SD_STATUS.COMPLETED,
    SD_STATUS.READY_FOR_PICKUP,
    SD_STATUS.CANCELLED
]

function AllOrders() {

    const [filter, setFilter] = useState({ searchString: "", status: "" })

    const [orderData, setOrderData] = useState([]);
    const [apiFilters, setApiFilters] = useState({
        searchString: "",
        status: ""
    })
    const [totalRecords, setTotalRecords] = useState(0)
    const [pageOptions, setPageOptions] = useState({
        pageNumber: 1,
        pageSize: 3
    })
    const [currentPageSize, setCurrentPageSize] = useState(pageOptions.pageSize)


    const { data, isLoading } = useGetAllOrdersQuery({
        ...(apiFilters && {
            searchString: apiFilters.searchString,
            status: apiFilters.status,
            pageNumber: pageOptions.pageNumber,
            pageSize: pageOptions.pageSize
        })
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const tempValue = inputHelper(e, filter)
        setFilter(tempValue)
    }

    const handleFilters = () => {
        setApiFilters({
            searchString: filter.searchString,
            status: filter.status
        })
    }

    useEffect(() => {
        if (data) {
            setOrderData(data.apiResponse.result)
            const { TotalRecords } = JSON.parse(data.totalRecords)
            setTotalRecords(TotalRecords)
        }
    }, [data])

    const getPageDetails = () => {
        const dataStartNumber = (pageOptions.pageNumber - 1) * pageOptions.pageSize + 1;
        const dataEndNumber = pageOptions.pageNumber * pageOptions.pageSize;

        return `${dataStartNumber} - ${dataEndNumber < totalRecords ? dataEndNumber : totalRecords} of ${totalRecords}`;
    }

    const handlePaginationClick = (direction: string, pageSize?: number) => {
        if (direction === "prev") {
            setPageOptions({ pageSize: 3, pageNumber: pageOptions.pageNumber - 1 })
        }
        else if (direction === "next") {
            setPageOptions({ pageSize: 3, pageNumber: pageOptions.pageNumber + 1 })
        }
        else if (direction === "change") {
            setPageOptions({ pageSize: pageSize ? pageSize : 3, pageNumber: 1 })
        }
    }

    return (
        <>
            {isLoading && <MainLoader />}
            {!isLoading &&
                (<>
                    <div className='d-flex aligm-items-center justify-content-between mx-5 mt-5'>
                        <h1 className="text-success">Orders List</h1>
                        <div className='d-flex' style={{ width: "40%", height: "50%" }}>
                            <input type='text' className='form-control mx-2' placeholder='Search by name or mobile'
                                onChange={handleChange} name="searchString" />

                            <select className='form-select w-50 mx-2' onChange={handleChange} name="status">
                                {filterOptions.map((item, key) => (
                                    <option value={item === "All" ? "" : item} key={key}>{item}</option>
                                ))}
                            </select>

                            <button className='btn btn-outline-success' onClick={handleFilters}>Filter</button>
                        </div>
                    </div>


                    <OrderList isLoading={isLoading} orderData={orderData} />
                    <div className='d-flex mx-5 justify-content-end align-items-center'>
                        <div>Rows per page:</div>
                        <div>
                            <select className='form-select mx-2'
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    handlePaginationClick("change", Number(e.target.value))
                                    setCurrentPageSize(Number(e.target.value))
                                }}
                                style={{ width: "80px" }}
                                value={currentPageSize}>

                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                        </div>
                        <div className="mx-2">
                            {getPageDetails()}
                        </div>
                        <button disabled={pageOptions.pageNumber === 1} className='btn btn-outline-primary px-3 mx-2'
                            onClick={() => handlePaginationClick("prev")}>
                            <i className='bi bi-chevron-left'></i>
                        </button>
                        <button disabled={pageOptions.pageNumber * pageOptions.pageNumber >= totalRecords}
                            className='btn btn-outline-primary px-3 mx-2' onClick={() => handlePaginationClick("next")}>
                            <i className='bi bi-chevron-right'></i>
                        </button>
                    </div>
                </>)}
        </>
    )
}

export default withAdminAuth(AllOrders)