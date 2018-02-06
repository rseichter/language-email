'use babel';

import LanguageEmail from '../lib/language-email';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('LanguageEmail', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('language-email');
  });

  describe('when the language-email:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.language-email')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'language-email:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.language-email')).toExist();

        let languageEmailElement = workspaceElement.querySelector('.language-email');
        expect(languageEmailElement).toExist();

        let languageEmailPanel = atom.workspace.panelForItem(languageEmailElement);
        expect(languageEmailPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'language-email:toggle');
        expect(languageEmailPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.language-email')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'language-email:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let languageEmailElement = workspaceElement.querySelector('.language-email');
        expect(languageEmailElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'language-email:toggle');
        expect(languageEmailElement).not.toBeVisible();
      });
    });
  });
});
