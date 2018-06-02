console.log("replace.js has loaded");
chrome.storage.sync.get(["words"], function(result) {
    if (typeof result.words === "undefined") {
        // Do nothing
    } else {
        replaceWord(result.words);
    }
})

// Modifies the page by replacing all instances of a word with another.
function replaceWord(words) {
    var elements = document.getElementsByTagName("*");

    console.log(Object.keys(words).length);

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var nodes = element.childNodes;

        for (var j = 0; j < nodes.length; j++) {
          if (nodes[j].nodeType == 3) {
            for (key in words) {
                var undesiredWord = key;
                var desiredWord = words[key];

                nodes[j].nodeValue = nodes[j].nodeValue.replace(new RegExp(undesiredWord, "gi"), desiredWord);
            }
          }
        }

        // for(var j = 0; j < element.childNodes.length; j++) {
        //     var node = element.childNodes[j];
        //
        //     console.log(node);
        //
        //     if (node.nodeType === 3) {
        //         var text = node.nodeValue;
        //
        //         if (textInput == text) {
        //             element.replaceChild(document.createTextNode(""), node);
        //         }
        //     }
        // }
    }
}
