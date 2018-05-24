chrome.storage.sync.get(["textInput1", "textInput2"], function(result) {
     replaceWord(result.textInput1, result.textInput2);
})

// Modifies the page by replacing all instances of a word with another.
function replaceWord(undesiredWord, desiredWord) {
    var elements = document.getElementsByTagName("*");

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var nodes = element.childNodes;

        for (var j = 0; j < nodes.length; j++) {
          if (nodes[j].nodeType == 3) {
            var text = nodes[j].nodeValue;

            nodes[j].nodeValue = text.replace(new RegExp(undesiredWord, "gi"), desiredWord);
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
