let str = "";
let buttons = document.querySelectorAll(`.button`);

// Clear button
document.getElementById('clear').addEventListener('click', () => {
    document.getElementById('input').value = '';
    str = '';
});

// Button click logic
Array.from(buttons).forEach((element) => {
    element.addEventListener('click', (e) => {
        let value = e.target.innerHTML;

        if (value == 'C') return;

        if (value == '=') {
            try {
                str = str.replace(/(sin|cos|tan)\(([^)]+)\)/g, (match, func, angle) => {
                    return `Math.${func}(${angle} * Math.PI / 180)`;
                });
                str = str.replace(/log/g, 'Math.log10').replace(/sqrt/g, 'Math.sqrt');
        
                str = str.replace('pi', 'Math.PI').replace('e', 'Math.E');
        
                str = eval(str);
                document.querySelector(`input`).value = str;
            } catch (error) {
                document.querySelector(`input`).value = "Error";
                str = "";
            }
        }
        else if (value == 'sin' || value == 'cos' || value == 'tan' || value == 'log') {
            str += `${value}(`;
            document.querySelector(`input`).value = str;
        }
        else {
            str += value;
            document.querySelector(`input`).value = str;
        }
    });
});
