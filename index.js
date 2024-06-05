// Actualización del reloj en tiempo real
let displayArea = document.getElementById("timeDisplay");
const updateClock = () => {
    let today = new Date();
    let hrs = addLeadingZero(today.getHours());
    let mins = addLeadingZero(today.getMinutes());
    let secs = addLeadingZero(today.getSeconds());
    displayArea.innerHTML = `${hrs} : ${mins} : ${secs}`;
}

const addLeadingZero = (timeUnit) => {
    return timeUnit < 10 ? `0${timeUnit}` : timeUnit;
}
setInterval(updateClock, 1000);

// Función para la cuenta regresiva
let countdownTimer;
const startCountdown = () => {
    let hrsCount = parseInt(document.getElementById("inputHours").value) || 0;
    let minsCount = parseInt(document.getElementById("inputMinutes").value) || 0;
    let secsCount = parseInt(document.getElementById("inputSeconds").value) || 0;

    if (secsCount > 0) {
        secsCount--;
    } else if (minsCount > 0) {
        minsCount--;
        secsCount = 59;
    } else if (hrsCount > 0) {
        hrsCount--;
        minsCount = 59;
        secsCount = 59;
    } else {
        clearTimeout(countdownTimer);
        alert("Tiempo finalizado!");
        return;
    }

    document.getElementById("inputHours").value = hrsCount;
    document.getElementById("inputMinutes").value = minsCount;
    document.getElementById("inputSeconds").value = secsCount;

    countdownTimer = setTimeout(startCountdown, 1000);
}

const pauseCountdown = () => {
    clearTimeout(countdownTimer);
}

const resetCountdown = () => {
    clearTimeout(countdownTimer);
    document.getElementById("inputHours").value = "";
    document.getElementById("inputMinutes").value = "";
    document.getElementById("inputSeconds").value = "";
}

// Función para el cronómetro
let watchTimer;
const operateWatch = () => {
    let ms = parseInt(document.getElementById("millisecondsWatch").value, 10) || 0;
    let sec = parseInt(document.getElementById("secondsWatch").value, 10) || 0;
    let min = parseInt(document.getElementById("minutesWatch").value, 10) || 0;
    let hr = parseInt(document.getElementById("hoursWatch").value, 10) || 0;

    ms++;
    if (ms >= 100) {
        ms = 0;
        sec++;
    }
    if (sec >= 60) {
        sec = 0;
        min++;
    }
    if (min >= 60) {
        min = 0;
        hr++;
    }

    document.getElementById("millisecondsWatch").value = ms;
    document.getElementById("secondsWatch").value = sec;
    document.getElementById("minutesWatch").value = min;
    document.getElementById("hoursWatch").value = hr;

    watchTimer = setTimeout(operateWatch, 10);
}

const pauseWatch = () => {
    clearTimeout(watchTimer);
}

const resetWatch = () => {
    clearTimeout(watchTimer);
    document.getElementById("millisecondsWatch").value = "00";
    document.getElementById("secondsWatch").value = "00";
    document.getElementById("minutesWatch").value = "00";
    document.getElementById("hoursWatch").value = "00";
}

// Función para la alarma
let mySound = new Audio("audio1.mp3");
let alarmTimer;
const activateAlarm = () => {
    let setHour = parseInt(document.getElementById("alarmHours").value);
    let setMin = parseInt(document.getElementById("alarmMinutes").value);
    let currentTime = new Date();

    if (setHour === currentTime.getHours() && setMin === currentTime.getMinutes()) {
        mySound.play();
    } else {
        alarmTimer = setTimeout(activateAlarm, 60000); // Comprueba cada minuto
    }
}

const deactivateAlarm = () => {
    mySound.pause();
    mySound.currentTime = 0;
    document.getElementById("alarmHours").value = "";
    document.getElementById("alarmMinutes").value = "";
    clearTimeout(alarmTimer);
}
