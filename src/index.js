import { reset } from "./assets";

// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[location]/[date1]/[date2]?key=M2LN6SAFB33F6JKH24YB45ASD

const schema = {
    path: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/",
    key: "?key=M2LN6SAFB33F6JKH24YB45ASD"
};

async function getWeatherData(place) {
    const response = await fetch(`${schema.path}/${place}/${schema.key}`);
    if(response.status === 200) return response.json();
    else return response;
}

const button = document.querySelector("button");
const input = document.querySelector("input");

button.addEventListener("click", e => {
    getWeatherData(input.value).then(response => {
        console.log(response);
    }).catch(e=>console.log(e));
});