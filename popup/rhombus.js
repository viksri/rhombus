var x = initialize();
var outer = document.getElementById("outer");

function initialize() {
  var currentEpochBox = document.getElementById("currentEpoch");
  var currentTimeBox = document.getElementById("currentTime");

  var currentTimeValue = new Date();
  currentTimeBox.textContent = "Current time: " + currentTimeValue;
  var currentEpochValue = currentTimeValue.getTime();
  currentEpochBox.textContent = "Current epoch: " + currentEpochValue;

  var start = getInput('1');
}

function getInput(id) {
  var box = document.getElementById("input" + id);
  box.addEventListener("input", function() { 
    addOutput(box, id); 
  });
}

function addOutput(box, id) {
  var result = getOutput(box);
  var container = document.getElementById("container" + id);

  var epochBox = createOutputElement(container, "epoch" + id);
  var timeBox = createOutputElement(container, "time" + id);
  
  timeBox.textContent = "Time: " + result[0];
  epochBox.textContent = "Epoch: " + result[1];

  var nextId = id + 1;
  var next = createNextInput(nextId);
}

function getOutput(inputBox) {
  var inputValue = inputBox.value;
  if (inputValue.length == 0) {
    return ["", ""];
  } else if(isEpoch(inputValue)) {
    var timeValue = new Date(0);
    timeValue.setUTCSeconds(inputValue/1000);
    return [timeValue, inputValue];
  } else {
    return ["Invalid date", "Invalid date"];
  }
}

function createOutputElement(container, id) {
  var outputBox = document.getElementById(id);
  
  if (outputBox == null) {
    outputBox = document.createElement("output");
    outputBox.setAttribute("id", id);
    outputBox.style.fontFamily = "Calibri"; 
    outputBox.style.fontSize = "14px"; 
    outputBox.style.margin = "2px 2px 2px 2px";

    container.appendChild(document.createElement("br"))
    container.appendChild(outputBox);
  }

  return outputBox;
}

function createNextInput(id) {
  var nextContainer = document.getElementById("container" + id);
  if (nextContainer == null) {
    nextContainer = document.createElement("div");
    nextContainer.setAttribute("id", "container" + id);
    nextContainer.style.margin = "2px 10px 10px 10px";

    var nextInput = document.createElement("input");
    nextInput.setAttribute("id", "input" + id);
    nextInput.style.fontFamily = "Calibri"; 
    nextInput.style.fontSize = "14px"; 
    nextInput.style.margin = "2px 2px 2px 2px";
    nextInput.style.border = "1px solid #999999"; 

    outer.appendChild(nextContainer);
    nextContainer.appendChild(nextInput);
    
    getInput(id);
  }
}

function isEpoch(value) {
  return /^\d+$/.test(value);
}