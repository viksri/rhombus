var currentInputId = 1
var x = initialize();
var outer = document.getElementById("outer");

var addNewTimeButton = document.getElementById("addContainer");
addNewTimeButton.addEventListener("click", function() {
  createNextInput(currentInputId + 1);
});

var updateDateFormat = document.getElementById("date-format");
updateDateFormat.addEventListener("change", function() {
  updateOutputFormat();
})

function initialize() {
  var currentEpochBox = document.getElementById("currentEpoch");
  var currentTimeBox = document.getElementById("currentTime");

  var currentEpochValue = new Date().getTime();
  currentTimeBox.textContent = "Current time: " + formatDate(currentEpochValue);
  currentEpochBox.textContent = "Current epoch: " + currentEpochValue;

  var start = getInput(currentInputId);
}

function getInput(id) {
  var box = document.getElementById("input" + id);
  box.addEventListener("input", function() {
    addOutput(box, id);
  });
  currentInputId += 1;
  console.log(currentInputId);
}

function addOutput(box, id) {
  var result = getOutput(box);
  var container = document.getElementById("container" + id);

  var epochBox = createOutputElement(container, "epoch" + id);
  var timeBox = createOutputElement(container, "time" + id);

  timeBox.textContent = "Time: " + result[0];
  epochBox.textContent = "Epoch: " + result[1];
}

function isEpoch(value) {
  return /^\d+$/.test(value);
}

function createNextInput(id) {
  var nextContainer = document.getElementById("container" + id);
  if (nextContainer == null) {
    nextContainer = document.createElement("div");
    nextContainer.setAttribute("id", "container" + id);
    nextContainer.setAttribute("class", "container");

    var nextInput = document.createElement("input");
    nextInput.setAttribute("id", "input" + id);
    nextInput.setAttribute("class", "inputBox");

    var nextCancel = document.createElement("button");
    nextCancel.setAttribute("id", "cancel" + id);
    nextCancel.setAttribute("class", "buttonx");
    nextCancel.innerHTML = "x";
    nextCancel.addEventListener("click", function () {
      removeElement(id);
    })

    outer.appendChild(nextContainer);
    nextContainer.appendChild(nextInput);
    nextContainer.appendChild(nextCancel);

    getInput(id);
  }
}

function removeElement(id) {
  var container = document.getElementById("container" + id);
  container.remove();
}

function createOutputElement(container, id) {
  var outputBox = document.getElementById(id);

  if (outputBox == null) {
    outputBox = document.createElement("output");
    outputBox.setAttribute("id", id);
    outputBox.setAttribute("class", "output");

    container.appendChild(document.createElement("br"));
    container.appendChild(outputBox);
  }

  return outputBox;
}


function getOutput(inputBox) {
  var inputValue = inputBox.value;
  if (inputValue.length == 0) {
    return ["", ""];
  } else if (isEpoch(inputValue)) {
    return [formatDate(inputValue), inputValue];
  } else {
    return ["Invalid date", "Invalid date"];
  }
}

function updateOutputFormat() {
  var allElements = document.getElementsByClassName("output");

  for (var i=0; i<allElements.length; i++) {
    if (allElements[i].id.startsWith("time")) {
      // Strip(4) i.e. "time" from "timeXXX" element id, and 
      // Strip(7) i.e. "Epoch: " from "Epoch: XXX" epoch value.
      var epoch = document.getElementById("epoch" + allElements[i].id.substr(4)).value.substr(7);
      allElements[i].innerHTML = "Time: " + formatDate(epoch);
    }
  }
}

function formatDate(epoch) {
  var formatString = document.getElementById("date-format").value;
  var timeValue = new Date(0);
  timeValue.setUTCSeconds(epoch / 1000);
  return timeValue.toLocaleFormat(formatString);
}
