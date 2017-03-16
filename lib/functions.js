'use babel'
/**
 * Return string of current point
 * or current selection
 * return: String
 */
export default class Helpers {
  static getSelection() {
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
}
