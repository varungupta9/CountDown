const inputContainer = document.getElementById('input-container')
const countdownForm = document.getElementById('countdownForm')
const dateEl = document.getElementById('date-picker')
const countdownEl = document.getElementById('countdown')
const countdownBtn = document.getElementById('countdown-button')
const countdownElTitle = document.getElementById('countdown-title')
const timeElements = document.querySelectorAll('span')
const completeEl = document.getElementById('complete')
const completeElInfo = document.getElementById('complete-info')
const completeBtn = document.getElementById('complete-button')



const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min',today)
let savedCountdown;
let countdownTitle = ''
let countdownDate=''
let countdownActive;
let countdownValue = Date
const second = 1000
const minute = second*60
const hour = minute*60
const day = hour*24

function updateDom(){
 
    countdownActive=setInterval(() =>{
        const now = new Date().getTime()
        const distance = countdownValue-now
        const days = Math.floor(distance/day)
        const hours = Math.floor((distance%day)/hour)
        const minutes = Math.floor((distance%hour)/minute)
        const seconds = Math.floor((distance%minute)/second)
        countdownTitle.textContent=`${countdownTitle}`
        inputContainer.hidden=true

        if(distance<0){
        countdownEl.hidden=true
        clearInterval(countdownActive)
        completeElInfo.textContent=`${countdownTitle} ended on ${countdownDate}`    
        completeEl.hidden=false}
        else{

        timeElements[0].textContent=`${days}`
        timeElements[1].textContent=`${hours}`
        timeElements[2].textContent=`${minutes}`
        timeElements[3].textContent=`${seconds}`
        completeEl.hidden=true
        countdownEl.hidden=false
        }
    
      

    },second)


    
}


function updateCountdown(e){
    e.preventDefault()
    countdownTitle=e.srcElement[0].value
    countdownDate=e.srcElement[1].value
    savedCountdown={
        title:countdownTitle,
        date:countdownDate
    }
    localStorage.setItem('countdown',JSON.stringify(savedCountdown))
    if(countdownDate===''){alert("Please select date")}
    else{
    countdownValue = new Date(countdownDate).getTime()
    updateDom()
    }

}



function reset(){
    countdownEl.hidden=true
    inputContainer.hidden=false
    completeEl.hidden=true
    clearInterval(countdownActive)
    countdownTitle=''
    countdownDate=''
    localStorage.removeItem('countdown')
}

function restore(){
    if(localStorage.getItem('countdown')){
        inputContainer.hidden=true
        savedCountdown=JSON.parse(localStorage.getItem('countdown'))
        countdownTitle=savedCountdown.title
        countdownDate=savedCountdown.date
        countdownValue = new Date(countdownDate).getTime()
        updateDom()
        
    }
}
countdownForm.addEventListener('submit',updateCountdown)
countdownBtn.addEventListener('click',reset)
completeBtn.addEventListener('click',reset)

restore();