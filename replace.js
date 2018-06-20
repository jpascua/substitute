console.log("replace.js has loaded");

chrome.storage.sync.get("words", function(result) {
    replaceWord(result.words);
})

// Modifies the page by replacing all instances of a word with another.
function replaceWord(words) {
    var elements = document.getElementsByTagName("*");

    // console.log(Object.keys(words).length);
    //
    // for (key in words) {
    //     console.log(key + " = " + words[key]);
    // }

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var nodes = element.childNodes;

        if (element.nodeName != "SCRIPT" && element.nodeName != "STYLE") {
            for (var j = 0; j < nodes.length; j++) {
                if (nodes[j].nodeType == 3) {     // Check whether it's text.
                    for (key in words) {
                        var undesiredWord = key;
                        var desiredWord = words[key];

                        console.log(nodes[j].nodeValue)

                        nodes[j].nodeValue = nodes[j].nodeValue.replace(new RegExp(undesiredWord, "gi"), desiredWord);

                    }
                }
            }
        }
    }
}
