import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";
import empty from "../assest/empty.gif";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  console.log(productCartItem);

  const totalqtyPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );

  const totalqty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );
  return (
    <div className="p:2 md:p-4">
      <h2 className="text-lg md:text-3xl font-bold text-slate-600">
        Your Cart Items
      </h2>

      {productCartItem[0] ? (
        <div className="my-4 flex gap-40">
          {/* display cart item  */}
          <div className=" w-full max-w-3xl">
            {productCartItem.map((el) => {
              return (
                <CartProduct
                  key={el._id}
                  id={el._id}
                  name={el.name}
                  image={el.image}
                  category={el.category}
                  qty={el.qty}
                  total={el.total}
                  price={el.price}
                />
              );
            })}
          </div>
          {/* totla cart item  */}
          <div className="w-full max-w-md ml-auto">
            <h2 className="bg-blue-500 text-white p-2 text-lg">Summery</h2>
            <div className="flex w-full py-2 text-lg border-b">
              <p>Total Qty : </p>
              <p className="ml-auto w-32 font-bold">{totalqty}</p>
            </div>

            <div className="flex w-full py-2 text-lg border-b">
              <p>Total Price : </p>
              <p className="ml-auto w-32 font-bold">
                {" "}
                <span className="text-red-500">₹</span>
                {totalqtyPrice}
              </p>
            </div>
            <button className="bg-red-500 w-full text-lg font-bold py-2 text-white">
              Payment
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full justify-center items-center">
          <img src={empty} className="w-full max-w-sm" />
          <p className=" text-slate-500 text-3xl font-bold">Empty Cart</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
