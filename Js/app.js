// create the nav menu based on page sections
function createNavMenu() {
    const sectionsList = document.querySelectorAll('section');
    const menu = document.querySelector('.menu');
    let i = 1;
    for (const section of sectionsList) {
        const navItem = document.createElement('li');
        const link = section.getAttribute('id');
        menu.appendChild(navItem);
        navItem.innerHTML = `<a class='${link}' href='#${link}'>Section ${i}</a>`;
        i += 1;
    }
}

// to check if the section is totally or partially in viewport
function isSectionInViewport(element) {
    const rect = element.getBoundingClientRect();
    const viewPortHeight = (window.innerHeight || document.documentElement.clientHeight);
    const visibleHeight = Math.min(rect.bottom, viewPortHeight) - Math.max(rect.top, 0);
    const elementHeight = rect.bottom - rect.top;
    const isElementCompletelyInViewport = rect.top >= 0 && rect.bottom <= viewPortHeight;
    const isElementPartiallyInViewport = rect.top < viewPortHeight && rect.bottom > 0;
    const isViewportCoveredByElement = rect.top <= 0 && rect.bottom >= viewPortHeight;
    return (
        isElementCompletelyInViewport ||
        (isElementPartiallyInViewport && visibleHeight >= elementHeight * 0.55) ||
        isViewportCoveredByElement
    );
}

/* add active-section class to the section in the viewport and remove 
   if it goes out
*/
function addOrRemoveActiveClass(){
    const sectionsList = document.querySelectorAll('section');
    for (const section of sectionsList) {
        section.classList.toggle('active', isSectionInViewport(section));
    }
}

/* add active class to the nav element which is
   related to the viewed section
*/
function checkActiveLink() {
    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('li a');
    for(const section of sections) {
        if (isSectionInViewport(section)) {
            links.forEach(link => {
                if(link.classList.contains(section.id)) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            })
        }        
                

       
    }
}

createNavMenu();
document.addEventListener('scroll', addOrRemoveActiveClass);
document.addEventListener('scroll', checkActiveLink);
