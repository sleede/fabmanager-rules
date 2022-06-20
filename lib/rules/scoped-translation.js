/**
 * @fileoverview Enforce translations to be scoped per component
 * @author Sylvain@sleede.com
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const { findComponent } = require("../component");
/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  "meta": {
    "type": "problem",
    "docs": {
      "description": "Enforce translations to be scoped per component.",
      "url": "https://github.com/sleede/fabmanager-rules/tree/master/docs/rules/scoped-translation.md"
    },
    "messages": {
      "not-scoped": "Component translations must be scoped in a node named like the component."
    },
    "fixable": "code",
    "schema": [{
      "type": "object",
      "properties": {
        "ignoreAbstractKeyword": {
          "type": "boolean"
        }
      },
    }],
  },
  "create": (context) => {
    const config = context.options[0] || {};
    const ignoreAbstractKeyword = config.ignoreAbstractKeyword || false;
    const sourceCode = context.getSourceCode();
    let component = null;
    let scope = null;
    let underscoredName = null;
    return {
      VariableDeclaration: (node) => {
        if (component) return;
        component = findComponent(node, sourceCode);
        if (component) {
          let componentName = component.name;
          if (componentName) {
            if (ignoreAbstractKeyword) componentName = componentName.replace(/^Abstract/, '');
            underscoredName = componentName[0].toLowerCase() + componentName.substring(1).replace(/([A-Z])/g, val => `_${val.toLowerCase()}`);
          }
        }
      },
      CallExpression: (node) => {
        if (node.callee.name === 'useTranslation' && node.arguments[0].type === 'Literal') {
          scope = node.arguments[0].value;
        } else if (node.callee.name === 't') {
          let i18nId = null;
          if (node.arguments[0].type === 'Literal') {
            i18nId = node.arguments[0].value;
          }
          if (node.arguments[0].type === 'TemplateLiteral') {
            i18nId = node.arguments[0].quasis.map(q => q.value.raw).join();
          }
          const pathPattern = new RegExp(`^app\\.${scope}\\.[\\w\\.]*${underscoredName}`);
          if (i18nId && !i18nId.match(pathPattern)) {
            context.report({
              node: node,
              messageId: "not-scoped",
              loc: node.arguments[0].loc,
              fix: (fixer) => {
                let fixedCode = sourceCode.getText(node.arguments[0]);
                fixedCode = fixedCode.replace(/\.(\w+[`"'])$/, `.${underscoredName}.$1`);
                return fixer.replaceText(node.arguments[0], fixedCode);
              }
            });
          }

        }
      }
    };
  },
};
