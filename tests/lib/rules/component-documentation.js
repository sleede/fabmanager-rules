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
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: { "jsx": true },
    sourceType: "module"
  }
});

ruleTester.run("component-documentation", rule, {
  valid: [
    {
      code: "/**\n * Lorem ipsum dolor sit amet\n */\n" +
        "export const MyComponent: React.FC<MyComponentProps> = (props) => { return (<div/>); };"
    },
    {
      code: "import React, { ReactNode, useState } from 'react';" +
        "/**\n * This component is a box\n */\n" +
        "const Box: React.FC<BoxProps> = (props) => { return (<div/>); };\n" +
        "const BoxWrapper: React.FC<BoxProps> = (props) => { return (<Loader><Box {...props}/></Loader>); };\n" +
        "export { BoxWrapper as Box };"
    }
  ],

  invalid: [
    {
      code: "export const MyComponent: React.FC<MyComponentProps> = (props) => { return (<div/>); };",
      errors: [{
        message: "Component should have a leading documentation comment.",
        type: "Identifier"
      }],
      output: "/**\n * TODO, document this component\n */\n" +
        "export const MyComponent: React.FC<MyComponentProps> = (props) => { return (<div/>); };"
    },
    {
      code: "const Box: React.FC<BoxProps> = (props) => { return (<div/>); };\n" +
        "const BoxWrapper: React.FC<BoxProps> = (props) => { return (<Loader><Box {...props}/></Loader>); };\n" +
        "export { BoxWrapper as Box };",
      errors: [{
        message: "Component should have a leading documentation comment.",
        type: "Identifier"
      }],
      output: "/**\n * TODO, document this component\n */\n" +
        "const Box: React.FC<BoxProps> = (props) => { return (<div/>); };\n" +
        "const BoxWrapper: React.FC<BoxProps> = (props) => { return (<Loader><Box {...props}/></Loader>); };\n" +
        "export { BoxWrapper as Box };"
    }
  ],
});
