import { useState, useEffect } from "react";
import { getAllUsers } from "../firebase/users";

const useAllUsersData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const users = await getAllUsers();
      const formattedUsers = Object.keys(users).map((key) => ({
        id: key,
        name: users[key].name,
        email: users[key].email,
        isOnline: users[key].isOnline,
      }));
      setData(formattedUsers);
    };

    fetchAllUsers();
  }, []);

  return data;
};

export default useAllUsersData;
