/* Created by Ying Tu */
/* Thanks for checking out my project! */
/* Welcome to also visit my Linkedin and Github page */
/* Links are at the bottom of the game */
/* v1.0: cannot handle parentheses, expression after equal is pressed, decimals */

/* hold the user input expression */
let expression = "0";
let result_exp = false;

/* validate the expression */
const re = /(?:(?:^|[-+_*/])(?:\s*-?\d+(\.\d+)?(?:[eE][+-]?\d+)?\s*))+$/;

/* properties for the expression shown on the screen */
font = "bold 70px Arial";
font_color = "black";

/* logic of the calculator */
window.onload = function () {
    const canvas = document.getElementById("canvas");
    width = canvas.width;
    height = canvas.height;

    let context =canvas.getContext("2d");
    context.font = font;
    context.fillStyle=font_color;

    /* draw the expression on the canvas */
    function draw(currentTime) {
        context.clearRect(0,0,width,height);
		
        context.beginPath();
        context.fillText(expression,0,65);
        // context.fillText(expression,width- 2 - 39*(expression.length),65);

        window.requestAnimationFrame(draw);
   }
    /* handle all button click events */

    window.requestAnimationFrame(draw);

}

function clearExp() {
    expression = "0";
    result_exp = false;
}

function addExp(parameter) {
    switch (parameter) {
        case 'left':
            if (result_exp) {
                expression = "(";
            }else{
                expression = expression === "0"? "(": (expression + "(");
            }
            result_exp = false;
            break;
        case 'right':
            if (result_exp) {
                expression = ")";
            }else{
                expression = expression === "0"? ")": (expression + ")");
            }
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            expression += parameter;
            result_exp = false;
            break;
        default:
            if (result_exp){
                expression = parameter;
            }else{
                expression = expression === "0"? parameter: (expression + parameter);
            }
            resule_exp = false;
            break;
    }
}

function subExp() {
    if (expression.length !== 1) {
        expression = expression.slice(0, -1);
    }else {
        expression = "0";
    }
}

function calExp() {
    result_exp = true;

    if (isValidMathExpression(expression)){
        var func = new Function("return " + expression);
        expression = func();
    }else{
        expression = "Error";
    }
}

function isValidMathExpression(expr){
    return re.test(expr);
}
