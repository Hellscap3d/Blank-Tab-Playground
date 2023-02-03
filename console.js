const owindow = window.otherwindow
const oconsole = otherwindow.console
const odocument = otherwindow.document

var logger = document.createElement('div');
logger.style.position = 'fixed';
logger.style.bottom = '0';
logger.style.left = '0';
logger.style.width = '100%';
logger.style.height = '100px';
logger.style.backgroundColor = '#eee';
logger.style.overflow = 'scroll';
document.body.appendChild(logger);

function log(message, color) {
  var logLine = document.createElement('div');
  logLine.innerHTML = message;
  logLine.style.color = color;
  logger.appendChild(logLine);
}

owindow.console = {
    log: function(message) {
        log(message, 'black');
    },
    warn: function(message) {
        log(message, 'orange');
    },
    error: function(message) {
        log(message, 'red');
    }
};
var clearButton = document.createElement('button');
clearButton.innerHTML = 'Clear';
clearButton.onclick = function() { 
    while (logger.lastChild && logger.lastChild !== clearButton) {
        logger.removeChild(logger.lastChild);
    }
};
logger.appendChild(clearButton);
// add a textbox to run javascript
var input = document.createElement('input');
input.style.width = '100%';
input.style.boxSizing = 'border-box';
// put the input below the logger div
input.style.position = 'absolute';
input.style.bottom = '0';
input.style.left = '0';
document.body.appendChild(input);

var inputHistory = [];
input.onkeypress = function(e) {
    // if enter is pressed
    if (e.keyCode === 13) {
        try {
            owindow.eval(input.value);
        } catch (e) {
            console.error(e);
        }
        inputHistory.push(input.value);
        input.value = '';
    }
    // if up arrow is pressed
    if (e.keyCode === 38) {
        input.value = inputHistory.pop();
    }
};