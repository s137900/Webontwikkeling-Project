

async function post_request(route:string, body:Object){
    let response:Response | null = null

    response = await fetch(route, {
            method: "POST", // HTTP method
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(body), 
            credentials: 'include' 
        });

    return response
}


const name_input = document.getElementById("name") as HTMLInputElement
const price_input = document.getElementById("price") as HTMLInputElement

const car_type_input    = document.getElementById("car_type")    as HTMLSelectElement
const description_input = document.getElementById("description") as HTMLTextAreaElement




async function submit_updated_car_attr() {
    const name = name_input.value
    const price = price_input.value
    
    const car_type = car_type_input.value
    const description = description_input.value

    const match = window.location.href.match(/\/(\d+)(?:\?|$)/);
    const id = match ? match[1] : null;

    
    const result = await post_request(`/edit_car/${id}`, {
        name:name,
        price:price,
        car_type:car_type,
        description:description
    })
    window.location.href = result.url
    console.log(result.redirected);
    console.log(result.status);
    
    


}