module.exports = {
  "rules": {
    "component-class-named-as-component": {
      "meta": {
        "type": "problem",
        "docs": {
          "description": "Enforce React components to have a CSS class named like the component on their top level tag."
        },
        "messages": {
          "no-class-name": "Component className should have a class named like the component, with dashes, on its top level tag."
        },
        "fixable": "code"
      },
      "create": (context) => {
        let found = false;

        function findRoot (node) {
          if (node.parent) return findRoot(node.parent);
          else return node;
        }

        function evaluateClassName(className) {
          if (className) {
            if (className.value.type === "Literal") {
              return className.value.value;
            }
            if (className.value.type === "JSXExpressionContainer") {
              return className.value.expression.quasis.map(q => q.value.raw).join();
            }
	  }
          return '';
        }

       return {
          JSXOpeningElement: (node) => {
            // only target root elements
            if (node.parent.parent.type !== 'ReturnStatement') return;
            // we do not want to trigger this verification multiple times if the matching class was found
            if (found) return;

            const root = findRoot(node);
            const namedExport = root.body.find(n => n.type === "ExportNamedDeclaration");
            let componentName = '';
            if (namedExport.declaration) {
              componentName = namedExport.declaration.declarations[0].id.name;
            }
            if (namedExport.specifiers[0]) {
              componentName = namedExport.specifiers[0].exported.name;
            }
            const dashedName = componentName[0].toLowerCase() + componentName.substring(1).replace(/([A-Z])/g, val => `-${val.toLowerCase()}`);;

            const classNameAttr = node.attributes.find((attr) => attr.name.name === "className");
            const classes = evaluateClassName(classNameAttr);
            const regex = new RegExp("(^|\\s)" + dashedName + "(\\s|$)");

            if (classNameAttr && classes.match(regex)) {
              found = true;
            }

            if (classNameAttr && !classes.match(regex)) {
              context.report({
                node,
                messageId: "no-class-name",
                data: {
                  componentName
                },
                fix: (fixer) => {
                  const sourceCode = context.getSourceCode();
                  let fixedCode = sourceCode.getText(classNameAttr.value);
                  if (classNameAttr.value.type === "Literal") {
                     fixedCode = `"${dashedName} ${fixedCode.slice(1, -1)}"`;
                  }
                  if (classNameAttr.value.type === "JSXExpressionContainer") {
                    fixedCode = fixedCode.replace('{`', `{\`${dashedName} `);
                  }
                  return fixer.replaceText(classNameAttr.value, fixedCode);
                }
              });
            }
          }
        }
      }
    }
  }
};

