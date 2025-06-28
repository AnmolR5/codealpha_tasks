const display = document.getElementById('display');
let currentInput = '';
let resultDisplayed = false;

document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    const val = button.dataset.value;
    const action = button.dataset.action;
    const func = button.dataset.func;

    if (val !== undefined) {
      if (resultDisplayed) {
        currentInput = '';
        resultDisplayed = false;
      }
      currentInput += val;
      display.innerText = currentInput;
    } else if (action === 'clear') {
      currentInput = '';
      display.innerText = '0';
    } else if (action === 'del') {
      currentInput = currentInput.slice(0, -1);
      display.innerText = currentInput || '0';
    } else if (action === 'calculate') {
      try {
        const evaluated = eval(currentInput.replace('^', '**'));
        display.innerText = evaluated;
        currentInput = evaluated.toString();
        resultDisplayed = true;
      } catch {
        display.innerText = 'Error';
        currentInput = '';
      }
    } else if (func) {
      try {
        let num = parseFloat(currentInput) || 0;
        switch (func) {
          case 'sin': currentInput = Math.sin(num * Math.PI / 180).toString(); break;
          case 'cos': currentInput = Math.cos(num * Math.PI / 180).toString(); break;
          case 'tan': currentInput = Math.tan(num * Math.PI / 180).toString(); break;
          case 'sqrt': currentInput = Math.sqrt(num).toString(); break;
          case 'log': currentInput = Math.log10(num).toString(); break;
          case 'exp': currentInput = Math.exp(num).toString(); break;
          case 'pow': currentInput += '^'; break;
        }
        display.innerText = currentInput;
      } catch {
        display.innerText = 'Error';
      }
    }
  });
});

// Optional: Keyboard Support
document.addEventListener('keydown', e => {
  const key = e.key;
  if (!isNaN(key) || "+-*/.%".includes(key)) {
    currentInput += key;
    display.innerText = currentInput;
  } else if (key === 'Enter') {
    document.querySelector('[data-action="calculate"]').click();
  } else if (key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
    display.innerText = currentInput || '0';
  } else if (key === 'Escape') {
    currentInput = '';
    display.innerText = '0';
  }
});
