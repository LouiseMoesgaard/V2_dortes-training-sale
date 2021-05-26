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
    // setTimeout(hideLoader, 500);
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

// setTimeout(hideLoader, 500);
hideLoader();
}

function showTrainingDetails(trainings){

    const trainingsWrapper = document.querySelector("main");
    trainingsWrapper.innerHTML = "";
    const template = document.querySelector(".training_template");

trainings.forEach((object) =>{
    if(id == object.id){
        const clon = template.cloneNode(true).content;
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
// setTimeout(hideLoader, 500);
hideLoader();
}

 function getFqaList(fqaList){
    console.log("fqaList is: ", fqaList);
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

    // setTimeout(hideLoader, 500);
    hideLoader();
 }


 function submitForm(){  
 const form = document.querySelector("form");
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
