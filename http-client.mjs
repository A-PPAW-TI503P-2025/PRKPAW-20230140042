import https from "https";

// const endpoint = "https://hookb.in/1gmEeY3JLZhd6NOO616L";

//const endpoint = "https://paw-b-2025.free.beeceptor.com";

const endpoint = "https://paw-20230140042-dean.free.beeceptor.com";




const request = https.request(endpoint, {
    method: "POST",
    headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json",
    }
}, (response) => {
    response.addListener("data", (data) => {
        console.info(`Receive data : ${data.toString()}`);
    })
});

const body = JSON.stringify({
    firstName: "MDeanDwi",
    lastName: "Bekti",
})

request.write(body);
request.end();
