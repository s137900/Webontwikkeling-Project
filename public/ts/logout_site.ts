async function get_request(route:string){
    let response:Response | null = null
    response = await fetch(route, {
            method: "GET", // HTTP method
            headers: {
                'Content-Type': 'application/json', 
            },
            credentials: 'include' 
        });

    return response
}


async function logout() {
    const response =  await get_request("/logout")

    if (response.ok) {
        window.location.href = response.url;    
    }else{
        console.log("idk how this failed?");
    }
}
