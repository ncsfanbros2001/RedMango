import React from 'react'
import { useState, useEffect } from 'react';
import { MenuItemModel } from '../../../Interfaces';
import MenuItemCard from './MenuItemCard';
import { useGetMenuItemsQuery } from '../../../API/menuItemAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuItem } from '../../../Storage/Redux/menuItemSlice';
import { MainLoader } from '../Common';
import { RootState } from '../../../Storage/Redux/store';


function MenuItemList() {
    const [menuItems, setMenuItems] = useState<MenuItemModel[]>([]);
    const dispatch = useDispatch()
    const { data, isLoading } = useGetMenuItemsQuery(null)
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [categoryList, setCategoryList] = useState([""]);

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
                const tempArray = handleFilters(localCategory, searchValue)
                setMenuItems(tempArray)
            }
            else {
                button.classList.remove("active")
            }
        })
    }

    useEffect(() => {
        if (data && data.result) {
            const tempMenuArray = handleFilters(selectedCategory, searchValue)
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

    const handleFilters = (category: string, search: string) => {

        // Filter by category
        let tempArray = category === "All" ? [...data.result] : data.result.filter((item: MenuItemModel) =>
            item.category.toUpperCase() === category.toUpperCase())


        // Search by name    
        if (search) {
            const tempSearchMenuItem = [...tempArray]
            tempArray = tempSearchMenuItem.filter((item: MenuItemModel) => {
                return item.name.toUpperCase().includes(search.toUpperCase());
            });
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
                </ul>
            </div>
            {menuItems.length > 0 && menuItems.map((menuItem: MenuItemModel, index: number) => (
                <MenuItemCard menuItem={menuItem} key={index} />
            ))}
        </div>
    )
}

export default MenuItemList