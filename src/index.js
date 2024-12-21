import { reset, styles } from "./assets";

// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[location]/[date1]/[date2]?key=M2LN6SAFB33F6JKH24YB45ASD


const button = document.querySelector("button");
const input = document.querySelector("input");
const content = document.querySelector("#content");

const schema = {
    path: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/",
    key: "?key=M2LN6SAFB33F6JKH24YB45ASD"
};

async function getWeatherData(place) {
    const response = await fetch(`${schema.path}/${place}/${schema.key}`);
    if(response.status === 200) return response.json();
    else throw new Error("invalid query");
};

button.addEventListener("click", handleInput);
input.addEventListener('keyup', e => {
    if(e.key === "Enter") {
        handleInput(e);
    };
})

function handleInput(e) {
    content.textContent = "";
    getWeatherData(input.value).then(response => {
        console.log(response);
        processData(response);
    }).catch(e=> {
        console.log(e);
        const invalidText = document.createElement("p");
        invalidText.textContent = "Invalid Query.";
        content.appendChild(invalidText);
    });
}

function processData(response) {
    const currentConditions = response.currentConditions;
    currentConditions.resolvedAddress = response.resolvedAddress;
    createConditionsTable(currentConditions);
}

function createConditionsTable(currentConditions) {
    const template = document.querySelector("#currentConditions");
    const clone = template.content.cloneNode(true);
    console.log(clone);
    for(const [key, value] of Object.entries(currentConditions)) {
        if(clone.querySelector(`#${key}`)) {
            if(value) clone.querySelector(`#${key}`).textContent = value;
            else clone.querySelector(`#${key}`).textContent = "None";
        }
    };
    content.appendChild(clone);
}