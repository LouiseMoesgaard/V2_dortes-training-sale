"use strict";
let references = null
window.addEventListener("load", fetchData);

function fetchData(){
    const url = "https://ariadna.dk/kea/Dortes-Training/wp/wp-json/wp/v2/";
    const endpoint = [url + "posts", url + "reference", url + "training"];
    getAllEndpoints(endpoint, getHomeContent);
}

async function getAllEndpoints(endpointsArray, callback) {
    const data= await Promise.all(endpointsArray.map((endpoint) => fetch(endpoint)
     .then((response) => response.json())
     ));
     callback(data);
   }

function getHomeContent(data){
    displayPostHome(data[0]);
    references = data[1];
    displayTrainings(data[2]);
    initializeCarousel();
}

function displayPostHome(post){
    post.forEach((elm) =>{
        if(elm.id == 96){
         const homePost = elm.content.rendered;
         document.querySelector("main").innerHTML = homePost; 
        }
     })
}

function displayReference(object){
    const referenceWrapper = document.querySelector(".references_wrapper .reference");
    referenceWrapper.innerHTML = "";
    const template = document.querySelector(".references_template");
        const clon = template.cloneNode(true).content; 
        clon.querySelector("p").textContent = object.text_1;
        clon.querySelector("h2").textContent = object.person_name + ",   " + object.firma_name;
        referenceWrapper.appendChild(clon);
}

function displayTrainings(trainings){

const trainingsWrapper = document.querySelector(".trainings_wrapper");
trainingsWrapper.innerHTML = "";
const template = document.querySelector(".trainings_template");

trainings.forEach((object) =>{
    const clon = template.cloneNode(true).content;
    clon.querySelector("img").src = object.image_home.guid;
    clon.querySelector("button").textContent = object.cta;
    clon.querySelector("button").addEventListener("click", (evt)=>{
        console.log(evt.target.innerHTML);
        console.log(object.id);
        location.href = "/html/singleview.html?id=" + object.id;
    })
    trainingsWrapper.appendChild(clon);
})
}

    


      
