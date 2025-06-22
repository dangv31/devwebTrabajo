import React, {useContext} from "react";
import {ShopContext} from "../context/ShopContext.jsx";

const CartTotal = () => {
    const {getCartAmount, getTotalSavings} = useContext(ShopContext);
    return (
        <div className="w-full">
            <div className="text-2xl">
                <h1>Carrito Total</h1>
            </div>
            <div className="flex flex-col gap-2 mt-2 text-sm">
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>${(getCartAmount() + getTotalSavings()).toLocaleString('es-CO')}</p>
                </div>
                <hr/>
                <div className="flex justify-between">
                    <p>Ahorro total</p>
                    <p className="text-green-600 font-semibold">
                        -${getTotalSavings().toLocaleString('es-CO')}
                    </p>
                </div>
                <hr/>
                <div className="flex justify-between">
                    <p>Total</p>
                    <p className="font-bold">
                        ${getCartAmount().toLocaleString('es-CO')}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CartTotal;