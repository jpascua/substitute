chrome.storage.sync.get("words", function(result) {
    replaceWord(result.words);
})

// Modifies the page by replacing all instances of a word with another.
function replaceWord(words) {
    var elements = document.getElementsByTagName("*");

    // console.log(words.length);
    //
    // for (var i = 0; i < words.length; i++) {
    //     console.log(words[i].undesiredWord + " = " + words[i].desiredWord);
    // }

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var nodes = element.childNodes;

        if (element.nodeName != "SCRIPT" && element.nodeName != "STYLE") {
            for (var j = 0; j < nodes.length; j++) {
                if (nodes[j].nodeType == 3) {     // Check whether it's text.
                    for (var k = 0; k < words.length; k++) {
                        nodes[j].nodeValue = nodes[j].nodeValue.replace(new RegExp(words[k].undesiredWord, "gi"), words[k].desiredWord);

                    }
                }
            }
        }
    }
}
