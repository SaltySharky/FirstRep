import axios from "axios";
import { auth } from "../firebase/firebase";

export const createHeader = async () => {
  // retrieve user's id token from firebase
  const currentUser = auth.currentUser;
  const token = await currentUser.getIdToken();

  // create and return the header containing the id token
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
}

export const addUserToMongo = async (displayName: string) => {
  const header = await createHeader();
  const currentUser = auth.currentUser;

  // the request body
  const payload = {
    user_id: currentUser?.uid,
    email: currentUser?.email,
    name: displayName,
  }

  // send request to API
  try {
    const res = await axios.post("/api/users", payload, header); // POST request to add user to MongoDB database
    return res.data;
  } catch (error) {
    console.error("Error adding user to MongoDB: ", error);
  }
};

export const getUserFromMongo = async (uid: string) => {
  const header = await createHeader();
  const currentUser = auth.currentUser;

  try {
    const res = await axios.get("/api/users" + uid, header);
  } catch (error) {
    console.error("Error finding user in MongoDB: ", error);
  }
}

export const deleteUserFromMongo = async (uid: string) => {

}

export const updateUserFromMongo = async (answers) => {
  const header = await createHeader();
  const currentUser = auth.currentUser;

  // the request body
  const payload = {
    user_id: currentUser?.uid,
    level: answers[1],
    frequency: answers[2],
    intensity: answers[3],
  }

  // send request to API
  try {
    const res = await axios.patch("/api/users/" + currentUser.uid, payload, header);
    return res.data;
  } catch (error) {
    console.error("Error updating user from MongoDB: ", error);
  }
}