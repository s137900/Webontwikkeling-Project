import bcrypt from 'bcrypt';
import express from "express";
import type {User} from "../data/interfaces"
import  jwt from 'jsonwebtoken';
import { db_get_all_users } from '../mongo_api';

export default function login(secret:string) {

    const router = express.Router();

    router.post("/", async (req, res) => {
      const {username, password}:User = req.body

      const users = await db_get_all_users()
      const if_user = users.find(x => x.username == username)
      const if_pass_match = if_user ? bcrypt.compareSync(password, if_user.password) : false
      
      if(if_user && if_pass_match) {
        const token = jwt.sign({"username": if_user.username, role:if_user.role}, secret, { expiresIn: "120m" });
        if_user.refreshtoken = token
        
        res.cookie("jwt", token, { httpOnly: true, sameSite: "lax" });
        res.redirect("/car_page/")
      }else{
        res.status(401).send()
      }
    })

    return router
}
