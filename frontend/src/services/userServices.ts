import axios from "axios";
import { auth } from "../firebase/firebase"

export const addUserToMongo = async (token: string) => {

  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const currentUser = auth.currentUser;
  const payload = {
    user_id: currentUser?.uid,
    email: currentUser?.email,
    name: currentUser?.displayName,
  }

  try {
    const res = await axios.post("/api/users", payload, header); // POST request to add user to MongoDB database
    return res.data;
  } catch (error) {
    console.error("Error adding user to MongoDB: ", error);
  }
};

export const deleteUserFromMongo = async (token: string, uid: string) => {

}