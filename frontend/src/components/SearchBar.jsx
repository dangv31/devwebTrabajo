import React, {useContext, useEffect, useState} from "react";
import {ShopContext} from "../context/ShopContext.jsx";
import {FaSearch} from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import {useLocation} from "react-router-dom";

const SearchBar = () => {
    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes("/products")){
            setVisible(true);

        }
        else {
            setVisible(false);
        }
    }, [location]);
    return showSearch && visible ? (
        <div className = "border-t border-b bg-gray-50 text-center">
            <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Buscar" className="flex-1 outline-none bg-inherit text-sm"/>
                <FaSearch className="w-5" />
            </div>
            <RxCrossCircled onClick={()=>setShowSearch(false)} className="inline w-20 cursor-pointer"/>

        </div>
    ) : null

}
export default SearchBar;