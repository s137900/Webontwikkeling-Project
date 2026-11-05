

enum Mode {
  GET = "GET",
  POST = "POST"
}


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



const username2 = document.getElementById("username") as HTMLInputElement
const password2 = document.getElementById("password") as HTMLInputElement

async function login(){
    const response =  await post_request("/login", 
        {"username":username2.value, "password":password2.value})

    console.log(response.status)
    if (response.ok) {
        console.log(response.url)
        window.location.href = response.url;    
        
    }else{
        alert("username or password incorrect")
        console.log("username or password incorrect");
    }
}

async function register(){
    const response =  await post_request("/register",
         {"username":username2.value, "password":password2.value})

    if (response.ok) {
        window.location.href = response.url;    
    }else{
        console.log("username already exists");
    }
}