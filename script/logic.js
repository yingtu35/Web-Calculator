/* Created by Ying Tu */
/* Thanks for checking out my project! */
/* Welcome to also visit my Linkedin and Github page */
/* Links are at the bottom of the game */
/* v1.0: cannot handle parentheses, expression after equal is pressed, decimals */

/* hold the user input expression */
let previous_expr = "";
let current_expr = "0";
let temp_expr = "0";
let operator = "";
let new_number = true;
let result_exp = false;

/* validate the expression */
const re = /(?:(?:^|[-+_*/])(?:\s*-?\d+(\.\d+)?(?:[eE][+-]?\d+)?\s*))+$/;

// /* properties for the expression shown on the screen */
// font = "bold 70px Arial";
// font_color = "black";

// /* logic of the calculator */
// window.onload = function () {
//     const canvas = document.getElementById("canvas");
//     width = canvas.width;
//     height = canvas.height;

//     let context =canvas.getContext("2d");
//     context.font = font;
//     context.fillStyle=font_color;

//     /* draw the expression on the canvas */
//     function draw(currentTime) {
//         context.clearRect(0,0,width,height);
		
//         context.beginPath();
//         context.fillText(current_expr,0,65);
//         // context.fillText(current_expr,width- 2 - 39*(current_expr.length),65);

//         window.requestAnimationFrame(draw);
//    }
//     /* handle all button click events */

//     window.requestAnimationFrame(draw);

// }
function display() {
    current_expr = current_expr.slice(0,13);
    $("#screen p").html(current_expr);
}
function clearExp() {
    previous_expr = "";
    current_expr = "0";
    temp_expr = "";
    operator = "";
    new_number = true;
    result_exp = false;
    display();
}

function addExp(parameter) {
    switch (parameter) {
        case 'minus':
            if (current_expr.charAt(0) === "-") {
                current_expr = current_expr.slice(1,);
            }else{
                current_expr = "-" + current_expr;
            }
            new_number = false;
            result_exp = false;
            display();
            break;
        case 'percent':
            current_expr = 0.01 * Number(current_expr);
            current_expr = current_expr.toString();
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            if (!new_number) {
                // var temp = current_expr;
                current_expr = calExp(previous_expr, current_expr, operator);
                // alert(current_expr);
                // operator = parameter;
                previous_expr = current_expr;
                // alert(current_expr);
                
                // current_expr += parameter;
                new_number = true;
                temp_expr = "";
            }
            operator = parameter;
            result_exp = false;
            break;
        default:
            if (result_exp){
                previous_expr = "0";
                temp_expr = "";
                result_exp = false;
            }
            // }else{
            //     previous_expr = current_expr;
            // }
            if (current_expr === "0" || new_number){
                current_expr = parameter;
                new_number = false;
            }
            else if (current_expr === "-0") {
                current_expr = "-" + parameter;
            }
            else{
                current_expr += parameter;
            }
            temp_expr += parameter;
            result_exp = false;
            break;
    }
    display();
}

function subExp() {
    var expr = current_expr.toString();
    if (expr.length !== 1) {
        expr = expr.slice(0, -1);
    }else {
        expr = "0";
    }
    current_expr = expr;
    display();
}

function equalExp() {
    if (result_exp){
        // alert(current_expr);
        // alert(temp_expr);
        current_expr = calExp(current_expr, temp_expr, operator);
    }else{
        current_expr = calExp(previous_expr, current_expr, operator);
        result_exp = true;
    }
    previous_expr = current_expr;
    new_number = true;
    display();
}

function calExp(expr1, expr2, op) {
    // result_exp = true;
    var expr = expr1 + op + expr2;
    
    if (isValidMathExpression(expr)){
        var func = new Function("return " + expr);
        expr = func();
    }else{
        expr = "Error";
    }
    return expr.toString();
}

function isValidMathExpression(expr){
    return re.test(expr);
}
