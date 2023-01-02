/* Created by Ying Tu */
/* Thanks for checking out my project! */
/* Welcome to also visit my Linkedin and Github page */
/* Links are at the bottom of the game */
/* v1.0: cannot handle parentheses, expression after equal is pressed, decimals */

/* hold the user input expression */
let previous_expr = "";
let current_expr = "0";
let temp_expr = "";
let operator = "";
let new_number = true;
let result_exp = false;
let is_backspace = false;

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

    /* for checking */
    $("#checker .previous_expr span").html(previous_expr);
    $("#checker .current_expr span").html(current_expr);
    $("#checker .temp_expr span").html(temp_expr);
    $("#checker .operator span").html(operator);
    $("#checker .new_number span").html(new_number.toString());
    $("#checker .result_exp span").html(result_exp.toString());
    $("#checker .is_backspace span").html(is_backspace.toString());
}
function clearExp() {
    previous_expr = "";
    current_expr = "0";
    temp_expr = "0";
    operator = "";
    new_number = true;
    result_exp = false;
    is_backspace = false;
    display();
}

function addExp(parameter) {
    switch (parameter) {
        /* deadlock encounters when pressing "minus" */
        case 'minus':
            if (current_expr.charAt(0) === "-") {
                current_expr = current_expr.slice(1,);
                
            }else{
                current_expr = "-" + current_expr;
            }
            temp_expr = current_expr;
            new_number = false;
            result_exp = false;
            is_backspace = false;
            alert("executed");
            break;
        case 'percent':
            current_expr = 0.01 * Number(current_expr);
            current_expr = current_expr.toString();
            is_backspace = false;
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            if (is_backspace) {
                previous_expr = current_expr;
                is_backspace = false;
            }

            if (!new_number) {
                // var temp = current_expr;
                if (operator){
                    current_expr = calExp(previous_expr, current_expr, operator);
                }
                // alert(current_expr);
                // operator = parameter;
                previous_expr = current_expr;
                // alert(current_expr);
                
                // current_expr += parameter;
                new_number = true;
            }
            operator = parameter;
            temp_expr = "0";
            is_backspace = false;
            result_exp = false;
            break;
        default:
            if (result_exp){
                previous_expr = "0";
                temp_expr = "0";
                result_exp = false;
            }

            // }else{
            //     previous_expr = current_expr;
            // }
            if (is_backspace) {
                // previous_expr = current_expr;
                current_expr += parameter;
                // is_backspace = false;
            }
            else if (current_expr === "0" || new_number){
                // previous_expr = current_expr;
                current_expr = parameter;
                new_number = false;
            }
            else if (current_expr === "-0") {
                current_expr = "-" + parameter;
            }
            else{
                current_expr += parameter;
            }
            temp_expr = "0"? parameter: temp_expr + parameter;
            result_exp = false;
            break;
    }
    display();
}

function subExp() {
    var expr = current_expr.toString();
    if (expr.length !== 1) {
        expr = expr.slice(0, -1);
        is_backspace = true;
    }else {
        expr = "0";
        is_backspace = false;
    }
    current_expr = expr;
    temp_expr = current_expr;
    result_exp = false;
    display();
}

/* produce error when directly press equal */
function dotExp() {
    current_expr += ".";
    temp_expr = current_expr;
    new_number = false;
    result_exp = false;
    is_backspace = false;
    display();
}

function equalExp() {
    if (result_exp){
        // alert(current_expr);
        // alert(temp_expr);
        current_expr = calExp(current_expr, temp_expr, operator);
    }else{
        temp_expr = current_expr;
        current_expr = calExp(previous_expr, current_expr, operator);
        result_exp = true;
    }
    previous_expr = current_expr;
    new_number = true;
    is_backspace = false;
    display();
}

function calExp(expr1, expr2, op) {
    // result_exp = true;
    var expr = checkDecimal(expr1) + op + checkDecimal(expr2);
    // alert(checkDecimal(expr1) + op + checkDecimal(expr2));
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

function checkDecimal(expr) {
    if (expr.charAt(expr.length-1) === ".") {
        return expr + "0";
    }else{
        return expr;
    }
}
