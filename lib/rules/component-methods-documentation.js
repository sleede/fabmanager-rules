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
  create: (context) => {
    let component = null;
    return {
      ExportNamedDeclaration(node) {
        if (node.declaration && node.declaration.type === 'VariableDeclaration' || node.specifiers[0]) {
          component = node;
        }
      },
      VariableDeclaration(node) {
        const sourceCode = context.getSourceCode();
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

