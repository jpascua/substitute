let submitButton = document.getElementById("submit");

submitButton.onclick = function(element) {
    chrome.storage.sync.set(
        {textInput1: document.getElementById("field1").value,
        textInput2: document.getElementById("field2").value});

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {file: "replace.js"})
    });
};
