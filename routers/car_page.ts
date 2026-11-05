import express from "express";
import { Car_Sort_Fields, Check_if_valid_enum } from "../data/interfaces";

import * as mdb from "../mongo_api"
import {secureMiddleware } from "../middleware/secureMiddleware";

export default function car_page() {

    const router = express.Router();

    router.get("/{:name_search}", secureMiddleware, async (req,res) => {
        let asc_desc : boolean = typeof req.query.asc_desc === "string"  && req.query.asc_desc == "false" ? false : true;

        let car_sort_field = Check_if_valid_enum(Car_Sort_Fields, req.query.car_sort_field?.toString(), Car_Sort_Fields.car_name)
        
        const cars = await mdb.db_get_sorted_cars(req.params.name_search, car_sort_field, asc_desc)

        const cars_info = cars.map(x => {return {car:x, "if_electric": x.is_electric ? "Yes" : "No"}} )

        const search_term = req.params.name_search ? req.params.name_search : "Search"
        res.render("car_page", {
            cars_info     :cars_info,
            asc_desc      :asc_desc, 
            car_sort_field:car_sort_field, 
            search_term   :search_term
        })  
        })
    return router
}