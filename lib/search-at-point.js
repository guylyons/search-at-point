'use babel';

import SearchAtPointView from './search-at-point-view';
import { CompositeDisposable } from 'atom';
import querystring from 'querystring';
import opn from 'opn';
import Helpers from './helpers'

export default {

  config: {
    googleSearch: {
      type: 'boolean',
      // description: 'Google',
      default: true
    },
    duckDuckGoSearch: {
      type: 'boolean',
      // description: 'DuckDuckGo',
      default: false
    },
    stackOverFlowSearch: {
      type: 'boolean',
      // description: 'StackOverflow',
      default: false
    }
  },

  searchAtPointView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.searchAtPointView = new SearchAtPointView(state.searchAtPointViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.searchAtPointView.getElement(),
      visible: false
    });

    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      // 'search-at-point:toggle': () => this.toggle(),
      'search-at-point:search': () => this.search()
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

  search() {
    var parsedString = querystring.stringify({ q: Helpers.getSelection()});
    if(atom.config.get('search-at-point').googleSearch) {
      opn('https://google.com/search?' + parsedString);
    }
    if(atom.config.get('search-at-point').duckDuckGoSearch) {
      opn('https://duckduckgo.com/?' + parsedString);
    }
    if(atom.config.get('search-at-point').stackOverFlowSearch) {
      opn('https://stackoverflow.com/search?' + parsedString);
    }
  },

  toggle() {
    // return (
    //   this.modalPanel.isVisible() ?
    //   this.modalPanel.hide() :
    //   this.modalPanel.show()
    // );
  }

};
