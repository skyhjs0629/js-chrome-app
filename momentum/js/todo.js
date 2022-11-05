// 투두리스트

/* 그릇 ************************************************************ */
const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");
const listPar = document.querySelector(".list-par");

const TODOS_KEY = "todos";
const HIDDEN_CLASS = "hidden";

let toDos = [];


/* 동작 ************************************************************ */
// toDos의 내용을 localStorage에 넣는 함수
function saveToDos() {
    // 문자열로 저장되게 해줌
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}


// 일정 삭제 함수
function deleteToDo(event) {
    // event.target => button
    // event.target.parentElement => li
    const li = event.target.parentElement;
    li.remove();

    // DB에 있는 일정까지 삭제
    // toDo? toDos DB에 있는 요소 중 하나
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));

    // li 개수 0이면 말풍선 hidden
    const liCnt = toDoList.childElementCount;
    if(liCnt === 0) {
        listPar.classList.add(HIDDEN_CLASS);
    }

    // 새로 만들어진 일정을 다시 DB에 저장
    saveToDos();
}


// 일정 완료 함수
function EndToDo(event) {
    const li = event.target.parentElement;
    
    // 선택한 li 태그의 id와 일치할 경우 chk 값 1로 변경
    toDos.forEach(toDo => {
        if(toDo.id === parseInt(li.id)) {
            if(toDo.chk === 0) {
                toDo.chk = 1;
                localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
            } else {
                toDo.chk = 0;
                localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
            }
        }
    });

    EndToDoStyle();
}


// 일정 완료 -> 스타일 입히기
// 일정 완료 취소 -> 스타일 취소
function EndToDoStyle() {
    toDos.forEach(toDo => {
        if(toDo.chk === 1) {
            // li 태그와 li의 마지막 자식 태그
            const li = document.getElementById(toDo.id);
            const liChil = li.lastChild;
            
            liChil.style.color = "#c5c5c5";
            liChil.style.textDecoration = "line-through";
        } else {
            // li 태그와 li의 마지막 자식 태그
            const li = document.getElementById(toDo.id);
            const liChil = li.lastChild;

            liChil.style.color = "#313131";
            liChil.style.textDecoration = "none";
        }
    });
}


// 투두리스트 그리기 함수
function paintToDo(newTodo) {
    // li 태그 생성
    const li = document.createElement("li");
    li.id = newTodo.id;
    // span 태그 생성
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    // button1 생성
    const button1 = document.createElement("button");
    button1.innerText = "X";
    // button2 생성
    const button2 = document.createElement("button");
    button2.innerText = "✓";

    listPar.classList.remove(HIDDEN_CLASS);

    // 버튼 클릭 기능
    button1.addEventListener("click", deleteToDo);
    button2.addEventListener("click", EndToDo);

    // li 태그 안에 span, button 태그 추가
    li.appendChild(button2);
    li.appendChild(button1);
    li.appendChild(span);

    // ul 태그 안에 li 태그 추가
    toDoList.appendChild(li);
}


// 일정 입력, 입력 값 저장 함수
function handleToDoSubmit(event) {
    event.preventDefault();

    // 값을 비우기 전에 newTodo에 저장
    const newTodo = toDoInput.value;

    toDoInput.value = "";

    // 일정마다 id 값을 부여하기 위함
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
        chk: 0,
    }
    
    // 배열에 newTodo 추가
    toDos.push(newTodoObj);

    // 그리고 함수 호출
    paintToDo(newTodoObj);
    saveToDos();
}


toDoForm.addEventListener("submit", handleToDoSubmit);


// JSON으로 저장한 값을 JS가 이해할 수 있는 값으로 변환
// 새로고침 해도 남아있을 수 있게 하기 위함.
const savedToDos = localStorage.getItem(TODOS_KEY);


if(savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);

    // toDos는 항상 빈 배열이므로 전에 있던 toDO 복원
    toDos = parsedToDos;

    // 배열에 있는 각각의 요소에 대해 함수 실행
    parsedToDos.forEach(paintToDo);

    // 일정 완료 체크 함수
    EndToDoStyle();
}