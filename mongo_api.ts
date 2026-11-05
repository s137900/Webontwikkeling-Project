import { type Company, type Car, type User, type Car_Sort_Fields,type Company_Sort_Fields, type Car_edit} from "./data/interfaces";
import { user_collection, companys_collection, cars_colection  } from "./database";

export async function db_add_user(user:User): Promise<boolean> {
    const if_exists = await db_get_user(user)
    if (!if_exists) {
        const result = await user_collection.insertOne(user);
        return result.acknowledged
    } else {
        return false
    }
}


export async function db_get_all_users():Promise<User[]> {
    const users = await user_collection.find<User>({}).toArray();
    return  users
}

export async function db_get_user(user:User | string): Promise<User | null> {
    let result:User | null = null   

    if (typeof user === "string") {
        result = await user_collection.findOne<User>( {"username":user} );
    }else{
        result = await user_collection.findOne<User>( {"username":user.username} );
    }
    return result
}

export async function db_get_sorted_cars(name_search:string |string[] ,sortby:Car_Sort_Fields, if_asc:boolean): Promise<Car[]>{
    const asc_desc = if_asc ? 1 : -1
    const search_term = typeof name_search === "string" ? name_search : "" 
    const result = await cars_colection.find<Car>({ name: new RegExp(search_term, 'i') }).sort({[sortby]:asc_desc}).toArray();
    return result
}

export async function db_get_sorted_companys(name_search:string |string[], sortby:Company_Sort_Fields, if_asc:boolean): Promise<Company[]>{
    const asc_desc = if_asc ? 1 : -1
    const search_term = typeof name_search === "string" ? name_search : "" 
    const result = await companys_collection.find<Company>({ name: new RegExp(search_term, 'i') }).sort({[sortby]:asc_desc}).toArray();
    return result
}


export async function db_get_car(id:number | null): Promise<Car | null>{
    const result = id ? await cars_colection.findOne<Car>({id:id}) : null
    return result
}

export async function db_get_company(id:number | null): Promise<Company | null>{
    const result = id != undefined ? await companys_collection.findOne<Company>({id:id}) : null
    return result
}


export async function db_get_cars_by_company_id(id:number | undefined): Promise<Car[] | null> {
    const result =  id != undefined ? await cars_colection.find<Car>({company_id:id}).toArray() : null;
    return result
}

export async function db_update_car(id:number, car_edit:Car_edit) {

    const car_update = Object.fromEntries(
        Object.entries(car_edit).filter(([_, v]) => v !== undefined)
    );


    const result = await cars_colection.updateOne({ id: id }, 
        { $set: car_update});
    return result
}