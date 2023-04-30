import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userAnimation from "../assest/user-animation.jpg";
import { imagetoBase64 } from "../utility/imagetoBase64";
import { toast } from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  console.log(data);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadImage = async (e) => {
    const data = await imagetoBase64(e.target.files[0]);
    console.log(data);

    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };

  console.log(process.env.REACT_APP_SERVER_DOMAIN);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, email, password, confirmPassword } = data;
    if (firstName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const dataRes = await fetchData.json();
        console.log(dataRes);
        //alert(dataRes.message);
        toast(dataRes.message);
        if (dataRes.alert) {
          navigate("/login");
        }
      } else {
        alert("Passwords not match");
      }
    } else {
      alert("Please Enter required fields");
    }
  };
  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
        <h1 className="text-center text-2xl font-bold">Signup</h1>
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
          <img
            src={data.image ? data.image : userAnimation}
            className="w-full h-full"
            alt="user"
          />
          <label htmlFor="profileImage">
            <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
              <p className="text-sm p-0 text-white">Upload</p>
            </div>
            <input
              type={"file"}
              id="profileImage"
              accept="image/"
              className="hidden"
              onChange={handleUploadImage}
            />
          </label>
        </div>
        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type={"text"}
            id="firstName"
            name="firstName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded"
            value={data.firstName}
            onChange={handleOnChange}
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type={"text"}
            id="lastName"
            name="lastName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded"
            value={data.lastName}
            onChange={handleOnChange}
          />

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

          <label htmlFor="confirmPassword">Confrim Password</label>
          <input
            type={"password"}
            id="confirmPassword"
            name="confirmPassword"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded"
            value={data.confirmPassword}
            onChange={handleOnChange}
          />

          <button className=" w-full max-w-[120px] m-auto bg-red-500 hover:bg-red-600 text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Sign Up
          </button>
        </form>
        <p className="text-sm mt-4">
          Already have accoutn ?{" "}
          <Link to={"/login"} className="text-red-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
