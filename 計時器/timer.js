import ("../jquery-3.6.4.min.js");

console.log(location.hash)
if (document.location.hash) {
    document.body.innerHTML = decodeURI(document.location.hash.slice(1));
    stop();
}

let isRunning = false;
let timer;
let settedTime = 0;

function startStop() {
    if (isRunning) {
        clearInterval(timer)
        document.getElementById("start-stop") = "繼續";
    } else {
        settedTime = new Date(document.getElementById("set-time").value).getTime();
        if (!isNaN(settedTime)) {
            updateTimer();
            timer = setInterval(updateTimer, 1000);
            document.getElementById("start-stop").textContent = "暫停";
        } else {
            window.open(
                document.location.href + "#log",
                "mozillaWindow",
                pop=1,
            )
        }
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    $("#set-time").value = "";
    $("#start-top").text = "開始";
    isRunning = false;
    settedTime = 0;
    updateDisplay(0);
}

function updateDisplay(milliseconds) {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
    const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);

    const display = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    $("#time-display").text = display;
}

function updateTimer() {
    const currentTime = new Date().getTime();
    const remainTime = settedTime - currentTime;
    if (remainTime <= 0) {
        clearInterval(timer);
        updateDisplay(0);
        window.open(
            document.location.href + "#指定時間: " + new Date(settedTime).toLocaleString() + "已到",
            "Time End",
            popup=1
        )
        $("#start-stop").text = "開始";
        isRunning = false;
    } else {
        updateDisplay(remainTime);
    }
}

$("#start-stop").click(startStop);
$("#reset").click(reset);