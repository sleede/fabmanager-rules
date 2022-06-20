const { findComponent } = require('../component');

module.exports = {
  "meta": {
    "type": "problem",
    "docs": {
      "description": "Enforce React components to be have a leading documentation."
    },
    "messages": {
      "no-doc": "Component should have a leading documentation comment."
    },
    "fixable": "code",
    "schema": []
  },
  "create": (context) => {
    const sourceCode = context.getSourceCode();
    let component = null;
    return {
      VariableDeclaration: (node) => {
        if (component) return;
        component = findComponent(node, sourceCode);
      },
      'Program:exit': () => {
        if (!component) return;

        let root = component.parent.parent;
        if (component.parent.parent.parent.type === 'ExportNamedDeclaration') {
          root = component.parent.parent.parent;
        }
        const comments = sourceCode.getCommentsBefore(root);

        if (!comments || comments.length === 0) {
          context.report({
            node: component,
            messageId: "no-doc",
            fix: (fixer) => {
              return fixer.insertTextBefore(root, "/**\n * TODO, document this component\n */\n");
            }
          });
        }
      }
    }
  }
};

