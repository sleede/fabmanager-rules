const { findComponent } = require('../component');

module.exports = {
  "meta": {
    "type": "problem",
    "docs": {
      "description": "Enforce documentation of methods in React components."
    },
    "messages": {
      "no-doc": "Component's methods should have a leading documentation comment."
    },
    "fixable": "code"
  },
  "create": (context) => {
    const sourceCode = context.getSourceCode();
    let component = null;
    return {
      VariableDeclaration: (node) => {
        if (!component) {
          component = findComponent(node, sourceCode);
        }

        if (node.parent &&
          node.parent.parent &&
          node.parent.parent.parent &&
          node.parent.parent.parent.parent &&
          node.parent.parent.parent.parent.parent === component) {

          if (node.declarations[0].init.type === 'ArrowFunctionExpression') {
            const comments = sourceCode.getCommentsBefore(node);

            if (!comments || comments.length === 0) {
              context.report({
                node,
                messageId: 'no-doc',
                fix: (fixer) => {
                  return fixer.insertTextBefore(node, "/**\n * TODO, document this method\n */\n");
                }
              });
            }
          }
        }
      }
    }
  }
};
