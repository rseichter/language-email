'use babel';

import LanguageEmailView from './language-email-view';
import { CompositeDisposable } from 'atom';

export default {

  languageEmailView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageEmailView = new LanguageEmailView(state.languageEmailViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageEmailView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-email:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageEmailView.destroy();
  },

  serialize() {
    return {
      languageEmailViewState: this.languageEmailView.serialize()
    };
  },

  toggle() {
    console.log('LanguageEmail was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
