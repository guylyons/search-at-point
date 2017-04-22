'use babel'

import querystring from 'querystring';
import opn from 'opn';

export default class Functions {
  static getSelection() {
    /**
     * Get Selection
     * @return String
     */
    if(atom.workspace.getActiveTextEditor()) {
      var editor = atom.workspace.getActiveTextEditor();
      var selection = editor.getSelectedText();

      if(selection === '') {
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
    var settings = atom.config.get('search-at-point');
    var parsedString = querystring.stringify({ q: this.getSelection()});

    var urls = {
      'googleSearch': 'https://google.com/search?' + parsedString,
      'duckDuckGoSearch': 'https://duckduckgo.com/?' + parsedString,
      'stackOverFlowSearch': 'https://stackoverflow.com/search?' + parsedString,
      'mdnSearch': 'https://developer.mozilla.org/en-US/search?' + parsedString,
      'codropsSearch': 'https://tympanus.net/codrops/?s=' + parsedString.replace('q=', '') + '&search-type=css_reference'
    }

    for(var key in settings) {
      if(settings[key] === true) {
        var queryurl = urls[key];
        opn(queryurl);
      }
    }
  }
}
