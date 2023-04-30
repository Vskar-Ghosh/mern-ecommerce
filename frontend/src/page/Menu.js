import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AllProduct from "../components/AllProduct";
import { addCartItem } from "../redux/productSlice";

const Menu = () => {
  const { filterby } = useParams();
  console.log(filterby);
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.productList);
  console.log(productData);
  const productDisplay = productData.filter((el) => el._id === filterby)[0];
  console.log(productDisplay);

  const handleAddCartProduct = (e) => {
    dispatch(addCartItem(productDisplay));
  };
  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-2xl m-auto md:flex bg-white">
        <div className=" max-w-sm overflow-hidden">
          <img
            src={productDisplay.image}
            alt="filterProduct"
            className="hover:scale-110 transition-all h-full"
          />
        </div>
        <div className="flex flex-col gap-1 px-4">
          <h3 className="font-semibold text-slate-600 capitalize md:text-4xl">
            {productDisplay.name}
          </h3>
          <p className="tex-slate-500 font-medium md:text-2xl">
            {productDisplay.category}
          </p>
          <p className="font-bold md:text-2xl">
            <span className="text-red-500">₹</span>
            <span>{productDisplay.price} </span>{" "}
          </p>
          <div className="flex gap-3">
            <button className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]">
              Buy
            </button>
            <button
              onClick={handleAddCartProduct}
              className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]"
            >
              Add Cart
            </button>
          </div>
          <div>
            <p className=" text-slate-600 font-medium">Description : </p>
            <p>{productDisplay.description}</p>
          </div>
        </div>
      </div>

      <AllProduct heading={"Related Product"} />
    </div>
  );
};

export default Menu;
