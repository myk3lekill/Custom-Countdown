//DOM
const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

let countdownTitle = '';
let countdownDate = '';


//Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0];
console.log('today\'s date', today)
dateEl.setAttribute('min', today)

//Take values from from input
function updateCountdown(e) {
    e.preventDefault(); //preventDefault method prevent the refresh of the page at submit's press
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value
    console.log(countdownTitle, countdownDate)
}

//Event Listeners
countdownForm.addEventListener('submit', updateCountdown)