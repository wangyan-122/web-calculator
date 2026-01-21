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
    const int9 = 100000;
    const int10 = 5678;
    const int11 = 3;

    if (!currentInput) return;

    // Mode 1: Password Mode (Exactly 8 letters)
    // The user said "8 inputs type char... output OUT=(int1+...+int8)*int9+int10*int11"
    if (/^[A-Z]{8}$/.test(currentInput)) {
        let sum = 0;
        for (let i = 0; i < 8; i++) {
            // Convert char to int (ASCII)
            // 'A' is 65
            sum += currentInput.charCodeAt(i);
        }
        
        let result = (sum * int9) + (int10 * int11);
        
        // Output result
        // User said "Output type is DINT" (assuming standard integer display)
        currentInput = result.toString();
    } 
    // Mode 2: Custom Formula
    else {
        try {
            // Replace all A-Z with their ASCII values for evaluation
            let expression = currentInput.replace(/[A-Z]/g, (char) => {
                return char.charCodeAt(0);
            });
            
            // Allow only valid math chars
            if (/[^0-9+\-*/().\s]/.test(expression)) {
                throw new Error("Invalid");
            }
            
            // Eval
            // Note: In a real app, write a parser. For this demo, eval is okay since we sanitized.
            let result = eval(expression);
            
            // Format as integer (DINT)
            currentInput = Math.floor(result).toString();
        } catch (e) {
            currentInput = "Error";
        }
    }
    updateDisplay();
}
