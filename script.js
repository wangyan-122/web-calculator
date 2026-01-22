let currentInput = "";

function append(char) {
    currentInput += char;
    updateDisplay();
}

function clearDisplay() {
    currentInput = "";
    updateDisplay();
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    const display = document.getElementById('display');
    display.innerText = currentInput || "0";
    display.scrollLeft = display.scrollWidth; // Auto scroll to end
}

function calculate() {
    if (!currentInput) return;

    try {
        // Custom Formula Mode: Replace all A-Z with their ASCII values for evaluation
        let expression = currentInput.replace(/[A-Z]/g, (char) => {
            return char.charCodeAt(0);
        });
        
        // Allow only valid math chars
        if (/[^0-9+\-*/().\s]/.test(expression)) {
            throw new Error("Invalid");
        }
        
        // Eval
        let result = eval(expression);
        
        // Format as integer (DINT)
        currentInput = Math.floor(result).toString();
    } catch (e) {
        currentInput = "Error";
    }
    updateDisplay();
}
