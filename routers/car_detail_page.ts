
import express from "express";
import { type Car } from "../data/interfaces";

import * as mdb from "../mongo_api"
export default function car_detail_page() {

  const router = express.Router();

  router.get("/:id", async (req,res) =>{
    let car_id: number | null = null;

    if ( typeof req.params.id =='string' ) {
      car_id = !isNaN(parseInt(req.params.id)) ? parseInt(req.params.id) : null 
    }

    const car: Car | null = await mdb.db_get_car(car_id)
    if (!car) {
      return res.status(502).send("<h1>Internal Error Could Not Fetch Data</h1>")
    }

    const is_electric = car.is_electric ? "Yes" : "No"
    const colors = car.colors.join(' ')
    const car_company = (await mdb.db_get_company(car.company_id))

    if (car && car_company) {
      
      res.render("car_detail_page", {
        car: car, 
        price:car.price.toLocaleString("en"),
        is_electric:is_electric,
        colors:colors,
        car_company:car_company,
        is_admin:res.locals.user.role
      })  
    }else{
      res.status(502).send("<h1>Internal Error Could Not Fetch Data</h1>")
    }
  })

  return router
}