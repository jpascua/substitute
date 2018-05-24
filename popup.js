let submitButton = document.getElementById("submit");

submitButton.onclick = function(element) {
    var textInput1 = document.getElementById("field1").value;
    var textInput2 = document.getElementById("field2").value;

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id,
            {code: "var textInput1 = '" + document.getElementById("field1").value + "'; var textInput2 = '" + document.getElementById("field2").value + "';"},
            function() {chrome.tabs.executeScript(tabs[0].id, {file: "replace.js"})}
        );
    });
};
