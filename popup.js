let submitButton = document.getElementById("submit");

submitButton.onclick = function() {
    chrome.storage.sync.set(
        {textInput1: document.getElementById("field1").value,
        textInput2: document.getElementById("field2").value});

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {file: "replace.js"});
    });
};

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    console.log("onUpdated Listener!");
    if(changeInfo.status == "complete") {
        chrome.tabs.executeScript(tabId, {file: "replace.js"});
    }
});
