/* Created by Ying Tu */
/* Thanks for checking out my project! */
/* Welcome to also visit my Linkedin and Github page */
/* Links are at the bottom of the game */

/* hold the user input expression */
let prev_expr = "";
let curr_expr = "0";
let temp_expr = "";
let op = "";

/* initial state of the calculator, used for calculator logics */
let waitForSecondExpr = true;
let resultExp = false;
let TogglePercentBackspaceDot = false;

/* regular expression to validate the mathematic expression */
const re = /(?:(?:^|[-+_*/])(?:\s*-?\d+(\.\d+)?(?:[eE][+-]?\d+)?\s*))+$/;

/* display the current expression on the screen */
function display() {
    /* exists display problem when number of decimal is large */
    var expr = curr_expr.slice(0,13);
    $("#screen p").html(expr);

    /* for checking */
    // $("#checker .prev_expr span").html(prev_expr);
    // $("#checker .curr_expr span").html(curr_expr);
    // $("#checker .temp_expr span").html(temp_expr);
    // $("#checker .op span").html(op);
    // $("#checker .waitForSecondExpr span").html(waitForSecondExpr.toString());
    // $("#checker .resultExp span").html(resultExp.toString());
    // $("#checker .TogglePercentBackspaceDot span").html(TogglePercentBackspaceDot.toString());
}

/* reset the calculator to the initial state */
function clearExp() {
    prev_expr = "";
    curr_expr = "0";
    temp_expr = "0";
    op = "";
    waitForSecondExpr = true;
    resultExp = false;
    TogglePercentBackspaceDot = false;
    display();
}

/* handle number inputs */
function numExp(num) {
    if (resultExp){
        prev_expr = "";
        temp_expr = "0";
        op = "";
    }

    if (TogglePercentBackspaceDot) {
        curr_expr += num;
    }
    else if (curr_expr === "0" || waitForSecondExpr){
        curr_expr = num;
        waitForSecondExpr = false;
    }
    else if (curr_expr === "-0") {
        curr_expr = "-" + num;
    }
    else{
        curr_expr += num;
    }
    temp_expr = curr_expr;

    resultExp = false;
    display();
}

/* handle "+, -, *, /" operator inputs, do calculation if necessary */
function opExp(operator) {
    if (!waitForSecondExpr) {
        if (op) {
            curr_expr = calExp(prev_expr, curr_expr, op);
        }
        waitForSecondExpr = true;
    }
    prev_expr = curr_expr;
    op = operator;

    TogglePercentBackspaceDot = false;
    resultExp = false;
    display();
}

/* handle "+/-" input */
function minusExp() {
    if (curr_expr.charAt(0) === "-") {
        curr_expr = curr_expr.slice(1,);
    }else{
        curr_expr = "-" + curr_expr;
    }

    TogglePercentBackspaceDot = true;
    display();
}

/* handle "%" input */
function percentExp() {
    /* ---------could leads to many 0 after the decimal----------- */
    curr_expr = 0.01 * Number(curr_expr);
    /* ---------could leads to many 0 after the decimal----------- */
    curr_expr = curr_expr.toString();
    TogglePercentBackspaceDot = true;
    display();
}

/* handle "<-" input */
function backspaceExp() {
    if (curr_expr.length !== 1) {
        curr_expr = curr_expr.slice(0, -1);
        TogglePercentBackspaceDot = true;
    }else {
        curr_expr = "0";
        TogglePercentBackspaceDot = false;
    }
    display();
}

/* handle "." input */
function dotExp() {
    if (!curr_expr.includes(".")) {
        curr_expr += ".";
    }

    TogglePercentBackspaceDot = true;
    display();
}

/* handle "=" input, execute the calculation */
function equalExp() {
    if (resultExp){
        curr_expr = calExp(curr_expr, temp_expr, op);
    }else{
        temp_expr = curr_expr;
        curr_expr = calExp(prev_expr, curr_expr, op);
        resultExp = true;
    }
    prev_expr = curr_expr;

    waitForSecondExpr = true;
    TogglePercentBackspaceDot = false;
    display();
}

/* this function does the calculation by using Function */
function calExp(expr1, expr2, operator) {
    var expr = checkDecimal(expr1) + operator + checkDecimal(expr2);

    if (isValidMathExpression(expr)){
        var func = new Function("return " + expr);
        expr = func();
    }else{
        expr = "Error";
    }
    return expr.toString();
}

/* validate the given math expression */
function isValidMathExpression(expr){
    return re.test(expr);
}

/* add "0" to the end of the expression to be a proper decimal number*/
function checkDecimal(expr) {
    if (expr.charAt(expr.length-1) === ".") {
        return expr + "0";
    }else{
        return expr;
    }
}
