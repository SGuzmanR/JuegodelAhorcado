const keyboard = document.getElementById("keyboard");
const startGame = document.getElementById("start_game");
const addWordContainer = document.getElementById("add_word-container");
const userInput = document.getElementById("user_input");
const newGameContainer = document.getElementById("new_game-container");
const newGameBtn = document.getElementById("new_game-btn");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result_text");

//Options
let options = ["HTML", "Software", "Hardware", "Computador", "Codigo", "Editor", "Programa", "Mouse", "teclado", "pantalla", "lenguaje", "cable", "juego", "escritorio", "perfil", "trabajo", "programador", "dibujo", "matematicas", "algoritmo"];

//Count
let winCount = 0;
let count = 0;
let chosenWord = "";


//Block all the Buttons
const blocker = () => {
    let keyboardButtons = document.querySelectorAll(".keys");
    //Disable keys
    keyboardButtons.forEach((button) => {
        button.disabled.true;
    });
    newGameContainer.classList.remove("hide");
};


//Random Word
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


//Add Word
const addWord = () => {
    let newWord = document.getElementById("add_word").value;

    if (newWord == "") {
        alert("Ingrese una palabra para continuar o presione el boton 'Empezar juego'");
    } if (newWord.length <= 10 && newWord !== "") {
        initializer();
        userInput.innerText = "";
        keyboard.classList.remove("hide");
        startGame.classList.add("hide");
        canvas.classList.remove("hide");
        chosenWord = newWord.toUpperCase();
        let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');
        userInput.innerHTML = displayItem;
    }
}


//Initial
const initializer = () => {
    winCount = 0;
    count = 0;
    userInput.innerHTML = "";
    startGame.innerHTML = "";
    keyboard.classList.add("hide");
    newGameContainer.classList.add("hide");
    keyboard.innerHTML = "";
    canvas.classList.add("hide");

    //Keyboard
    for (let i = 65; i < 91; i++) {
        let btn = document.createElement("button");
        btn.classList.add("keys");
        //Number to A-Z
        btn.innerText = String.fromCharCode(i);
        btn.addEventListener("click", () => {
            let array = chosenWord.split("");
            let dashes = document.getElementsByClassName("dashes");

            if (array.includes(btn.innerText)) {
                array.forEach((char, index) => {
                    if (char === btn.innerText) {
                        //Replace dash with letter
                        dashes[index].innerText = char;
                        winCount += 1;
                        //if winCount equals word length
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
                //Lose count
                count += 1;
                drawMan(count);
                //Count==6 (head, body, left arm, right arm, left leg, right leg)
                if (count == 6) {
                    canvas.classList.add("hide");
                    keyboard.classList.add("hide");
                    userInput.classList.add("hide");
                    resultText.innerHTML = `<h1 class='lose'>Has PERDIDO!!</h1><p>La palabra secreta era <span>${chosenWord}</span></p>`;
                    blocker();
                }
            }
            //Disable clicked button
            btn.disabled = true;
        });
        keyboard.append(btn);
    }
    //Call to canvasCreator (for clearing previous canvas and creating initial canvas)
    let {initialDrawing} = canvasCreator();
    //initialDrawing would draw the frame
    initialDrawing();
};


//Canvas
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

    //Initial drawing (Support Hangman)
    const initialDrawing = () => {
        //Clear
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