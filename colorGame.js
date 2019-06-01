var numSqrs = 6;
var colors = [];
var correctColor;
var modeName;
var squares = document.querySelectorAll('.square');
var h1 = document.querySelector('h1');
var displayColor = document.querySelector('#correctColor');
var messageDisplay = document.querySelector("#status");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");


init();

function init() {
    setupModeButtons();
    setupSquares();
    reset();

}

function setupModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove('selected');
            modeButtons[1].classList.remove('selected');
            modeButtons[2].classList.remove('selected');
            this.classList.add("selected");
            modeName = this.textContent;
            if (modeName === "Easy")
                numSqrs = 3;
            else if (modeName === "Hard")
                numSqrs = 6;
            else
                numSqrs = 6;
            reset();
        })
    }
}

function setupSquares() {
    for (var i = 0; i < squares.length; i++) {
        // click listeners to squares
        squares[i].addEventListener("click", function () {
            clickedColor = this.style.backgroundColor;
            if (clickedColor === correctColor) {
                messageDisplay.textContent = "Correct.";
                h1.style.background = clickedColor;
                resetButton.textContent = "Play Again?"
                changeColors(clickedColor);
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Incorrect.";
            }
        })
    }
}

function reset() {
    resetButton.textContent = "New Colors"
    messageDisplay.textContent = "";
    if (modeName === "Beast") {
        colors = beastModeColors();
        correctColor = pickColor();
    } else {
        colors = genRandomColor(numSqrs);
        correctColor = pickColor();
    }
    displayColor.textContent = correctColor;
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else
            squares[i].style.display = "none";
    }
    h1.style.background = "steelblue";

}

resetButton.addEventListener("click", reset);

function beastModeColors() {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    var redOne = red > 30 ? red - 30 : red + 30;
    var greenOne = green > 30 ? green - 30 : green + 30;
    var blueOne = blue > 30 ? blue - 30 : blue + 30;
    var arr = [
        'rgb(' + red + ', ' + green + ', ' + blue + ')',
        'rgb(' + red + ', ' + greenOne + ', ' + blue + ')',
        'rgb(' + red + ', ' + green + ', ' + blueOne + ')',
        'rgb(' + redOne + ', ' + green + ', ' + blueOne + ')',
        'rgb(' + redOne + ', ' + greenOne + ', ' + blue + ')',
        'rgb(' + redOne + ', ' + greenOne + ', ' + blueOne + ')',
    ];
    return arr;

}

function pickColor() {
    var randomInd = Math.floor(Math.random() * colors.length);
    return colors[randomInd];
}

function changeColors(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function genRandomColor(num) {
    var arr = [];
    for (var i = 0; i < num; i++)
        arr.push(randomcolorgetter());
    return arr;
}

function randomcolorgetter() {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
}