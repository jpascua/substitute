console.log("popup.js has loaded");

let submitButton = document.getElementById("submitButton");
let resetButton = document.getElementById("resetButton");
var message = document.getElementById("message");
var desiredWordField = document.getElementById("desiredWord");

document.getElementById("message").innerHTML = "";      // Clear message.

chrome.storage.sync.get("words", function(result) {
    if (typeof result.words === "undefined") {
        chrome.storage.sync.set({words: []});    // Create a new array to store all words.
    }
});

desiredWordField.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        submitButton.click();
    }
});

submitButton.onclick = function() {
    chrome.storage.sync.get("words", function(result) {
        var wordsCopy = result.words;
        var undesiredWord = document.getElementById("undesiredWord").value;
        var desiredWord = document.getElementById("desiredWord").value;

        var inputCheck = undesiredWord.match(new RegExp("^[A-Za-z]+$")) != null;    // Check words for special symbols (i.e. regex).

        if (inputCheck) {
            // if (wordsCopy.length >= 1) {
            //     for (var i = 0; i < wordsCopy.length; i++) {
            //         if (wordsCopy[i].undesiredWord == undesiredWord) {
            //             wordsCopy[i].desiredWord = desiredWord;
            //         } else {
            //             wordsCopy.push({"undesiredWord": undesiredWord, "desiredWord": desiredWord});
            //         }
            //     }
            // } else {
            //     wordsCopy.push({"undesiredWord": undesiredWord, "desiredWord": desiredWord});
            // }

            wordsCopy.push({"undesiredWord": undesiredWord, "desiredWord": desiredWord});

            chrome.storage.sync.set({words: wordsCopy});

            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.executeScript(tabs[0].id, {file: "replace.js"});
            });

            message.style.color = "black";
            message.innerHTML = "Successfully replaced!"

            document.getElementById("form").reset();
        } else {
            message.style.color = "red";
            message.innerHTML = "Input error.<br>Enter a single valid word."
        }
    });
};

resetButton.onclick = function() {
    chrome.storage.sync.remove("words");
    chrome.tabs.reload();   // Reloads the current active tab.
    chrome.storage.sync.set({words: []});
    chrome.runtime.reload();    // Reloads the extension - needed to rerequest permission.
};
