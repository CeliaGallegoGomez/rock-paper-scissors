// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

const gameContainerEl =document.getElementById("game-container");
const winningTextEl =document.getElementById("winning-text");
const choosenImageEl = document.getElementById("choosen-image");
const choosenImagePcEl= document.getElementById("choosen-image-pc");
const pointsEl = document.getElementById("points");
const pointsPcEl =document.getElementById("points-pc");
const moveContainerEl = document.getElementById("move-container");
const retryEl = document.getElementById("retry");
const normsEl = document.getElementById("norms");

let points = 0;
let pointsPc =0;
let userSelection;
let pcSelection;


const pcOptions = ["paper","rock","scissors"];


const gamesOptions = {
    paper:{
        rock:true,
        scissors:false,
        lizard:false,
        spock:false,
    },

    rock:{
        paper:false,
        scissors:true,
        lizard:true,
        spock:false,
    },

    scissors:{
        paper:true,
        rock:false,
        lizard:true,
        spock:false,
    },

    lizard:{
        paper:true,
        rock:false,
        scissors:false,
        spock:true,
    },

    spock:{
        paper:false,
        rock:true,
        scissors:true,
        lizard:false, 
    },

};

const results = ()=>{
    if (userSelection===pcSelection){
        winningTextEl.textContent="TIE";
        return;
    }

    if(gamesOptions[userSelection][pcSelection]){
        winningTextEl.textContent ="YOU WIN";
        points++;
    } else{
        winningTextEl.textContent ="YOU LOSE";
        pointsPc++;
    }
    pointsEl.textContent=points;
    pointsPcEl.textContent=pointsPc;
    hideGame();
}


const gameImage = {
    paper: "../assets/images/icon-paper.svg",
    rock: "../assets/images/icon-rock.svg",
    scissors: "../assets/images/icon-scissors.svg",
    lizard: "../assets/images/icon-lizard.svg",
    spock: "../assets/images/icon-spock.svg",
};


const changeResultImage =()=>{
    choosenImageEl.src=gameImage[userSelection];
    choosenImagePcEl.src=gameImage[pcUserSelection];
    results();
    changeResultClasses();
}


const changeResultClasses =()=>{
    const firstUser = choosenImageEl.parentElement;
    const lastUser = firstUser.classList.length-1;

    const firstUserPc = choosenImagePcEl.parentElement;
    const lastUserPc = firstUserPc.classList.length-1;

    firstUser.classList.remove(firstUser.classList[lastUser]);
    firstUser.classList.add(userSelection);

    firstUserPc.classList.remove(firstUserPc.classList[lastUserPc]);
    firstUserPc.classList.add(pcSelection)
}

const createPcSelection =()=>{
    const randomNumber =Math.floor(Math.random()*pcOptions.length);
    pcSelection = pcOptions[randomNumber];
    console.log(userSelection +"---"+pcSelection);
    changeResultImage()
}

const createUserSelection =(event)=>{
    userSelection =event.target.dataset.item;
    createPcSelection();
}

const hideGame = ()=>{
    gameContainerEl.classList.add('hide');
    moveContainerEl.classList.remove('hide');
}

const hideMove = ()=>{
    gameContainerEl.classList.remove('hide');
    gameContainerEl.classList.add('hide');
}


if (document.body.dataset.mode==="advanced"){
    pcOptions.push('spock','lizard');
};

gameContainerEl.addEventListener("click",createUserSelection);
retryEl.addEventListener("click",hideMove);