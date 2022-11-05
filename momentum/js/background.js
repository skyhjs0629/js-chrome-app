// 배경 이미지

/* 그릇 ************************************************************ */
// 이미지가 들어있는 array
const images = ["0.jpg", "1.jpg", "2.jpg", "3.jpg"];
// 랜덤 이미지
const chosenImage = images[Math.floor(Math.random() * images.length)];


/* 동작 ************************************************************ */
// backgroundImage style 추가
document.body.style.backgroundImage = `url('img/${chosenImage}')`;