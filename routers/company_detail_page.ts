import express from "express";
import { type Company } from "../data/interfaces";

import * as mdb from "../mongo_api"

export default function company_detail_page() {

    const router = express.Router();

    router.get("/:id", async (req,res) =>{
        let company_id: number | null = null;
        if ( !Array.isArray(req.params.id) ) {
            company_id = !isNaN(parseInt(req.params.id)) ? parseInt(req.params.id) : null 
        }

        const company   : Company | null  = await mdb.db_get_company(company_id)
        const cars_of_company =  await mdb.db_get_cars_by_company_id(company?.id)

        if (company) {
            res.render("company_detail_page", {company: company, cars:cars_of_company})  
        }else{
            res.status(502).send("<h1>Internal Error Could Not Fetch Data</h1>")
        }
        })
    return router
}