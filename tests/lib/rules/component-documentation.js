/**
 * @fileoverview Tests for component-documentation
 * @author Sleede
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/component-documentation"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run("component-documentation", rule, {
  valid: [
    {
      code: "/**\n" +
        " * Lorem ipsum dolor sit amet\n" +
        " */\n" +
        "export const MyComponent: React.FC<MyComponentProps> = (props) => {\n" +
        "  return (<div/>);\n" +
        "};",
      parserOptions: {
        ecmaVersion: 2018,
        ecmaFeatures: { "jsx": true },
        sourceType: "module"
      }
    }
  ],

  invalid: [
    {
      code: "export const MyComponent: React.FC<MyComponentProps> = (props) => {\n" +
        "  return (<div/>);\n" +
        "};",
      parserOptions: {
        ecmaVersion: 2018,
        ecmaFeatures: { "jsx": true },
        sourceType: "module"
      },
      errors: [{
        message: "Component should have a leading documentation comment.",
        type: "Identifier"
      }],
      output: "/**\n * TODO, document this component\n */\n" +
        "export const MyComponent: React.FC<MyComponentProps> = (props) => {\n" +
        "  return (<div/>);\n" +
        "};"
    },
  ],
});
