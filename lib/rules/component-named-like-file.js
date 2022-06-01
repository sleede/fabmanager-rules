module.exports = {
  "meta": {
    "type": "problem",
    "docs": {
      "description": "Enforce React components to be named like their file."
    },
    "messages": {
      "component-name": "Component name should match the file name."
    },
    "fixable": "code"
  },
  create: (context) => {
    return {
      ExportNamedDeclaration: (node) => {
        let component = null;
        if (node.declaration && node.declaration.type === 'VariableDeclaration') {
	  component = node.declaration.declarations[0].id;
        }
        if (node.specifiers[0]) {
	  component = node.specifiers[0].exported;
        }
	const filePath = context.getPhysicalFilename();
        const fileId = filePath.match(/^\/?(.+\/)*([^.]+)(\.(.+))?$/)[2];
        const camelName = fileId[0].toUpperCase() + fileId.substring(1).replace(/-([a-z])/g, (_, p1) => p1.toUpperCase());

        if (component && camelName !== component.name) {
          context.report({
            node: component,
            messageId: "component-name",
            data: {
              camelName
            },
            fix: (fixer) => {
              const sourceCode = context.getSourceCode();
          
              let fixedCode = sourceCode.getText(component);
              fixedCode = fixedCode.replace(component.name, camelName);
              return fixer.replaceText(component, fixedCode);
            }
          });
	}
      }
    }
  }
};
