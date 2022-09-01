// import { request } from "express";
import jwt from "jsonwebtoken";
import dbConnect from "./dbConnect/fsConnect.js";
import { secretKey } from "./dbConnect/credentials.js";

export async function createUser(req, res) {
  let { email, password } = req.body; //Lowercase
  email = email.toLowerCase()
  const db = dbConnect();
  const user = await db
    .collection("users")
    .add({ email, password })
    .catch((err) => res.status(500).send(err));
  //now we create token
  const token = jwt.sign({ email, id: user.id }, secretKey);
  res.send({ token });
}

export async function loginUser(req, res) {
    let { email, password } = req.body;
    email = email.toLowerCase()
    const db = dbConnect();
    const collection = await db
      .collection("users")
      .where("email", "==", email)
      .where("password", "==", password)
      .get()
      .catch((err) => res.status(500).send(err));
      const user = collection.docs.map(doc => {
        let thisUser = doc.data()
        thisUser.id = doc.id
        return thisUser
    })[0] //just give first element of array

    //now we create token
    const token = jwt.sign({ email: user.email, id: user.id }, secretKey);
    res.send({ token });
  }
