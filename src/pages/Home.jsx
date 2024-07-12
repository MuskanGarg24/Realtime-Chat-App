import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import Chat from "../components/Chat";

const Home = () => {
  const { userLoggedIn } = useAuth();

  return (
    <>
      {!userLoggedIn && <Navigate to="/login" replace={true} />}
      <Chat />
    </>
  );
};

export default Home;
