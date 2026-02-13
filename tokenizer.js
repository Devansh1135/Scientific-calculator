function tokenizer(expr) {
    let number = ""
    const tokens = []
    const pattern = /^\d(\.\d)?$/
    const final = /^(\d+|[+\-*/])$/
    let prev = null


    for (let char of expr) {

        if ((prev === null || "+-*/(".includes(prev)) && char === '-') {
            number += char;
        }

        else if (pattern.test(char) || char === '.') {

            number += char
        }

        else {
            if (number !== "" && final.test(char) && number !== '-') {
                tokens.push(number)
                number = ""
                tokens.push(char)
            }
            else if (pattern.test(tokens.at(-1)) && final.test(char)) {
                tokens.push(char)
            }

        }

        prev = char;
    }
    if (number !== "") {
        tokens.push(number)
    }



    return tokens;
}




document.getElementById("demo").innerHTML = tokenizer("-234+434");

