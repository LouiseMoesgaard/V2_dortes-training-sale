//CONFIG
let autoScrollTimer = 8000;

//Internal
let shownIndex = 0;
let carouselInterval = null;


const initializeCarousel = ()=> {
    displayReference(references[shownIndex])
    const buttons = document.querySelectorAll(".references_wrapper svg");
    buttons[0].addEventListener('click', carouselLeft)
    buttons[1].addEventListener('click', carouselRight)
    renderLegend();
    carouselInterval = setInterval(carouselRight, autoScrollTimer);

}

const carouselLeft = ()=>{
    const legendBtns = document.querySelectorAll('.legend');
    let reference = document.querySelector(".references_wrapper .reference article");
    shownIndex--;
    if(shownIndex < 0){
        shownIndex = references.length-1;
    }
    legendBtns.forEach((elm)=>elm.classList.remove('active'));
    reference.classList.add('slideRightNFadeOut');
    reference.addEventListener('animationend', ()=> {
        legendBtns[shownIndex].classList.add('active')
        displayReference(references[shownIndex])
        let reference = document.querySelector(".references_wrapper .reference article");
        reference.classList.add('slideRightNFadeIn');
        reference.addEventListener('animationend', ()=> {
            reference.classList.remove('slideRightNFadeIn');
        });
    });
}

const carouselRight = ()=>{
    const legendBtns = document.querySelectorAll('.legend');
    let reference = document.querySelector(".references_wrapper .reference article");
    shownIndex++;
    if(shownIndex > references.length-1){
        shownIndex = 0;
    }
    legendBtns.forEach((elm)=>elm.classList.remove('active'));
    reference.classList.add('slideLeftNFadeOut');
    reference.addEventListener('animationend', ()=> {
        legendBtns[shownIndex].classList.add('active')
        displayReference(references[shownIndex])
        let reference = document.querySelector(".references_wrapper .reference article");
        reference.classList.add('slideLeftNFadeIn');
        reference.addEventListener('animationend', ()=> {
            reference.classList.remove('slideLeftNFadeIn');
        });
    });
}

const renderLegend = ()=> {
    const legendWrapper = document.createElement('div');
    legendWrapper.classList.add('legend_wrapper');
    references.forEach((element, i) => {
        const newLegend = document.createElement('button');
        newLegend.setAttribute('type', 'button');
        newLegend.classList.add('legend');
        newLegend.addEventListener('click', ()=>{
            document.querySelectorAll('.legend').forEach((elm)=>elm.classList.remove('active'));
            newLegend.classList.add('active');
            shownIndex = i-1;
            carouselRight();
        })
        legendWrapper.appendChild(newLegend);
    });
    document.querySelector('.references_wrapper').appendChild(legendWrapper);
}