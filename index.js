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
        return {
          JSXOpeningElement: (node) => {
            const componentName = node.name.name;
            const className = node.attributes.find((attr) => attr.name.name === "className");
            if (className && className.value.value !== componentName) {
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

