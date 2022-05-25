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
        let dashedName = null;
        let jsxNodes = [];

        function evaluateClassName(className) {
          if (className) {
            if (className.value.type === 'Literal') {
              return className.value.value;
            }
            if (className.value.type === 'JSXExpressionContainer') {
              if (className.value.expression.type == 'TemplateLiteral') {
                return className.value.expression.quasis.map(q => q.value.raw).join();
              }
            }
          }
          return '';
        }

        return {
          ExportNamedDeclaration: (node) => {
            let componentName = null;
            if (node.declaration) {
              componentName = node.declaration.declarations[0].id.name;
            }
            if (node.specifiers[0]) {
              componentName = node.specifiers[0].exported.name;
            }
            dashedName = componentName[0].toLowerCase() + componentName.substring(1).replace(/([A-Z])/g, val => `-${val.toLowerCase()}`);;
          },
          JSXOpeningElement: (node) => {
            if (node.parent.parent.type !== 'ReturnStatement') return;
            if (!node.attributes.find((attr) => attr.name.name === 'className')) return;
            jsxNodes.push(node);
          },
          'Program:exit': (node) => {
            let found = false;
            for (const jsxNode of jsxNodes) {
              const classNameAttr = jsxNode.attributes.find((attr) => attr.name.name === 'className');
              const classes = evaluateClassName(classNameAttr);
              const regex = new RegExp("(^|\\s)" + dashedName + "(\\s|$)");

              if (classNameAttr && classes.match(regex)) {
                found = true;
              }
            }
            if (!found) {
              context.report({
                node: jsxNodes[jsxNodes.length-1],
                messageId: 'no-class-name',
                data: {
                  dashedName
                },
                fix: (fixer) => {
                  const fixNode = jsxNodes[jsxNodes.length-1];
                  const classNameAttr = fixNode.attributes.find((attr) => attr.name.name === 'className');
                  const sourceCode = context.getSourceCode();

                  let fixedCode = sourceCode.getText(classNameAttr.value);
                  if (classNameAttr.value.type === 'Literal') {
                    fixedCode = `"${dashedName} ${fixedCode.slice(1, -1)}"`;
                  }
                  if (classNameAttr.value.type === 'JSXExpressionContainer') {
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

