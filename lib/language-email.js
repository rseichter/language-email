const {
    CompositeDisposable
} = require('atom')

module.exports = {
    subscriptions: null,

    activate(state) {
        this.subscriptions = new CompositeDisposable();
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'language-email:cleanupText': () => this.cleanupText()
        }));
    },

    deactivate() {
        this.subscriptions.dispose();
    },

    cleanupText() {
        const editor = atom.workspace.getActiveTextEditor()
        if (editor) {
            s = editor.getSelectedText()
            if (s)
                selectionActive = true
            else {
                selectionActive = false
                s = editor.getText()
            }
            ct = this.cleanupWhitespace(s)
            if (ct) {
                if (selectionActive) {
                    console.log("Replacing selected text")
                    editor.insertText(ct, {
                        "select": selectionActive
                    })
                } else {
                    console.log("Replacing full text")
                    editor.setText(ct)
                }
            }
        }
    },

    cleanupWhitespace(s) {
        if (s) {
            console.log(s)
            ct = s.replace(new RegExp("[ \t]+", "g"), " ")
            console.log(ct)
            if (s != ct)
                return ct
        }
        return undefined
    }
};
