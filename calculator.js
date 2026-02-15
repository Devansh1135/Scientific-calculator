import { tokenizer } from "./tokenizer.js"

const display = document.getElementById("displayText")
document.querySelectorAll(".col").forEach(col => {
    col.addEventListener("click", function () {
        console.log(this.dataset.value)
        display.value += this.dataset.value
        // document.getElementById("displayText").innerText = value

    })
})

const submit = document.getElementById("submit")
submit.addEventListener("click", function () {
    const expression = display.value
    const tokens = tokenizer(expression)
    let expr = ""
    console.log(tokens)
    for(let x of tokens){
        expr+=x
    }
    let result = math.evaluate(expr)
    console.log(result)
    document.getElementById("displayText").value = result
})



