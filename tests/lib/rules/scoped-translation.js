/**
 * @fileoverview Enforce translations to be scoped per component
 * @author Sylvain@sleede.com
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/scoped-translation"),
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
ruleTester.run("scoped-translation", rule, {
  valid: [
    {
      code: "export const MyComponent: React.FC<MyComponentProps> = (props) => {\n" +
        "  const { t } = useTranslation('shared');\n" +
        "  return (<span>{t('app.shared.my_component.message')}</span>);\n" +
        "};"
    },
    {
      code: "export const MyComponent: React.FC<MyComponentProps> = (props) => {\n" +
        "  const { t } = useTranslation('shared');\n" +
        "  return (<span>{t(`app.shared.my_component.${props.foo}`)}</span>);\n" +
        "};"
    },
    {
      code: "export const MyComponent: React.FC<MyComponentProps> = (props) => {\n" +
        "  const { t } = useTranslation('shared');\n" +
        "  return (<span>{t('app.shared.my_component.message_VAR', { VAR: props.foo })}</span>);\n" +
        "};"
    },
    {
      code: "export const MyComponent: React.FC<MyComponentProps> = (props) => {\n" +
        "  const { t } = useTranslation('shared');\n" +
        "  return (<span>{t(`app.shared.deeply.scoped.my_component.${props.foo}.message_VAR`, { VAR: props.bar })}</span>);\n" +
        "};"
    },
    {
      code: "export const MyComponent: React.FC<MyComponentProps> = (props) => {\n" +
        "  return (<HtmlTranslate trKey='app.shared.my_component.text_html' />);\n" +
        "};"
    },
    {
      code: "export const MyComponent: React.FC<MyComponentProps> = (props) => {\n" +
        "  return (<HtmlTranslate trKey={`app.shared.my_component.${props.foo}.text_html`} />);\n" +
        "};"
    },
  ],

  invalid: [
    {
      code: "export const MyComponent: React.FC<MyComponentProps> = (props) => {\n" +
        "    const { t } = useTranslation('shared');\n" +
        "    return (<span>{t('app.shared.wrong_scope.message')}</span>);\n" +
        "};",
      errors: [{
        message: "Component translations must be scoped in a node named like the component.",
        type: "CallExpression"
      }],
      output: "export const MyComponent: React.FC<MyComponentProps> = (props) => {\n" +
        "    const { t } = useTranslation('shared');\n" +
        "    return (<span>{t('app.shared.my_component.message')}</span>);\n" +
        "};"
    },
    {
      code: "export const MyComponent: React.FC<MyComponentProps> = (props) => {\n" +
        "    const { t } = useTranslation('shared');\n" +
        "    return (<span>{t(`app.shared.deeply.scoped.but.wrong_component.${props.foo}.message_VAR`, { VAR: props.bar })}</span>);\n" +
        "};",
      errors: [{
        message: "Component translations must be scoped in a node named like the component.",
        type: "CallExpression"
      }],
      output: "export const MyComponent: React.FC<MyComponentProps> = (props) => {\n" +
        "    const { t } = useTranslation('shared');\n" +
        "    return (<span>{t(`app.shared.deeply.scoped.but.my_component.${props.foo}.message_VAR`, { VAR: props.bar })}</span>);\n" +
        "};",
    },
    {
      code: "export const MyComponent: React.FC<MyComponentProps> = (props) => {\n" +
        "    const { t } = useTranslation('shared');\n" +
        "    return (<span>{t('app.shared.my_component')}</span>);\n" +
        "};",
      errors: [{
        message: "Component translations must be scoped in a node named like the component.",
        type: "CallExpression"
      }],
      output: "export const MyComponent: React.FC<MyComponentProps> = (props) => {\n" +
        "    const { t } = useTranslation('shared');\n" +
        "    return (<span>{t('app.shared.my_component.my_component')}</span>);\n" +
        "};",
    },
    {
      code: "export const MyComponent: React.FC<MyComponentProps> = (props) => {\n" +
        "  return (<HtmlTranslate trKey='app.shared.wrong_name.text_html' />);\n" +
        "};",
      errors: [{
        message: "Component translations must be scoped in a node named like the component.",
        type: "JSXAttribute"
      }],
      output: "export const MyComponent: React.FC<MyComponentProps> = (props) => {\n" +
        "  return (<HtmlTranslate trKey='app.shared.my_component.text_html' />);\n" +
        "};",
    },
    {
      code: "export const MyComponent: React.FC<MyComponentProps> = (props) => {\n" +
        "  return (<HtmlTranslate trKey={`app.shared.wrong_name.${props.foo}.text_html`} />);\n" +
        "};",
      errors: [{
        message: "Component translations must be scoped in a node named like the component.",
        type: "JSXAttribute"
      }],
      output: "export const MyComponent: React.FC<MyComponentProps> = (props) => {\n" +
        "  return (<HtmlTranslate trKey={`app.shared.my_component.${props.foo}.text_html`} />);\n" +
        "};"
    },
  ],
});
