const keyboard = document.getElementById("keyboard");
const startGame = document.getElementById("start");
const addWordContainer = document.getElementById("start-add");
const userInput = document.getElementById("user-input");
const newGameContainer = document.getElementById("new-game_container");
const newGameBtn = document.getElementById("new-game_btn");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");


let options = ["html", "software", "hardware", "computador", "codigo", "editor", "programa", "mouse", "teclado", "pantalla", "lenguaje", "cable", "juego", "escritorio", "perfil", "trabajo", "programador", "dibujo", "matematicas", "algoritmo", "botella"];

let winCount = 0;
let count = 0;
let chosenWord = "";


const blocker = () => {
    let keyboardButtons = document.querySelectorAll(".keys");
    keyboardButtons.forEach((button) => {
        button.disabled.true;
    });
    newGameContainer.classList.remove("hide");
};

const randomWord = () => {
    initializer();
    userInput.innerText = "";
    keyboard.classList.remove("hide");
    startGame.classList.add("hide");
    canvas.classList.remove("hide");
    chosenWord = options[Math.floor(Math.random() * options.length)];
    chosenWord = chosenWord.toUpperCase();
    let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');
    userInput.innerHTML = displayItem;
};

const addWord = () => {
    let newWord = document.getElementById("start-add_word").value;
    if (newWord == "") {
        alert("Ingrese una palabra o presione el boton 'Empezar juego'");
    } if (newWord.length <= 10 && newWord !== "") {
        initializer();
        userInput.innerText = "";
        keyboard.classList.remove("hide");
        startGame.classList.add("hide");
        canvas.classList.remove("hide");
        chosenWord = newWord.toUpperCase();
        let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');
        userInput.innerHTML = displayItem;
    } if (newWord.length > 10) {
        alert("Recuerde que la palabra tiene que ser MENOR a 10 caracteres")
    }
}

const initializer = () => {
    winCount = 0;
    count = 0;
    userInput.innerHTML = "";
    startGame.innerHTML = "";
    keyboard.classList.add("hide");
    newGameContainer.classList.add("hide");
    keyboard.innerHTML = "";
    canvas.classList.add("hide");

    for (let i = 65; i < 91; i++) {
        let btn = document.createElement("button");
        btn.classList.add("keys");
        btn.innerText = String.fromCharCode(i);
        btn.addEventListener("click", () => {
            let array = chosenWord.split("");
            let dashes = document.getElementsByClassName("dashes");

            if (array.includes(btn.innerText)) {
                array.forEach((char, index) => {
                    if (char === btn.innerText) {
                        dashes[index].innerText = char;
                        winCount += 1;
                        if (winCount == array.length) {
                            canvas.classList.add("hide");
                            keyboard.classList.add("hide");
                            userInput.classList.add("hide");
                            resultText.innerHTML = `<h1 class='win'>Has GANADO!!</h1><p>La palabra secreta era <span>${chosenWord}</span></p>`;
                            blocker();
                        }
                    }     
                });
            } else {
                count += 1;
                drawMan(count);
                if (count == 6) {
                    canvas.classList.add("hide");
                    keyboard.classList.add("hide");
                    userInput.classList.add("hide");
                    resultText.innerHTML = `<h1 class='lose'>Has PERDIDO!!</h1><p>La palabra secreta era <span>${chosenWord}</span></p>`;
                    blocker();
                }
            }
            btn.disabled = true;
        });
        keyboard.append(btn);
    }
    let {initialDrawing} = canvasCreator();
    initialDrawing();
};


const canvasCreator = () => {
    let context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 4;
    context.lineCap = "round";
    context.lineJoin = "round";

    //For drawing lines
    const drawLine = (fromX, fromY, toX, toY) => {
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
    };

    const head = () => {
        context.beginPath();
        context.arc(70, 30, 10, 0, Math.PI * 2, true);
        context.stroke();
    };

    const body = () => {
        drawLine(70, 40, 70, 80);
    };

    const leftArm = () => {
        drawLine(70, 50, 50, 70);
    };

    const rightArm = () => {
        drawLine(70, 50, 90, 70);
    };

    const leftLeg = () => {
        drawLine(70, 80, 50, 110);
    };

    const rightLeg = () => {
        drawLine(70, 80, 90, 110);
    };

    const initialDrawing = () => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        //Bottom line
        drawLine(10, 130, 130, 130);
        //Left line
        drawLine(10, 10, 10, 130);
        //Top line
        drawLine(10, 10, 70, 10);
        //Small top line
        drawLine(70, 10, 70, 20);
    };
    return {initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//Draw man
const drawMan = (count) => {
    let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
    switch (count) {
        case 1:
            head();
            break;
        case 2:
            body();
            break;
        case 3:
            leftArm();
            break;
        case 4:
            rightArm();
            break;
        case 5:
            leftLeg();
            break;
        case 6:
            rightLeg();
            break;
        default:
            break;
    }
};