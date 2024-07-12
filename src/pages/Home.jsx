import React from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { userLoggedIn } = useAuth();

  return (
    <>
      {!userLoggedIn && <Navigate to="/login" replace={true} />}
      <Navbar />
    </>
  );
};

export default Home;
