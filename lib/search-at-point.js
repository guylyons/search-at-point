'use babel';

import SearchAtPointView from './search-at-point-view';
import { CompositeDisposable } from 'atom';
import querystring from 'querystring';
import opn from 'opn';
import Helpers from './helpers'

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

    // return string of the current selection
    // if there is no selection, fallback to
    // selecting the nearest word


    var parsedString = querystring.stringify({ q: Helpers.getSelection()});
    // opn('https://duckduckgo.com/?' + parsedString);
    opn('https://google.com/search?' + parsedString);
    // opn('https://stackoverflow.com/search?' + parsedString);

    // return (
    //   this.modalPanel.isVisible() ?
    //   this.modalPanel.hide() :
    //   this.modalPanel.show()
    // );
  }

};
