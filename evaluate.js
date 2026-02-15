class Calculator {
    constructor() {
        this.expression = ""
        this.angleMode = "DEG"
    }

    append(value) {
        this.expression += value
    }

    clear() {
        this.expression = ""
    }

    setAngleMode() {
        this.angleMode = this.angleMode === "DEG" ? "RAD" : "DEG"
        return this.angleMode
    }

    backspace() {
        this.expression = this.expression.slice(0, -1)
    }

    evaluate() {
        try {
            let expr = this.preprocess(this.expression)

            let result = math.evaluate(expr)

            if (!isFinite(result)) {
                throw new Error("Invalid result")
            }
            result = Number(result.toPrecision(12))

            this.expression = result.toString()
            return result
        }
        catch (err) {
            return ("Error")
        }
    }

    preprocess(expr) {
        expr = expr.replace(/\s+/g, "")

        expr = expr.replace(/ln\(/g, "log(")

        if (this.angleMode === "DEG") {
            expr = expr.replace(/sin\((.*?)\)/g, "sin(($1) * pi / 180)");
            expr = expr.replace(/cos\((.*?)\)/g, "cos(($1) * pi / 180)");
            expr = expr.replace(/tan\((.*?)\)/g, "tan(($1) * pi / 180)");
        }

         if (!/^[0-9+\-*/().^%pieA-Za-z!]+$/.test(expr)) {
            throw new Error("Invalid characters");
        }

        return expr
    }
}

const calculator = new Calculator()
const display = document.getElementById("displayText")
const toggleBtn = document.getElementById("toggleMode")

document.querySelectorAll("[data-value]").forEach(div => {
    div.addEventListener("click" , () => {
        calculator.append(div.dataset.value)
        display.value = calculator.expression
    })
})

document.querySelectorAll("[data-action]").forEach(div => {
    div.addEventListener("click" , () => {
        const action = div.dataset.action

        if (action === "equals") {
            const result = calculator.evaluate()
            display.value = result
        }

        if (action === "clear") {
            calculator.clear()
            display.value = ""
        }

        if (action === "backspace") {
            calculator.backspace()
            display.value = calculator.expression
        }
    })
})

toggleBtn.addEventListener("click" , () => {
    const mode = calculator.setAngleMode()
    toggleBtn.textContent = mode
})

display.addEventListener("keydown" , (e) => {
    if (e.key === "Enter") {
        e.preventDefault()
        calculator.expression = display.value
        const result = calculator.evaluate()
        display.value = result
    }
})