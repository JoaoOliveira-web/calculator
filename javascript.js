 
const screen = document.getElementById("screen");
let current = "";
let previous = "";
let result = "";
let operator = null;

function pressNumber(num) {
    current += num;
    if(previous !== ""){
        screen.innerHTML = previous.concat(operator,current);
    }else
    screen.innerHTML = current;
}

function pressOperator(op) {
    if(previous !== "" && current !==""){
       
        const a = Number(previous);
        const b = Number(current);

        const result = operate(a, b, operator);
    
        previous = result.toString();
        operator= op;
        current="";

        screen.innerHTML = previous + operator;
        
    }
    else if (previous !== ""){
        operator = op;
         screen.innerHTML = previous.concat(operator);
    }
    else if(current !== "") {;
        operator = op;
        previous = current;
        current = "";
        screen.innerHTML = previous.concat(operator);
    }
    else if(result !== ""){
        previous = result.toString();
        operator = op;
        result = "";
        screen.innerHTML = previous.concat(operator);
    }
}

var numbers = document.getElementsByClassName("number");

for(let i = 0 ; i < numbers.length; i++){
    numbers[i].onclick = function () { 
        pressNumber(numbers[i].innerHTML);   
    }
}

var operators = document.getElementsByClassName("operator");

for(let i = 0 ; i < operators.length; i++){
    operators[i].onclick = function () { 
        pressOperator(operators[i].innerHTML);   
    }
}

const equals = document.getElementById("equals");

equals.onclick = function(){
    if (previous === "" || operator === null || current === "") return;

    const a = Number(previous);
    const b = Number(current);
    result = operate(a, b, operator);
    screen.innerHTML = result.toString();
    current = "";
    previous = "";
    operator = null;
}

const clear = document.getElementById("clear");

clear.onclick = function(){
    previous = "";
    current = "";
    operator = null;
    screen.innerHTML = current;
}

const decimal = document.getElementById("dot");

decimal.onclick = function(){
   if (!current.includes(".")) {
        current += ".";
        screen.innerHTML = previous + (operator || "") + current;
    }
}

function operate(num1,num2,op) {

    switch(op){
        case "+":return num1 + num2;
        case "-":return num1 - num2;
        case "*":return num1 * num2;
        case "/":return num1 / num2;
    }

}