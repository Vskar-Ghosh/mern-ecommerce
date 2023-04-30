import React from "react";
import { Link } from "react-router-dom";
import { addCartItem } from "../redux/productSlice";
import { useDispatch } from "react-redux";

const CardFeatures = ({ name, image, category, price, loading, id }) => {
  const dispatch = useDispatch();
  const handleAddCartProduct = (e) => {
    dispatch(
      addCartItem({
        _id: id,
        name: name,
        price: price,
        category: category,
        image: image,
      })
    );
  };
  return (
    <div className="w-full min-w-[180px] max-w-[180px] bg-white shadow-lg hover:drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col">
      {name ? (
        <>
          <Link
            to={`/menu/${id}`}
            onClick={() => window.scroll({ top: "0", behavior: "smooth" })}
          >
            <div className="h-28 flex flex-col justify-center items-center">
              <img src={image} className="h-full" alt="productVegetable" />
            </div>
            <h3 className="font-semibold text-slate-600 capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
              {name}
            </h3>
            <p className="tex-slate-900 font-medium">{category}</p>
            <p className="font-bold">
              <span className="text-red-500">₹</span>
              <span>{price} </span>{" "}
            </p>
          </Link>
          <button
            className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 w-full"
            onClick={handleAddCartProduct}
          >
            Add Cart
          </button>
        </>
      ) : (
        <div className="min-h-[150px] flex justify-center items-center">
          <p>{loading} </p>
        </div>
      )}
    </div>
  );
};

export default CardFeatures;
