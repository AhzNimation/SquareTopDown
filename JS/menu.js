// Change the Speak of the Player
const playerSpk = document.getElementById('player-spk');

let spk = [
    'HI!',
    'I Hope You Like The Game',
    'Sub <a style="color: black;" href="https://www.youtube.com/channel/UCcxo20E7PJ0CjIOHhVedfGg">Ahz Stream</a>',
    'Follow my <a style="color: black;" href="https://www.instagram.com/ahznimation24/">Instagram</a>'
];

function setSpeak() {
    let randomTime = Math.floor(Math.random() * 3) * 1000 + 500;
    console.log(randomTime);
    let random = Math.floor(Math.random() * spk.length);
    playerSpk.innerHTML = spk[random];
    setTimeout(setSpeak, randomTime);
}
setSpeak();

// How to Play Function
const howToPlay = document.getElementById('how-to-play');

function openHowToPlay(){
    howToPlay.classList.remove('hide');
}
function closeHowToPlay(){
    howToPlay.classList.add('hide');
}