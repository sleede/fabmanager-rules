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
    "fixable": "code"
  },
  "create": (context) => {
    const sourceCode = context.getSourceCode();
    let component = null;
    return {
      VariableDeclaration: (node) => {
        if (component) return;
        component = findComponent(node, sourceCode);
      },
      'Program:exit': (node) => {
        const comments = sourceCode.getCommentsBefore(component);

        if (!comments || comments.length === 0) {
          context.report({
            node: component,
            messageId: "no-doc",
            fix: (fixer) => {
              return fixer.insertTextBefore(node, "/**\n * TODO, document this component\n */\n");
            }
          });
        }
      }
    }
  }
};

