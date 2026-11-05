

import express from "express";
import {Check_if_valid_enum, Company, Company_Sort_Fields } from "../data/interfaces";

import * as mdb from "../mongo_api"

export default function company_page() {

    const router = express.Router();

    router.get("{/:name_search}" , async (req,res) => {
        let asc_desc : boolean = typeof req.query.asc_desc === "string"  && req.query.asc_desc == "false" ? false : true;
        let Company_sort_field = Check_if_valid_enum(Company_Sort_Fields, req.query.Company_sort_field?.toString(), Company_Sort_Fields.company_name)

        let companys: Company[]  = []

        const name_search = typeof req.params.name_search == 'string' ? req.params.name_search : "" 
                    
        companys = await mdb.db_get_sorted_companys(name_search, Company_sort_field, asc_desc)
        

        const search_term = req.params.name_search ? req.params.name_search : "Search"
        
        res.render("company_page", {
            companys          : companys,asc_desc:asc_desc, 
            Company_sort_field: Company_sort_field, 
            search_term       : search_term
        })    
    })

    return router
}