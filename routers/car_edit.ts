
import express from "express";
import { Car_edit, Car_type, Check_if_valid_enum } from "../data/interfaces";

import * as mdb from "../mongo_api"
import { only_admin, secureMiddleware } from "../middleware/secureMiddleware";

export default function car_edit() {

    const router = express.Router();


    router.post("/edit_car/:id", async (req, res) => {
        let car_edit:Car_edit = {};
        
        ![undefined, ""].includes(req.body?.name)        ? car_edit.name        = req.body?.name        : 0
        ![undefined, ""].includes(req.body?.description) ? car_edit.description = req.body?.description : 0

        !isNaN(parseInt(req.body?.price)) ? car_edit.price =  parseFloat(req.body?.price) : 0
        
        const enum_car_type2 = Check_if_valid_enum(Car_type, req.body?.car_type, undefined)
        enum_car_type2  != undefined ? car_edit.car_type = enum_car_type2 : undefined

        
        const car_id = !isNaN(parseInt(req.params.id)) ? parseInt(req.params.id) : null 
        if ( !car_id ) {
            res.send()
            return
        }
        await mdb.db_update_car(car_id, car_edit)
        
        res.redirect(`/car_detail_page/${car_id}`)
    })



    router.get("/car_edit_page/:id", secureMiddleware, only_admin, async (req,res) => {
        let car_id: number | null = null;
        if ( !Array.isArray(req.params.id) ) {
            car_id = !isNaN(parseInt(req.params.id)) ? parseInt(req.params.id) : null 
        }
        const car = await mdb.db_get_car(car_id)

        if (car) {
            res.render("car_edit_page", {car: car})  
        }else{
            res.redirect("/")
        }
    })

    return router
}