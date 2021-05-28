"use strict";

let references = null;
const id = new URLSearchParams(window.location.search).get("id");
const url = "https://ariadna.dk/kea/Dortes-Training/wp/wp-json/wp/v2/";

function getPost(endpoint, callback){
    fetch(url + endpoint)
    .then(res => res.json())
    .then((data) => callback(data));
   
}

async function getAllEndpoints(endpoints, callback) {
    const endpointsArray = endpoints.map(key => url + key);
    const data= await Promise.all(endpointsArray.map((endpoint) => fetch(endpoint)
     .then((response) => response.json())
     ));
     callback(data);
}


function displayPost(data){
    document.querySelector("main").innerHTML = data.content.rendered;
    hideLoader();
    submitForm();
}


function getTrainingsform(trainings){
    const trainingsWrapper = document.querySelector(".trainings_wrapper");
    trainingsWrapper.innerHTML = "";
    const template = document.querySelector(".trainings_template");

trainings.forEach((object) =>{
    const clon = template.cloneNode(true).content;
    clon.querySelector("h2").textContent = object.training_title;
    clon.querySelector("p").textContent = object.short_text;
    clon.querySelector("img").src = object.image_home.guid;

    clon.querySelectorAll("button").forEach((button) =>{
        button.textContent = "Læs mere";
    })

    clon.querySelectorAll("button").forEach((button) =>{
        button.addEventListener("click", () =>{
            location.href = "/html/singleview.html?id=" + object.id; 
        })
    })
    trainingsWrapper.appendChild(clon);
})

hideLoader();
}

function showTrainingDetails(trainings){

    const trainingsWrapper = document.querySelector("main");
    trainingsWrapper.innerHTML = "";
    const template = document.querySelector(".training_template");

trainings.forEach((object) =>{
    if(id == object.id){
        const clon = template.cloneNode(true).content;
        const breadcrumbLink = document.createElement('a');
        breadcrumbLink.setAttribute('href', `/html/singleview.html?id=${object.id}`)
        breadcrumbLink.innerText = object.training_title;
        clon.querySelector('.breadCrumbs').appendChild(breadcrumbLink)
        clon.querySelector(".h1_line").textContent = object.training_title;
        // clon.querySelector(".sm-txt").textContent = object.short_text;
        clon.querySelector(".lg-txt").textContent = object.long_text;
        clon.querySelector(".img1").src = object.image_home.guid;
        clon.querySelector(".img2").src = object.image_2.guid;
        clon.querySelector(".img3").src = object.image_3.guid;
        trainingsWrapper.appendChild(clon);

        document.querySelector(".carousel-item .img1").src = object.image_home.guid;
        document.querySelector(".carousel-item .img2").src = object.image_2.guid;
        document.querySelector(".carousel-item .img3").src = object.image_3.guid;

    }
}) 

submitForm();
hideLoader();
}

function getFirmaaftale(data){
    const content = data[0][0];

    document.querySelector(".page_header").textContent = content.page_header;
    document.querySelector(".firma_text").innerHTML = content.firma_text;
    document.querySelector(".firma_img").src = content.firma_img.guid;
    document.querySelector(".contact_wrapper").innerHTML = content.kontakt_info;
    document.querySelector(".fordele_header").textContent = content.fordele_header;
    document.querySelector(".fordele_col1_header").textContent = content.fordele_col1_header;
    document.querySelector(".fordele_col1_list").innerHTML = content.fordele_col1_list;
    document.querySelector(".fordele_col2_header").textContent = content.fordele_col2_header;
    document.querySelector(".fordele_col2_list").innerHTML = content.fordele_col2_list;

    const prices = data[1];
    const pricesWrapper = document.querySelector(".prices_wrapper");
    pricesWrapper.innerHTML = "";
    const template = document.querySelector(".price_template");
    prices.forEach(object =>{
      
        const clon = template.cloneNode(true).content;
        clon.querySelector(".price_name").textContent = object.price_name;
        clon.querySelector(".price_type").textContent = object.price_type;
        clon.querySelector(".price_number").textContent = object.price_number;
        clon.querySelector(".price_list").innerHTML = object.price_list;

        pricesWrapper.appendChild(clon);
    })

    hideLoader();
}

function getOmMig(data){
    const page = data[0];
    document.querySelector(".om_mig_header").textContent = page.om_mig_header;
    document.querySelector(".om_mig_text").innerHTML = page.om_mig_text;
    document.querySelector(".om_mig_img").src = page.om_mig_img.guid;
    document.querySelector(".om_mig_cta").textContent = page.om_mig_cta;
    document.querySelector(".values_header").textContent = page.values_header;
    document.querySelector(".values_img").src = page.values_img.guid;
    document.querySelector(".values_text").innerHTML = page.values_text;
    document.querySelector(".values_list").innerHTML = page.values_list;
    document.querySelector(".cv_header").textContent = page.cv_header;
    document.querySelector(".cv_text").innerHTML = page.cv_text;
    document.querySelector(".cv_list").innerHTML = page.cv_list;

    hideLoader();

}

function getFqaList(fqaList){
    const fqaWrapper = document.querySelector(".fqa-section");
    fqaWrapper.innerHTML = "";
    const template = document.querySelector(".fqa-container");

    fqaList.forEach((object)=>{
        const clon = template.cloneNode(true).content;
        clon.querySelector(".fqa-header").textContent = object.question;
        clon.querySelector(".fqa-p").innerHTML = object.answer;
        fqaWrapper.appendChild(clon);
    })

    document.querySelectorAll(".fqa-item").forEach(elm =>{
        elm.addEventListener("click", ()=>{
            elm.classList.toggle("fqa-collapse");
        })
    })

    hideLoader();
}

function submitForm(){  
 const form = document.querySelector("form");

 if(form !== null){
    form.addEventListener("submit", (e)=>{
        e.preventDefault();
        document.querySelector("#name").value = " ";
        document.querySelector("#firma").value = " ";
        document.querySelector("#email").value = " ";
        document.querySelector("#message").value = " ";

        if(document.querySelector("#stilling")){
           document.querySelector("#stilling").value = " "; 
        }
        displayPopup();
    })
 }

}

function displayPopup(){
    window.scrollTo(0, 0);
     const overlay = document.querySelector(".overlay");
     const modal = document.querySelector(".form_modal");
     const body = document.querySelector("body");
     const closeBtn = document.querySelector(".m_close");

     overlay.classList.remove("hide");
     modal.classList.remove("hide");
     body.classList.add("noscroll");
     
    closeBtn.addEventListener("click", ()=>{
        overlay.classList.add("hide");
        modal.classList.add("hide");
        body.classList.remove("noscroll");
    })
}

function hideLoader(){
   
    document.querySelector(".loader_wrapper").classList.add("hide");
}

// to display the frontpage

function getHomeContent(data){
    displayHome(data[0]);
    references = data[1];
    displayTrainings(data[2]);
    initializeCarousel();
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
    clon.querySelector("button").addEventListener("click", ()=>{
        location.href = "/html/singleview.html?id=" + object.id;
    })
    trainingsWrapper.appendChild(clon);
})
}
