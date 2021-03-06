"use babel";
import Shell from "shell";
import querystring from "querystring";

export default class Functions {
  static getSelection() {
    if (atom.workspace.getActiveTextEditor()) {
      var editor = atom.workspace.getActiveTextEditor();
      var selection = editor.getSelectedText();

      if (selection === "") {
        editor.moveToBeginningOfWord();
        editor.selectToEndOfWord();
        selection = editor.getSelectedText();
      }

      return selection;
    }
  }

  static searchFor() {
    /**
     * Loop thru atom.config.settings
     * match keys agains keys in urls object
    */
    var settings = atom.config.get("search-at-point");
    var workspace = atom.workspace;
    var selectedText = this.getSelection();
    var parsedString = querystring.stringify({ q: selectedText });

    var urls = {
      googleSearch: "https://google.com/search?" + parsedString,
      duckDuckGoSearch: "https://duckduckgo.com/?" + parsedString,
      stackOverFlowSearch: "https://stackoverflow.com/search?" + parsedString,
      mdnSearch: "https://developer.mozilla.org/en-US/search?" + parsedString,
      codropsSearch:
        "https://tympanus.net/codrops/?s=" +
        parsedString.replace("q=", "") +
        "&search-type=css_reference"
    };

    workspace.notificationManager.addInfo(
      'Searching for string: "' + selectedText + '"'
    );

    setTimeout(function() {
      for (var key in settings) {
        if (settings[key] === true) {
          var queryurl = urls[key];
          Shell.openExternal(queryurl);
        }
      }
    }, 1500);
  }
}
