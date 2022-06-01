module.exports = {
  "meta": {
    "type": "problem",
    "docs": {
      "description": "Enforce React components to have a CSS class named like the component on their top level tag.",
      "url": "https://github.com/sleede/fabmanager-rules/tree/master/docs/rules/component-class-named-as-component.md"
    },
    "messages": {
      "no-class-name": "Component className should have a class named like the component, with dashes, on its top level tag."
    },
    "fixable": "code",
    "schema": [{
      "type": "object",
      "properties": {
        "ignoreAbstractKeyword": {
          "type": "boolean"
        }
      },
    }]
  },
  "create": (context) => {
    const config = context.options[0] || {};
    const ignoreAbstractKeyword = config.ignoreAbstractKeyword || false;
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
        if (node.declaration && node.declaration.type === 'VariableDeclaration') {
          componentName = node.declaration.declarations[0].id.name;
        } else if (node.specifiers[0]) {
          componentName = node.specifiers[0].exported.name;
        }

        if (componentName) {
          if (ignoreAbstractKeyword) componentName = componentName.replace(/^Abstract/, '');
          dashedName = componentName[0].toLowerCase() + componentName.substring(1).replace(/([A-Z])/g, val => `-${val.toLowerCase()}`);
        }
      },
      JSXOpeningElement: (node) => {
        if (node.parent.parent.type !== 'ReturnStatement') return;
        if (!node.attributes.find((attr) => attr.name && attr.name.name === 'className')) return;
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
          const errNode = jsxNodes[jsxNodes.length-1];
          if (!errNode) return;

          const classNameAttr = errNode.attributes.find((attr) => attr.name.name === 'className');

          context.report({
            node: classNameAttr,
            messageId: 'no-class-name',
            data: {
              dashedName
            },
            fix: (fixer) => {
              const sourceCode = context.getSourceCode();

              let fixedCode = sourceCode.getText(classNameAttr.value);
              if (classNameAttr.value.type === 'Literal') {
                fixedCode = `"${dashedName} ${fixedCode.slice(1, -1)}"`;
              } else if (classNameAttr.value.type === 'JSXExpressionContainer') {
                if (classNameAttr.value.expression.type === 'TemplateLiteral') {
                  fixedCode = fixedCode.replace('{`', `{\`${dashedName} `);
                } else if (['LogicalExpression', 'Identifier'].includes(classNameAttr.value.expression.type)) {
                  fixedCode = fixedCode.replace(/^{(.+)}$/, `{\`${dashedName} $$\{$1}\`}`);
                }
              }
              return fixer.replaceText(classNameAttr.value, fixedCode);
            }
          });
        }
      }
    }
  }
};
