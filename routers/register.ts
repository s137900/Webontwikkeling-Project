import express from "express";
import {Role, type User} from "../data/interfaces"
import bcrypt from 'bcrypt';
import { db_add_user, db_get_all_users } from "../mongo_api";

export default function register( saltRounds:number) {

    const router = express.Router();

    router.post("/", async (req, res) => {
        console.log("some");
        
        const {username, password}:User = req.body
        
        const users = await db_get_all_users()
        const if_user = users.find(x => x.username == username)
        if (if_user) {
            console.log("failure");
            res.status(400).send()
        }else{
            console.log("success");

            const new_user:User =  {"refreshtoken":"", "role":Role.user, "username":username,
                  "password": bcrypt.hashSync(password, saltRounds)
                }
            db_add_user(new_user)


            res.redirect("/login")
        }
    });
    
    return router
}
