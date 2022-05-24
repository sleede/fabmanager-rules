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
        }
      },
      "create": (context) => {
        function findDeclaration (node) {
          if (node.type === "VariableDeclarator") return node;
          else return findDeclaration(node.parent);
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
            const componentName = findDeclaration(node).id.name;
            const dashedName = componentName[0].toLowerCase() + componentName.substring(1).replace(/([A-Z])/g, val => `-${val.toLowerCase()}`);;

            const classNameAttr = node.attributes.find((attr) => attr.name.name === "className");
            const classes = evaluateClassName(classNameAttr);
            const regex = new RegExp("(^|\\s)" + dashedName + "(\\s|$)");

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

