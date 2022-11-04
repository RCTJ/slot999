'use babel';

import Slot999View from './slot999-view';
import { CompositeDisposable } from 'atom';

export default {

  slot999View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.slot999View = new Slot999View(state.slot999ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.slot999View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'slot999:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.slot999View.destroy();
  },

  serialize() {
    return {
      slot999ViewState: this.slot999View.serialize()
    };
  },

  toggle() {
    console.log('Slot999 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
