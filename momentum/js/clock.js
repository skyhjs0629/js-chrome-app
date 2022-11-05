// 시계

/* 그릇 ************************************************************ */
const clock = document.querySelector("#clock");


/* 동작 ************************************************************ */
function getClock() {
    const date = new Date();
    // 2글자가 되어야 하며, 그렇지 않다면 앞에 0 추가
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    clock.innerText = `${hours}:${minutes}:${seconds}`;
}

// 웹사이트 로드 되자마자 시간 보이도록
getClock();

setInterval(getClock, 1000);