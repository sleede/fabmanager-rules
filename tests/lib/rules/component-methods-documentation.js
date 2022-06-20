/**
 * @fileoverview Tests for component-methods-documentation
 * @author Sylvain@sleede.com
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/component-methods-documentation"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: { "jsx": true },
    sourceType: "module"
  }
});

ruleTester.run("component-methods-documentation", rule, {
  valid: [
    {
      code: "export const MyComponent: React.FC<MyComponentProps> = (props) => {\n" +
        "  /**\n * This method prints foo:bar\n */\n" +
        "  const foo = (): string => { return 'foo:bar'; }\n" +
        "  return (<div>{foo()}</div>);\n" +
        "};"
    }
  ],

  invalid: [
    {
      code: "export const MyComponent: React.FC<MyComponentProps> = (props) => {\n" +
        "  const foo = (): string => { return 'foo:bar'; }\n" +
        "  return (<div>{foo()}</div>);\n" +
        "};",
      errors: [{
        message: "Component's methods should have a leading documentation comment.",
        type: "VariableDeclaration"
      }],
      output: "export const MyComponent: React.FC<MyComponentProps> = (props) => {\n" +
        "  /**\n   * TODO, document this method\n   */\n" +
        "  const foo = (): string => { return 'foo:bar'; }\n" +
        "  return (<div>{foo()}</div>);\n" +
        "};",
    }
  ],
});
