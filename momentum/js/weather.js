const API_KEY = "bd33b77e87a4e05afdfad68fc1b15115";
const Image = document.createElement("img");

// 잘 됐을 시 실행 함수
function onGeoOk(position) {
    // 위도와 경도 얻어오기
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    // API url 얻어오기
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    // url 호출 -> 지역과 날씨 받아와서 출력
    fetch(url).then(response => response.json()).then(data => {
        const top = document.getElementById("weather-par");
        const city = document.querySelector("#weather-par span:first-child");
        const weather = document.querySelector("#weather-par span:last-child");
        // 날씨 아이콘 받아올 그릇
        const weatherIcon = data.weather[0].icon;
        const IconLink = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`

        // 이미지 태그 생성
        Image.src = IconLink;
        top.appendChild(Image);

        city.innerText = data.name;
        weather.innerText = `${data.main.temp}℃`;
    });
}

// 에러 발생 시 실행 함수
function onGeoError() {
    alert("위치를 찾을 수 없습니다😵");
}

// 장치의 현재 위치 가져오기
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);