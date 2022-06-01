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
        if (!node.leadingComments) {
		throw node.leadingComments;
          context.report({
            node: node,
            messageId: "no-doc",
            fix: (fixer) => {
              const sourceCode = context.getSourceCode();

              let fixedCode = sourceCode.getText(node);
              return fixer.insertTextBefore(node, "/**\n * TODO, document this component\n */\n");
            }
          });
        }
      }
    }
  }
};

