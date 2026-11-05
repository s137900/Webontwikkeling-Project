import { MongoClient, Collection } from "mongodb";
import { Car_type, Check_if_valid_enum, Role, type Car, type Company, type User } from "./data/interfaces"; 
import bcrypt from 'bcrypt';
import dotenv from "dotenv";

import cars from "./data/cars.json"
import companys from "./data/companys.json"


dotenv.config();

const uri = process.env.CONNECTION_STRING!;

export const client = new MongoClient(uri);


const saltRounds : number = 10;

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

const DBName = "Webtech_data"
const User_collection     = "users"
const Cars_collection     = "cars"
const Companys_collection = "companys"

async function exit() {
    try {
        await client.close();
        console.log("Disconnected from database");
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}





export async function connect() {
    try {
        await client.connect();
        console.log("Connected to database");


        await user_collection.drop()
        await user_collection.insertMany(users)
        await companys_collection.drop()
        await companys_collection.insertMany(companys);

        await cars_colection    .drop()
        const car_list =  cars as Car[] 
        await cars_colection.insertMany(car_list); 


        
        process.on("SIGINT", exit);
    } catch (error) {
        console.error(error);
    }
}

export const cars_colection:      Collection<Car> = client.db(DBName).collection<Car>(Cars_collection);

export const companys_collection: Collection<Company> = 
    client.db(DBName).collection<Company>(Companys_collection);

export const user_collection:     Collection<User> =
    client.db(DBName).collection<User>(User_collection);