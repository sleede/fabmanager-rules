/**
 * @fileoverview Tests for component-class-named-as-component
 * @author Sylvain@sleede.com
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/component-class-named-as-component"),
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

ruleTester.run("component-class-named-as-component", rule, {
  valid: [
    {
      code: "export const MyComponent: React.FC<MyComponentProps> = (props) => {\n" +
        "  return (\n" +
        "    <div className=\"my-component\">\n" +
        "      {props.children}\n" +
        "    </div>\n" +
        "  );\n" +
        "};"
    },
    {
      code: "export const MyGenericComponent = <TAlpha extends Alpha>(props: MyGenericComponentProps<TAlpha>) => {\n" +
        " return (\n" +
        "    <div className=\"my-generic-component\">\n" +
        "      {props.children}\n" +
        "    </div>\n" +
        "  );\n" +
        "};"
    }
  ],

  invalid: [
    {
      code: "export const MyComponent: React.FC<MyComponentProps> = (props) => {\n" +
        "  return (\n" +
        "    <div className=\"the-wrong-class-name\">\n" +
        "      {props.children}\n" +
        "    </div>\n" +
        "  );\n" +
        "};",
      errors: [{
        message: "Component className should have a class named like the component, with dashes, on its top level tag.",
        type: "JSXAttribute"
      }],
      output: "export const MyComponent: React.FC<MyComponentProps> = (props) => {\n" +
        "  return (\n" +
        "    <div className=\"my-component the-wrong-class-name\">\n" +
        "      {props.children}\n" +
        "    </div>\n" +
        "  );\n" +
        "};"
    },
  ],
});
