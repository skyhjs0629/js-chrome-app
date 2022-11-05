// 랜덤 명언

/* 그릇 ************************************************************ */
// 명언이 들어있는 array
const quotes = [
    {
        quote: "가장 빠른 지름길은 지름길을 찾지 않는 것이다.",
        author: "정약용",
    },
    {
        quote: "기품을 지키되 사치하지 말 것이며 지성을 갖추되 자랑하지 말라.",
        author: "신사임당",
    },
    {
        quote: "강한 자가 살아남는 것이 아니라 살아남는 자가 강한 것이다.",
        author: "김유신",
    },
    {
        quote: "세월을 헛되이 보내지 마라. 청춘은 다시 돌아오지 않는다.",
        author: "안중근",
    },
    {
        quote: "진실은 반드시 따르는 자가 있고, 정의는 반드시 이루는 날이 있다.",
        author: "안창호",
    },
    {
        quote: "뜻이 서지 않으면 만사가 성공하지 못한다. 먼저 반듯이 뜻을 세워라.",
        author: "율곡이이",
    },
    {
        quote: "어린이는 어른보다 한 시대 더 새로운 사람입니다. 어린이 뜻을 가볍게 보지 마십시오.",
        author: "방정환",
    },
    {
        quote: "오늘 내가 남긴 발자취는 후세의 사람들에게 이정표가 된다.",
        author: "김구",
    },
    {
        quote: "독서야말로 인간이 해야 할 첫째의 깨끗한 일이다.",
        author: "정약용",
    },
];
// id가 quote인 태그의 첫 번째 span, 두 번째 span
const quote = document.querySelector("#quote-par span:first-child");
const author = document.querySelector("#quote-par span:last-child");
// 랜덤한 명언
const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];


/* 동작 ************************************************************ */
quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;