/*------------------------------Navigation Menu----------------------*/ 

(()=>{
    const hamburgetBtb = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu");

    hamburgetBtb.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);


    function showNavMenu(){
        navMenu.classList.toggle("open");
        bodyScrollingToggle();
    }

    function hideNavMenu(){
        navMenu.classList.remove("open");
        fadeOutEffect();
        bodyScrollingToggle();
    }

    function fadeOutEffect(){
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(()=>{
            document.querySelector(".fade-out-effect").classList.add("active");
        },200)
    }

    document.addEventListener("click",(event)=>{
        if(event.target.classList.contains('link-item')){
            if(event.target.hash !==" "){
                    //prevent default anchor click behavior
                event.preventDefault();
                const hash = event.target.hash;
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");
                // activate existing active 'section'
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");
                // active new 'section'
                navMenu.querySelector(".active").classList.add("outer-shadow",
                "hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active", "inner-shadow");
            if(navMenu.classList.contains("open")){
                // active new naavigation menu 'Linlk-item'
                event.target.classList.add("active", "inner-shadow");
                event.target.classList.remove("outer-shadow","hover-in-shadow");
                // Hide navigation Menu
                hideNavMenu();
               }else{
                   let navItems = navMenu.querySelectorAll(".link-item");
                   navItems.forEach((item)=>{
                       if(hash === item.hash){
                        //    
                        item.target.classList.add("active","inner-shadow");
                        item.target.classList.remove("outer-shadow","hover-in-shadow");
                       }
                   })
                   fadeOutEffect();
               }
                window.location.hash = hash;
                
            }
        }
    })

})();

/*----about section tab----*/

(() =>{
    const aboutSection = document.querySelector(".about-section"),
    tabsContainer= document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) =>{
        
        if(event.target.classList.contains("tab-item") && 
         !event.target.classList.contains("active")){
             
           const target = event.target.getAttribute("data-target");
           //deactivate existing active 'tab-item'
           tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");
           //active new 'tab-item'
           event.target.classList.add("active", "outer-shadow");
           //deactive existing active 'tab-item'
           aboutSection.querySelector(".tab-content.active").classList.remove(
                   "active");
                   //active new 'tab-content'
            aboutSection.querySelector(target).classList.add("active");
        }
    })
})();

function bodyScrollingToggle(){
    document.body.classList.toggle("stop-scrolling");

}

/*----------portafolio Filter and Popup----------*/ 

(()=>{
    const filterContainer = document.querySelector(".portafolio-filter"),
    portafolioItemsContainer = document.querySelector(".portafolio-items"),
    portafolioItems = document.querySelectorAll(".portafolio-item"),
    popup = document.querySelector(".portafolio-popup"),
    prevBtn=popup.querySelector(".pp-prev"),
    nextBtn=popup.querySelector(".pp-next"),
    closeBtn=popup.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, screenshots;

    filterContainer.addEventListener("click",(event)=>{
        if(event.target.classList.contains("filter-item") && !event.target.classList.contains("active")){
            filterContainer.querySelector(".active").classList.remove("outer-shadow",
            "active");

            event.target.classList.add("active","outer-shaadow");
            const target = event.target.getAttribute("data-target");
            portafolioItems.forEach((item)=>{
                if(target === item.getAttribute("data-category")|| target == 'all'){
                    item.classList.remove("hide");
                    item.classList.add("show");
                }else{
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })
        }
    })
    portafolioItemsContainer.addEventListener("click", (event)=>{
        if(event.target.closest(".portafolio-item-inner")){
            const portafolioItem = event.target.closest(".portafolio-item-inner").parentElement;
            // get PortafolioItems index
            itemIndex =Array.from(portafolioItem.parentElement.children).indexOf(
                portafolioItem);
                screenshots = portafolioItems[itemIndex].querySelector(".portafolio-item-img img")
                .getAttribute("data-screenshots");
                //convert screenshots into array
                screenshots = screenshots.split(",");
                if(screenshots.length === 1){

                  prevBtn.style.display="none";
                  nextBtn.style.display="none";

                }else{

                prevBtn.style.display="block";
                nextBtn.style.display="block";

                }
                slideIndex = 0;
                popupToggle();
                popupSlideshow();
                popupDetails();
        }
    })
    closeBtn.addEventListener("click",()=>{
        popupToggle();
        if(projectDetailsContainer.classList.contains("active")){
            popupDetailsToggle();
        }
    })

    function popupToggle(){
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }

    function popupSlideshow(){
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img")
        // activate loader until the popuImg loaded
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload =() =>{
            //deativate loader after the popupImg loaded
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + " of " +
        screenshots.length;
    }
    //next slide
    nextBtn.addEventListener("click",() =>{
        if(slideIndex === 0){
            slideIndex = screenshots.length-1
        }
        else{
            slideIndex++;
        }
        popupSlideshow();
    })

    //prev Slide
    prevBtn.addEventListener("click",()=>{
        if(slideIndex === 0){
            slideIndex = screenshots.length-1
        }
        else{
            slideIndex--;
        }
        popupSlideshow();
    })

    function popupDetails(){
        // if portafolio-item-details no exists
        if(!portafolioItems[itemIndex].querySelector(".portafolio-item-details")){
            projectDetailsBtn.style.display = "none";
            return;
        }
        projectDetailsBtn.style.display ="block";
        // get the project details
        const details = portafolioItems[itemIndex].querySelector(".portafolio-item-details").innerHTML;
        //set project details
        popup.querySelector(".pp-project-details").innerHTML = details;
        //get the project title
        const title = portafolioItems[itemIndex].querySelector(".portafolio-item-title").innerHTML;
        //set the portafolio title
        popup.querySelector(".pp-title h2").innerHTML = title;
        //get the project category
        const category = portafolioItems[itemIndex].getAttribute("data-category");
        //set the project category
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
    }
    projectDetailsBtn.addEventListener("click",()=>{
        popupDetailsToggle();
    })

    function popupDetailsToggle(){
        if(projectDetailsContainer.classList.contains("active")){
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px"
        }
        else{
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer
            .scrollHeight + "px";
            popup.scrollTo(0,projectDetailsContainer.offsetTop);

        }
    }   

})();

/*-------------------------hide all section except active------ -------*/ 
window.addEventListener("load", ()=>{
    // preloader
document.querySelector(".preloader").classList.add("fade-out");
setTimeout(()=>{
    document.querySelector(".preloader").style.display="none";
},600)

})