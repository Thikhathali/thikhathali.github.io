import Typed from './typed.js-main/typed.js';

const log = console.log;
let feCardBox = document.querySelector('.front-end .cards-box');
let beCardBox = document.querySelector('.back-end .cards-box');
let caCardBox = document.querySelector('.console-apps .cards-box');
let elFrontEnd = document.querySelector('.front-end');
let header = document.querySelector(".header");
let ulHeader = document.querySelector(".header ul");
let btnClose = document.querySelector(".portfolio-content");
let cards = '';

async function getRepos (){
    const apiUrl = 'https://api.github.com/users/Thikhathali/repos';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if(data) { 
            const dataByFE = data.filter(items => items.language === 'HTML'
            || items.language === 'JavaScript');
            const filteredData = [];

            for (let i = 0; i < dataByFE.length; i++) {
                if(i === 1 || i === 2 || i === 9 || i === 6 || i == 10 || 
                    i == 5) {
                    continue;
                }
                filteredData.push(dataByFE[i]);
            }
            log(dataByFE);
            log(filteredData);
            mapCards(filteredData);
        }
    } catch (error){
        alert('An error occured: check network ... server 404 ', error);
    }
}

getRepos();

const mapCards = (array) => {
    for (let i = 0; i < array.length; i++) {            
        cards += `  
        <div class="card">
            <div class="card-image">
                <img src="./images/portfolio/project-${i}.png">
            </div>
            <div class="content-placeholder">
                <h1>${array[i].name}</h1>
                <p>${array[i].description}</p>
                <p>${array[i].created_at}</p>
                <a href="${array[i].html_url}" target="_blank">
                    <i class="fab fa-github"></i>
                </a>
                <a href="${array[i].homepage}" target="_blank">
                    <i class="fas fa-eye"></i>
                </a>
            </div>
        </div>
    `            
    }
    feCardBox.innerHTML = cards;
}

window.onscroll = () => scrollFunction();

const scrollFunction = () => {
    const aTag = header.querySelectorAll('a');
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        // header.style.background = "#2C3639";
        // header.style.boxShadow = "0 15px 0 rgba(0, 0, 0, 0.2)";
        // header.style.opacity = "0.9";
        header.classList.add('new');

        if(window.innerWidth <= 728 && document.body.scrollTop > 50  || 
            document.documentElement.scrollTop > 50) {
            ulHeader.classList.add('mobile-nav');
        }

        aTag.forEach(tag => {
            tag.style.color = "#ffffff";
        });

    } else {
        // header.style.background = "#DCD7C9";
        header.classList.remove('new');

        if(window.innerWidth <= 728) {
            ulHeader.classList.remove('mobile-nav');
        }

        aTag.forEach(tag => {
            tag.style.color = "#2C3639";
        });
    }
}

// let roles = ['Full Stack Developer', 'IT Professional' ];
// let txtPosition = 0;
// let speed = 100;

// const showRoles = () => {  
//     document.querySelector('.intro h1').innerHTML = roles[0].substring(0, txtPosition) +
//     "<span>\u25ae</span>";

//     if(txtPosition++ !== roles[0].length) {
//         setTimeout(showRoles, speed);
//     }
// }

// showRoles();

let typed = new Typed(".auto-type", {
    strings: ["Thikhathali", "a Full Stack Developer", "an IT Professional",
              "good^2000 at what I do!"
            ],
    typeSpeed: 100,
    backSpeed: 90,
    loop: true
});

const blurEffect = () => {
    document.querySelector('.home').style.filter = "blur(10px)";
    document.querySelector('.resume').style.filter = "blur(10px)";
    document.querySelector('.skills').style.filter = "blur(10px)";
    document.querySelector('.portfolio h1').style.filter = "blur(10px)";
    document.querySelector('.portfolio-content .proj:not(div .front-end)').classList.add('blurBg');
    document.querySelector('.portfolio-content .be-projects').classList.add('blurBg');
    document.querySelector('.portfolio-content .ca-projects').classList.add('blurBg');
    document.querySelector('#contact').style.filter = "blur(10px)";
}

const resetBlurEffect = () => {
    document.querySelector('.home').style.filter = "blur(0)";
    document.querySelector('.resume').style.filter = "blur(0)";
    document.querySelector('.skills').style.filter = "blur(0)";
    document.querySelector('.portfolio h1').style.filter = "blur(0)";
    document.querySelector('.portfolio-content > .proj:not(div .front-end)').classList.remove('blurBg');
    document.querySelector('.portfolio-content .be-projects').classList.remove('blurBg');
    document.querySelector('.portfolio-content .ca-projects').classList.remove('blurBg');
    document.querySelector('#contact').style.filter = "blur(0)";
}

document.querySelector('.fe-projects').addEventListener('click', () =>{
    // btnClose.classList.add('btnShow');
    elFrontEnd.classList.add('show');

    let elCloseBtn = document.createElement("button");
    elCloseBtn.textContent = "x";
    elCloseBtn.id = "close";
    elCloseBtn.classList.add("animate", "slide-in-above", "animate--slow");

    elFrontEnd.appendChild(elCloseBtn);
    blurEffect();
});

btnClose.addEventListener('click', (e) => {
    if(e.target.nodeName === 'BUTTON') {        
        elFrontEnd.classList.remove('show');
        elFrontEnd.removeChild(e.target);
        resetBlurEffect();
    }
});