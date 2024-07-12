import React, { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../firebase/auth";
import { useAuth } from "../context/authContext";
import { updateUser } from "../firebase/users";

const Login = () => {
  const { userLoggedIn } = useAuth();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleUserSignIn = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      return setError("All fields are required");
    }
    try {
      const response = await doSignInWithEmailAndPassword(
        data.email,
        data.password
      );
      console.log(response);
      updateUser(response.user.uid, true);
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <div className="w-[90vw] sm:w-[70vw] md:w-[30vw] mx-auto">
      {userLoggedIn && <Navigate to="/" replace={true} />}
      <div className="mt-20 sm:mt-28">
        <h1 className="text-3xl font-bold text-center">LOGIN</h1>
      </div>
      <form className="mt-9" onSubmit={handleUserSignIn}>
        <label className="input input-bordered flex items-center gap-2 my-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow text-lg"
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 my-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow text-lg"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </label>
      </form>
      <button
        className="w-full bg-[#6a85fa] px-5 py-3 rounded-xl text-lg text-white font-bold mt-2 hover:opacity-90"
        onClick={handleUserSignIn}
      >
        Login
      </button>
      {error && (
        <p className="text-red-700 text-lg my-5 text-center">{error}</p>
      )}
      <p className="mt-5 text-lg text-center">
        Don't have an account?{" "}
        <Link to="/register" className="font-bold">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
