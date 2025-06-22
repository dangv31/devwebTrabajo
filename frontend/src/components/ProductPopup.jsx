import React from 'react';
import { IoClose } from "react-icons/io5";
import {Link} from "react-router-dom";

const ProductPopup = ({ product, onClose }) => {
  if (!product || !product.oldPrice) return null;

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-white rounded-lg shadow-xl p-6 text-center text-gray-800 animate-fade-in-up border-2 border-black">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-black transition-colors cursor-pointer"
      >
        <IoClose size={28} />
      </button>

      <p className="text-sm text-gray-500 mb-2">Una recomendación bien berrionda</p>
      <h2 className="text-lg font-bold text-black mb-3">
        ¡Mijo, esto le cae como sombrero nuevo!
      </h2>

      <div className="flex items-center gap-4 mb-4">
        <div className="w-24 h-24 bg-gray-100 border rounded-md flex-shrink-0">
          <img src={product.image[0]} alt={product.name} className="w-full h-full object-contain" />
        </div>
        <div className="text-left">
          <h3 className="text-xl font-extrabold">{product.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-base text-gray-500 line-through">
              ${new Intl.NumberFormat('es-CO').format(product.oldPrice)}
            </p>
            <p className="text-2xl font-bold text-red-600">
              ${new Intl.NumberFormat('es-CO').format(product.price)}
            </p>
          </div>
        </div>
      </div>

      {product.description && (
        <p className="text-sm text-gray-700 text-left mb-4 border-t pt-3 mt-3">
          {product.description}
        </p>
      )}
      <Link to={`product/${product.id}`}>
          <button className="w-full bg-black text-white font-bold py-3 px-6 rounded-md text-sm hover:bg-gray-800 transition-transform hover:scale-105 cursor-pointer">
              Ver producto
          </button>
      </Link>
    </div>
  );
};

export default ProductPopup;
