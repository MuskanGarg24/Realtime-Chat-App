import { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { readUser } from "../firebase/users";

const useUserData = () => {

  const [userData, setUserData] = useState(null);

  const userId = auth.currentUser.uid;

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        const data = await readUser(userId);
        setUserData(data);
      }
    };

    fetchUserData();
  }, [userId]);

  return userData;
};

export default useUserData;
