import { MongoClient, ObjectId } from "mongodb";
import type {Car, Company, Car_type, User } from "./interfaces";
import {Role} from "./interfaces"
import fs from "fs"
import bcrypt from 'bcrypt';

import * as cars from "./cars.json"


import dotenv from "dotenv";
dotenv.config();

const uri = process.env.CONNECTION_STRING!;

console.log(uri);

const saltRounds : number = 10;

// const client = new MongoClient(uri);

const DBName = "Webtech_data"
const User_collection     = "users"
const Cars_collection     = "cars"
const Companys_collection = "companys"


let users:User[] = [
  {
    username:"admin",
    password: bcrypt.hashSync("nafam", saltRounds),
    refreshtoken:"",
    role:Role.admin,
  },
  {
    username:"user",
    password: bcrypt.hashSync("hellnaw", saltRounds),
    refreshtoken:"",
    role:Role.user,
  }
]

// const result = await client.db(DBName).collection(Cars_collection).insertMany(cars["default"]);

// client.close()