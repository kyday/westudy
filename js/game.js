

const startBtn = document.querySelector(".start-btn");
const restartBtn = document.querySelector(".restart-btn");
const board = document.querySelector("#board");
const timer = document.querySelector(".time");
const blocks = [];

let started = false;
let status = 1;
let startTime = null;
//


const init = () => {
    startBtn.addEventListener("click", () => {
        if (started) { 
            return false;
        } 
        start();
        startBtn.style.display="none";
    });
}


const start = () => {
    clearBoard();
    clearBlcok();
    blockRender();
    status = 1;
    startTime = new Date();
    setTimer();
}

const clearBoard = () => {
    board.innerHTML = "";
}

const clearBlcok = () => {
    started = true;

    let arr1 = [];
    let arr2 = [];

        for(let i = 1; i <= 25; i++){
            arr1.push(i); // 배열 25개를 i에 push
            arr2.push(i + 25); // i + 25 만큼 arr2 push 
        }

         for(let i = 0; i < 25; i++){
            let idx = Math.floor(Math.random() * (25 - i)); // 25-i 만큼 random으로 돌린 다음 idx 변수에 넣어준다.
            blocks.push(arr1[idx]);
            arr1[idx] = arr1[25 - i - 1];
         }
         for(let i = 0; i < 25; i++){
            let idx = Math.floor(Math.random() * (25 - i));
            blocks.push(arr2[idx]);
            arr2[idx] = arr2[25 - i - 1];
        }
}


const blockRender = () => {
    blocks.forEach((data, idx) => {
        let left = ((idx + 1) % 5) * 100;
        let top = (Math.floor((idx + 1) / 5) % 5) * 100;
        let type = Math.ceil((idx + 1) / 25);

        const block = document.createElement("div");
        block.classList.add("block");
        block.classList.add("type-" + type);
        block.innerHTML = `<div class="inner-block" onclick="clickTile(this);"> ${data} </div>`;
        block.style.left = left + "px";
        block.style.top = top + "px";

        

    

        blocks.push(block);
        board.append(block);

        

    });
    
}

const clickTile = (tile) => {
    if(tile.classList.contains("inner-block")){
            let data = tile.innerText;
            
            if(statusCheck(data)){
                blockPop(tile.parentNode);
                nextStatus();
            }

            if(endChaek()){
                end();
            }
        }
    }

const statusCheck = (data) => {
    if(data == status){
        return true;
    }else{
        return false;
    }
}

const nextStatus = () => {
    status++;
}

const endChaek = () => {
    if(status === 51){
        return true;
    }else{
        return false;
    }
}

const blockPop = (node) => {
    node.classList.add("end");
    setTimeout(() => {
        board.removeChild(node);
    }, 1000);
}

const printTime = (text) => {
    timer.innerText = text;
}

const setTimer = () => {
    let timer = null;
    timer = setInterval(() => {
        printTime(getTime());
    });
}

const getTime = () => {
    let now = new Date();
    let temp = now - startTime;
    let m = Math.floor((temp % (1000 * 60 * 60)) / (1000 * 60));
    let s = Math.floor((temp % (1000 * 60)) / 1000);
    let ms = Math.floor(temp % (1000 * 60) % 1000);

    function intToTime(i){
        return i >= 10 ? i : "0" + i;
    }
    return intToTime(m) + ":" + intToTime(s) + ":" + ms;
}

const end = () => {
    started = true;
    clearInterval(timer);
    printTime("");
    alert("게임 클리어 , 기록 : " + getTime());
    //timer.style.display="none";
    location.reload();
}


window.onload = () => {
    init();
}



