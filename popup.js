console.log("popup.js has loaded");

let submitButton = document.getElementById("submit");
let resetButton = document.getElementById("reset");

submitButton.onclick = function() {
    chrome.storage.sync.get("words", function(result) {
        if (typeof result.words === "undefined") {
            chrome.storage.sync.set({words: {}});    // Create a new Map to store all words
        } else {
            var wordsCopy = result.words;

            wordsCopy[document.getElementById("field1").value] = document.getElementById("field2").value;

            chrome.storage.sync.set({words: wordsCopy});

            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.executeScript(tabs[0].id, {file: "replace.js"});
            });
        }
    });
};

resetButton.onclick = function() {
    chrome.storage.sync.set({words: {}});
    chrome.tabs.reload();
};

// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//     console.log("onUpdated Listener!");
//     if(changeInfo.status == "complete") {
//         chrome.tabs.executeScript(tabId, {file: "replace.js"});
//     }
// });
