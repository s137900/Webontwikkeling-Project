export function Check_if_valid_enum<T,K>(enum_a: { [s: string]: T; } | ArrayLike<T>, text:string | undefined, default_value:K): T | K{
  const result = Object.values(enum_a).find(x => x == text) 
  if (!result) {
    return default_value
  }
  return result
}

export enum Car_type{
  STATION_WAGON = "Station wagon",
  SUV = "Suv",
  HATCHBACK ="Hatchback",
  CROSSOVERSUV = "Crossover Suv"
}

export type Company = {
  id: number
  name: string
  country: string
  logo_url: string
  founding_year:number
}

export type Car = {
  id: number
  name: string
  description:string
  price: number
  is_electric: boolean
  release_date:string
  img_url:string
  car_type:Car_type,
  colors: string[],
  company_id: number
}


export type Car_edit = {
  name?       : string,
  price?      : number,
  car_type?   : Car_type,
  description?: string,
}

export enum Car_Sort_Fields {
  car_name = "name",
  price = "price",
  car_type = 'car_type',
  is_electric = 'is_electric',
  release_date = 'release_date',
}

export enum Company_Sort_Fields {
  company_name = "name",
  founding_year = "founding_year",
  country = "country"
}




export enum Role{
  user  = "User",
  admin = "Admin"
}

export type User = {
  role:Role,
  username:string,
  password:string,
  refreshtoken:string,
}