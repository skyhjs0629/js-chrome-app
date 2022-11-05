// 로그인 & 로그아웃

/* 그릇 ************************************************************ */
const html = document.querySelector("html");
// 모달 폼 가져오기
const modalPar = document.querySelector(".modal-par");
const modalBtn = document.querySelector(".modal-btn");
const yesLogout = modalBtn.firstElementChild;
const noLogout = modalBtn.lastElementChild;
// 로그인 폼 가져오기
const loginPar = document.querySelector(".login-par");
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
// 환영 폼 가져오기
const greeting = document.querySelector("#greeting");
const greetPar = document.querySelector(".greet-par");
// 로그아웃 가져오기
const logout = document.querySelector(".logout");
const logoutBtn = document.querySelector(".logout img");
// 투두리스트 가져오기
const toDoPar = document.querySelector(".todo-par");

// 중요한 정보를 담은 게 아니라 대문자로 작성!
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";


/* 동작 ************************************************************ */
// Login -> Submit 함수
function onLoginSubmit(event) {
    // 기본 동작 실행하지 않도록 지정 (EX 새로고침)
    event.preventDefault();

    // username에 값 저장 후, input 값 초기화
    const username = loginInput.value;
    loginInput.value = null;
    
    // 입력한 값 DB에 기억
    localStorage.setItem(USERNAME_KEY, username);

    // loginForm 감추기(hidden O)
    loginPar.classList.add(HIDDEN_CLASSNAME);

    // 함수 호출
    paintGreetings(username);
}


// 저장된 값 존재 시 실행 함수
function paintGreetings(username) {
    // 환영 문구 + hidden 해제
    greeting.innerText = `안녕하세요, ${username}! 좋은 하루입니다.`;
    greetPar.classList.remove(HIDDEN_CLASSNAME);

    // 투두리스트 hidden 해제
    toDoPar.classList.remove(HIDDEN_CLASSNAME);
    // 로그인 hidden 추가
    loginPar.classList.add(HIDDEN_CLASSNAME);
    // 로그아웃 hidden 해제
    logout.classList.remove(HIDDEN_CLASSNAME);

    // 로그아웃 클릭!
    logoutBtn.addEventListener("click", logoutClick);
}


const savedUsername = localStorage.getItem(USERNAME_KEY);


// logout CLIK! 함수
function logoutClick() {
    // modalPar hidden 해제 + overflow 설정
    modalPar.classList.remove(HIDDEN_CLASSNAME);
    html.style.overflow = "hidden";

    // 아니오 CLIK
    noLogout.addEventListener("click", logoutClose);
    // 네 CLIK
    yesLogout.addEventListener("click", logoutYes);
}


// logout NO CLICK! 함수
function logoutClose() {
    // modalPar hidden 추가 + overflow 설정
    modalPar.classList.add(HIDDEN_CLASSNAME);
    html.style.overflow = "hidden scroll";
}


// logout Yes CLIK! 함수
function logoutYes() {
    const todoLogout = document.querySelector(".todo-par");
    const listLogout = document.querySelector(".list-par");

    // 모달 닫는 함수 + 로그인 폼 함수
    logoutClose();
    logout.classList.add(HIDDEN_CLASSNAME);
    userNo();

    // 일정 DB 값 삭제
    localStorage.removeItem("todos");
    localStorage.removeItem(USERNAME_KEY);

    // 일정 태그에 hidden 추가
    todoLogout.classList.add(HIDDEN_CLASSNAME);
    listLogout.classList.add(HIDDEN_CLASSNAME);
}


/* 로그인 폼 보여주기(hidden X),
   환영 폼 감추기(hidden O) */
function userNo() {
    loginPar.classList.remove(HIDDEN_CLASSNAME);
    greetPar.classList.add(HIDDEN_CLASSNAME);
}


/* 저장된 값이 있으면 form X,
   저장된 값이 null이면 form O */
if(savedUsername === null) {
    userNo();

    /* 클릭 이벤트가 아닌 submit 이벤트 감지하면,
       함수 onLoginSubmit 실행 */
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    paintGreetings(savedUsername);
}