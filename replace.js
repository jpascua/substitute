console.log("replace.js has loaded");
chrome.storage.sync.get(["words"], function(result) {
    if (typeof result.words === "undefined") {
    } else {
        console.log(result.words.length);
        for(var i = 0; i < result.words.length; i++) {
            console.log(result.words[i]);
        }

        replaceWord(result.words);
    }
})

// Modifies the page by replacing all instances of a word with another.
function replaceWord(words) {
    var elements = document.getElementsByTagName("*");

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var nodes = element.childNodes;

        for (var j = 0; j < nodes.length; j++) {
          if (nodes[j].nodeType == 3) {
            var text = nodes[j].nodeValue;

            for(var k = 0; k <= words.length-2; k += 2) {
                nodes[j].nodeValue = text.replace(new RegExp(words[k], "gi"), words[k + 1]);
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
