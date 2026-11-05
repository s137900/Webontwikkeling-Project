
import cookieParser from "cookie-parser"
import express from "express";
import logout from './routers/logout';
import login  from './routers/login'
import {restrict_when_logged_in, secureMiddleware } from './middleware/secureMiddleware';

import ejs from "ejs";
import register from './routers/register';

import { connect } from "./database";
import car_edit from './routers/car_edit';
import company_detail_page from './routers/company_detail_page';
import car_detail_page from './routers/car_detail_page';
import company_page from './routers/company_page';
import car_page from './routers/car_page';



const saltRounds : number = 10;

const secret = process.env.JWT_SECRET!

const port = process.env.PORT!

const app = express();

app.set("view engine", "ejs"); 
app.set("port", port);

app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended:true}))


app.use("/login",restrict_when_logged_in, login(secret))
app.use("/register",restrict_when_logged_in, register(saltRounds))
app.use("/logout", logout())
app.use("/company_detail_page",secureMiddleware, company_detail_page())
app.use("/car_detail_page", secureMiddleware, car_detail_page())
app.use("/company_page"   , secureMiddleware, company_page())
app.use("/car_page", car_page())
app.use("/", car_edit())

app.get("/{index}",secureMiddleware, (req,res) => {
  res.render("index")
})

app.get("/login",restrict_when_logged_in , (req,res) => {
  res.render("login")
})

app.get("/register",restrict_when_logged_in , (req,res) => {
  res.render("register")
})

app.use(express.static("public"));

app.all("/*some", (req,res) => {
  res.send("The path: " + req.path + ", does not go to anything")
})

app.listen(app.get("port"), async () =>{
  await connect();
  console.log("[server] http://localhost:" + app.get("port"))
})