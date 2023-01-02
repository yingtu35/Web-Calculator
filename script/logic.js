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
let TogglePercentBackspace = false;

/* regular expression to validate the mathematic expression */
const re = /(?:(?:^|[-+_*/])(?:\s*-?\d+(\.\d+)?(?:[eE][+-]?\d+)?\s*))+$/;

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
    $("#checker .TogglePercentBackspace span").html(TogglePercentBackspace.toString());
}
function clearExp() {
    previous_expr = "";
    current_expr = "0";
    temp_expr = "0";
    operator = "";
    new_number = true;
    result_exp = false;
    TogglePercentBackspace = false;
    display();
}

function addExp(parameter) {
    switch (parameter) {
        /* deadlock encounters when pressing "minus" */
        // case 'minus':
        //     if (current_expr.charAt(0) === "-") {
        //         current_expr = current_expr.slice(1,);
                
        //     }else{
        //         current_expr = "-" + current_expr;
        //     }
        //     temp_expr = current_expr;
        //     new_number = false;
        //     result_exp = false;
        //     TogglePercentBackspace = false;
        //     alert("executed");
        //     break;
        // case 'percent':
        //     current_expr = 0.01 * Number(current_expr);
        //     current_expr = current_expr.toString();
        //     TogglePercentBackspace = false;
        //     break;
        case '+':
        case '-':
        case '*':
        case '/':
            /* exist logic error when pressed toggle/percent/backspace and then +-*/
            if (TogglePercentBackspace) {
                // previous_expr = current_expr;
                TogglePercentBackspace = false;
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
            TogglePercentBackspace = false;
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
            if (TogglePercentBackspace) {
                // previous_expr = current_expr;
                current_expr += parameter;
                // TogglePercentBackspace = false;
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

function minusExp() {
    if (current_expr.charAt(0) === "-") {
        current_expr = current_expr.slice(1,);
        
    }else{
        current_expr = "-" + current_expr;
    }
    temp_expr = current_expr;
    TogglePercentBackspace = true;
    if (new_number === true) {
        previous_expr = current_expr;
    }
    // result_exp = false;
    display();
}

function percentExp() {
    current_expr = 0.01 * Number(current_expr);
    current_expr = current_expr.toString();
    TogglePercentBackspace = true;
    if (new_number === true) {
        previous_expr = current_expr;
    }
    // result_exp = false;
    display();
}

function subExp() {
    var expr = current_expr.toString();
    if (expr.length !== 1) {
        expr = expr.slice(0, -1);
        TogglePercentBackspace = true;
    }else {
        expr = "0";
        TogglePercentBackspace = false;
    }
    current_expr = expr;
    temp_expr = current_expr;
    if (new_number === true) {
        previous_expr = current_expr;
    }
    // result_exp = false;
    display();
}

/* produce error when directly press equal */
function dotExp() {
    current_expr += ".";
    temp_expr = current_expr;
    new_number = false;
    result_exp = false;
    TogglePercentBackspace = false;
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
    TogglePercentBackspace = false;
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
