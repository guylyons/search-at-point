'use babel';

import SearchAtPointView from './search-at-point-view';
import { CompositeDisposable } from 'atom';
import Functions from './functions'

export default {

  config: {
    googleSearch: {
      type: 'boolean',
      default: true
    },
    duckDuckGoSearch: {
      type: 'boolean',
      default: false
    },
    stackOverFlowSearch: {
      type: 'boolean',
      default: false
    },
    mdnSearch: {
      type: 'boolean',
      default: false
    },
    codropsSearch: {
      type: 'boolean',
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
    Functions.searchFor();
  }

};
