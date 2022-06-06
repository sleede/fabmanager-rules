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
  create: (context) => {
    return {
      ExportNamedDeclaration: (node) => {
        const sourceCode = context.getSourceCode();
        const comments = sourceCode.getCommentsBefore(node);

        if (!comments || comments.length === 0) {
          context.report({
            node: node,
            messageId: "no-doc",
            fix: (fixer) => {

              let fixedCode = sourceCode.getText(node);
              return fixer.insertTextBefore(node, "/**\n * TODO, document this component\n */\n");
            }
          });
        }
      }
    }
  }
};

