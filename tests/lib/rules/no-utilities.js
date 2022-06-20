/**
 * @fileoverview Tests for no-utilities
 * @author Sylvain@sleede.com
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-utilities"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: { "jsx": true },
  }
});

ruleTester.run("no-utilities", rule, {
  valid: [
    "<div />",
    "<div className='my-div' />",
    "<div className='my-div other-style' />"
  ],

  invalid: [
    {
      code: "<div className='m-t-lg' />",
      errors: [{
        message: "You should not use utilities classes. Component styles must be written in a per-component SCSS file.",
        type: "Literal"
      }]
    }
  ],
});
