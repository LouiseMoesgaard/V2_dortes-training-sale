"use strict";

const id = new URLSearchParams(window.location.search).get("id");
    
function getPost(endpoint, callback){
    const url = "https://ariadna.dk/kea/Dortes-Training/wp/wp-json/wp/v2/";
    fetch(url + endpoint)
    .then(res => res.json())
    .then((data) => callback(data));
}

function displayPost(data){
    console.log(data);
    document.querySelector("main").innerHTML = data.content.rendered;
}


function getTrainingsform(trainings){
    console.log("this is training: ", trainings);
    const trainingsWrapper = document.querySelector(".trainings_wrapper");
trainingsWrapper.innerHTML = "";
const template = document.querySelector(".trainings_template");

trainings.forEach((object) =>{
    const clon = template.cloneNode(true).content;
    clon.querySelector("h2").textContent = object.training_title;
    clon.querySelector("p").textContent = object.short_text;
    clon.querySelector("img").src = object.image_home.guid;

    clon.querySelector("button").textContent = "Læs mere";
    clon.querySelector("button").addEventListener("click", (evt)=>{
        console.log(evt.target.innerHTML);
        console.log(object.id);
        location.href = "/html/singleview.html?id=" + object.id;
    })
    trainingsWrapper.appendChild(clon);
})
}

function showTrainingDetails(trainings){
    console.log(trainings);

const trainingsWrapper = document.querySelector("main");
trainingsWrapper.innerHTML = "";
const template = document.querySelector(".training_template");

trainings.forEach((object) =>{
    if(id == object.id){
        const clon = template.cloneNode(true).content;
        clon.querySelector("h2").textContent = object.training_title;
        // clon.querySelector(".sm-txt").textContent = object.short_text;
        clon.querySelector(".lg-txt").textContent = object.long_text;
        clon.querySelector(".img1").src = object.image_home.guid;
        clon.querySelector(".img2").src = object.image_2.guid;
        clon.querySelector(".img3").src = object.image_3.guid;
        trainingsWrapper.appendChild(clon);

    }
}) 
}

