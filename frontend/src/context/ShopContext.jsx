import {createContext, useState} from "react";
import { products } from '../assets/assets.js';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const[search, setSearch] = useState("");
    const[showSearch, setShowSearch] = useState(false);

    const value = {
        products, search, setSearch, showSearch, setShowSearch
    }
    return (
        <ShopContext.Provider value = {value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;