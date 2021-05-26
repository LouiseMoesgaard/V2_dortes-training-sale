"use strict";
let references = null;
window.addEventListener("load", fetchData);

function fetchData(){
    const url = "https://ariadna.dk/kea/Dortes-Training/wp/wp-json/wp/v2/";
    const endpoint = [url + "home", url + "reference", url + "training"];
    getAllEndpoints(endpoint, getHomeContent);
}

async function getAllEndpoints(endpointsArray, callback) {
    const data= await Promise.all(endpointsArray.map((endpoint) => fetch(endpoint)
     .then((response) => response.json())
     ));
     callback(data);
   }

function getHomeContent(data){
    displayHome(data[0]);
    references = data[1];
    displayTrainings(data[2]);
    initializeCarousel();
    // setTimeout(hideLoader, 500);
    hideLoader();
}

function displayHome(data){
    const splash = data[0];
    document.querySelector(".splah_img").src = splash.splash_img.guid;
    document.querySelector(".title_desktop").textContent = splash.main_title;
    document.querySelector(".title_mobil").textContent = splash.main_title;
    document.querySelector(".subtitle_desktop").textContent = splash.main_subtitle;
    document.querySelector(".subtitle_mobil").textContent = splash.main_subtitle;
    document.querySelector(".cta_home").textContent = splash.cta;
    document.querySelector(".list_title h2").textContent = splash.ul_title;
    document.querySelector(".list").innerHTML = splash.list_4_items;

    document.querySelector(".cta_home").addEventListener("click", ()=>{
        window.location= "/html/firmaaftale.html";
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

function hideLoader(){
    document.querySelector(".loader_wrapper").classList.add("hide");
}
