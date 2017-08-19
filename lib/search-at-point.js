"use babel";

import { CompositeDisposable } from "atom";
import Functions from "./functions";

export default {
  config: {
    googleSearch: {
      type: "boolean",
      default: true
    },
    duckDuckGoSearch: {
      type: "boolean",
      default: false
    },
    stackOverFlowSearch: {
      type: "boolean",
      default: false
    },
    mdnSearch: {
      type: "boolean",
      default: false
    },
    codropsSearch: {
      type: "boolean",
      default: false
    }
  },

  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.commands.add("atom-workspace", {
        "search-at-point:search": () => this.search()
      })
    );
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {},

  search() {
    Functions.searchFor();
  }
};
