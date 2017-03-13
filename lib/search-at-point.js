'use babel';

import SearchAtPointView from './search-at-point-view';
import { CompositeDisposable } from 'atom';
import querystring from 'querystring';
import opn from 'opn';

export default {

  searchAtPointView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.searchAtPointView = new SearchAtPointView(state.searchAtPointViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.searchAtPointView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'search-at-point:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.searchAtPointView.destroy();
  },

  serialize() {
    return {
      searchAtPointViewState: this.searchAtPointView.serialize()
    };
  },

  toggle() {
    function parseString() {
      if(atom.workspace.getActiveTextEditor()) {
        var editor = atom.workspace.getActiveTextEditor();
        var selection = editor.getSelectedText()
        return selection;
      }
    }
    console.log(parseString());

    var parsedString = querystring.stringify({ q: parseString()});
    opn('https://google.com/search?' + parsedString);

    // return (
    //   this.modalPanel.isVisible() ?
    //   this.modalPanel.hide() :
    //   this.modalPanel.show()
    // );
  }

};
