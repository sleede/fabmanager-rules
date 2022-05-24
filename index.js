module.exports = {
  "rules": {
    "component-class-named-as-component": {
      "meta": {
        "type": "problem",
        "docs": {
          "description": "Enforce React components to have a CSS class named like the component on their top level tag."
        },
        "messages": {
          "no-class-name": "Component class name should be named like the component on their top level tag."
        }
      },
      "create": (context) => {
        function findDeclaration (node) {
          if (node.type === "VariableDeclarator") return node;
          else return findDeclaration(node.parent);
        }

        function evaluateClassName(value) {
          if (value.type === "Literal") {
            return value.value;
          }
          if (value.type === "JSXExpressionContainer") {
            return value.expression.quasis.map(q => q.value.raw).join();
          }
        }

       return {
          JSXOpeningElement: (node) => {
            const componentName = findDeclaration(node).id.name;
            const dashedName = componentName[0].toLowerCase() + componentName.substring(1).replace(/([A-Z])/g, val => `-${val.toLowerCase()}`);;

            const classNameAttr = node.attributes.find((attr) => attr.name.name === "className");
            const classes = evaluateClassName(classNameAttr.value);
            const regex = new RegExp("(^|\\s)" + dashedName + "(\\s|$)");

            if (classNameAttr && !classes.match(regex)) {
              context.report({
                node,
                messageId: "no-class-name",
                data: {
                  componentName
                }
              });
            }
          }
        }
      }
    }
  }
};

