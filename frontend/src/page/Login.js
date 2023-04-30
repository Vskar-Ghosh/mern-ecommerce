import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userAnimation from "../assest/user-animation.jpg";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/login`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const dataRes = await fetchData.json();
      console.log(dataRes);
      toast(dataRes.message);
      if (dataRes.alert) {
        dispatch(loginRedux(dataRes));
        setTimeout(() => {
          navigate("/");
        }, 10);
      }
      console.log(userData);
    } else {
      alert("Please Enter required fields");
    }
  };
  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
        <h1 className="text-center text-2xl font-bold">Login</h1>
        <div className="w-20 overflow-hidden rounded-full drop-shadow flex m-auto shadow-md">
          <img src={userAnimation} className="w-full" alt="user" />
        </div>
        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded"
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type={"password"}
            id="password"
            name="password"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded"
            value={data.password}
            onChange={handleOnChange}
          />

          <button className=" w-full max-w-[120px] m-auto bg-red-500 hover:bg-red-600 text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Login
          </button>
        </form>
        <p className="text-sm mt-4">
          Don't have an accoutn ?{" "}
          <Link to={"/signup"} className="text-red-500 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
