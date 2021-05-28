const menu = document.querySelector("nav .menu");
const burger = document.querySelector("nav .burger");
const nav = document.querySelector('nav');
const navItems = nav.querySelectorAll('a')

toggleMobileMenu();
setActive();

burger.addEventListener("click", function() {
    burger.classList.toggle('close');
    menu.classList.toggle('hide');
})

window.addEventListener("resize", toggleMobileMenu);

function toggleMobileMenu() {
    if(!detectMobile()){
        nav.classList.add("nav-white");
        burger.classList.add('hide');
        menu.classList.remove('hide');
        menu.classList.add("desktop");
    } else {
        nav.classList.remove("nav-white");
        burger.classList.remove('hide');
        menu.classList.add('hide');
        menu.classList.remove("desktop");
    }
}

function detectMobile() {
    return ( ( window.innerWidth <= 800 ) && ( window.innerHeight <= 1024 ) );
}

function setActive() {
    // console.log(navItems);
    let navItem = null;
    navItems.forEach(function(item){
        if(item.getAttribute("href") === window.location.pathname){
            navItem = item;
        }
    });
    if(!navItem){
        navItem = navItems[0];
    }
    navItem.classList.add('active');
}