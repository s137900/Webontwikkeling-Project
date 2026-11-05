import car_data from "./cars.json";
import company_data from "./companys.json"
import type {car, company} from "./interfaces"
import {car_type} from "./interfaces"
import * as readline from 'readline-sync';

const companys: company[] = company_data as company[]
const cars    : car[]     = car_data as car[]

let some = car_type["CROSSOVERSUV"]
let welcome_text = "Welcome to the JSON data viewer!\n1. View all data\n2. Filter by ID\n3. Exit\n\nPlease enter your choice: "
let anwser = readline.question(welcome_text);

function display_car(car:car): string {
  let car_string = `- Name: ${car.name}\n- Description: ${car.description}\n- Prijs: ${car.price}
- Is_elektrisch: ${car.is_electric}\n- Release_date: ${car.release_date}
- Img_url: ${car.img_url}\n- Auto_type: ${car.car_type}\n- Kleuren: ${car.colors}\n`


  let Company = companys[car.company_id]

  car_string += `- Company: \n - Name: ${Company.name}\n - Land: ${Company.country}\n- Founding year: ${Company.founding_year}\n`
  return car_string
}

switch (anwser) {
  case "1":
  cars.forEach(car => console.log(car.name + " " + car.price))
    break;
  case "2":
    let anwser = readline.question("Enter the id you want to filter by: ")
    console.log(display_car(cars[Number(anwser)]))
    break;
  case "3":
    break;
  default:
}