import React from 'react'
import { useState, useEffect } from 'react';
import { MenuItemModel } from '../../../Interfaces';
import MenuItemCard from './MenuItemCard';
import { useGetMenuItemsQuery } from '../../../API/menuItemAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuItem } from '../../../Storage/Redux/menuItemSlice';
import { MainLoader } from '../Common';
import { RootState } from '../../../Storage/Redux/store';
import { SD_SortMode } from '../../../Utility/StaticDetail';


function MenuItemList() {
    const [menuItems, setMenuItems] = useState<MenuItemModel[]>([]);
    const dispatch = useDispatch()
    const { data, isLoading } = useGetMenuItemsQuery(null)
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [categoryList, setCategoryList] = useState([""]);
    const [sortName, setSortName] = useState(SD_SortMode.NAME_A_Z)

    const sortOptions: Array<SD_SortMode> = [
        SD_SortMode.PRICE_HIGH_2_LOW,
        SD_SortMode.PRICE_LOW_2_HIGH,
        SD_SortMode.NAME_A_Z,
        SD_SortMode.NAME_Z_A
    ]

    const searchValue = useSelector((state: RootState) => state.menuItemStore.search)

    const handleCategoryClick = (i: number) => {
        const buttons = document.querySelectorAll(".custom-buttons")

        let localCategory;

        buttons.forEach((button, index) => {
            if (index === i) {
                button.classList.add("active")

                if (index === 0) {
                    localCategory = "All"
                }
                else {
                    localCategory = categoryList[index]
                }

                setSelectedCategory(localCategory)
                const tempArray = handleFilters(sortName, localCategory, searchValue)
                setMenuItems(tempArray)
            }
            else {
                button.classList.remove("active")
            }
        })
    }

    const handleSortClick = (i: number) => {
        setSortName(sortOptions[i])
        const tempArray = handleFilters(
            sortOptions[i],
            selectedCategory,
            searchValue
        )
        setMenuItems(tempArray)
    }

    useEffect(() => {
        if (data && data.result) {
            const tempMenuArray = handleFilters(sortName, selectedCategory, searchValue)
            setMenuItems(tempMenuArray)

        }
    }, [searchValue])

    useEffect(() => {
        if (!isLoading) {
            dispatch(setMenuItem(data.result))
            setMenuItems(data.result)

            const tempCategoryList = ["All"]

            data.result.forEach((item: any) => {
                if (tempCategoryList.indexOf(item.category) === -1) { // Doesn't exist in array
                    tempCategoryList.push(item.category)
                }
            })
            setCategoryList(tempCategoryList)
        }
    }, [isLoading])

    const handleFilters = (sortType: SD_SortMode, category: string, search: string) => {

        // Filter by category
        let tempArray = category === "All" ? [...data.result] : data.result.filter((item: MenuItemModel) =>
            item.category.toUpperCase() === category.toUpperCase())


        // Search by name    
        if (search) {
            const tempArray2 = [...tempArray]
            tempArray = tempArray2.filter((item: MenuItemModel) => {
                return item.name.toUpperCase().includes(search.toUpperCase());
            });
        }

        // Sorting
        if (sortType === SD_SortMode.PRICE_LOW_2_HIGH) {
            tempArray.sort((a: MenuItemModel, b: MenuItemModel) => a.price - b.price)
        }
        else if (sortType === SD_SortMode.PRICE_HIGH_2_LOW) {
            tempArray.sort((a: MenuItemModel, b: MenuItemModel) => b.price - a.price)
        }
        else if (sortType === SD_SortMode.NAME_A_Z) {
            tempArray.sort((a: MenuItemModel, b: MenuItemModel) =>
                a.name.toUpperCase().charCodeAt(0) - b.name.toUpperCase().charCodeAt(0))
        }
        else if (sortType === SD_SortMode.NAME_Z_A) {
            tempArray.sort((a: MenuItemModel, b: MenuItemModel) =>
                b.name.toUpperCase().charCodeAt(0) - a.name.toUpperCase().charCodeAt(0))
        }

        return tempArray
    }

    if (isLoading) {
        return <MainLoader />
    }

    return (
        <div className='container row'>
            <div className="my-3">
                <ul className="nav w-100 d-flex justify-content-center">
                    {categoryList.map((categoryName, index) => (
                        <li className="nav-item" key={index}>
                            <button className={`nav-link p-0 pb-2 custom-buttons fs-5 ${index === 0 && "active"}`}
                                onClick={() => handleCategoryClick(index)}>
                                {categoryName}
                            </button>
                        </li>
                    ))}
                    <li className="nav-item dropdown" style={{ marginLeft: "auto" }}>
                        <div className="nav-link dropdown-toggle text-dark fs-6 border"
                            role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {sortName}
                        </div>
                        <ul className='dropdown-menu'>
                            {sortOptions.map((sortType, index) => (
                                <li key={index} className="dropdown-item"
                                    onClick={() => handleSortClick(index)}>
                                    {sortType}
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </div>
            {menuItems.length > 0 && menuItems.map((menuItem: MenuItemModel, index: number) => (
                <MenuItemCard menuItem={menuItem} key={index} />
            ))}
        </div>
    )
}

export default MenuItemList