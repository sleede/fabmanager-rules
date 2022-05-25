# Enforces consistent naming of components classes

## Rules Details

Example of **incorrect** code for this rule:

```jsx
export const MyComponent: React.FC<MyComponentProps> = (props) => {
  return (
    <div className="the-wrong-class-name">
      {props.children}
    </div>
  );
};
```

Example of **correct** code for this rule:

```jsx
export const MyComponent: React.FC<MyComponentProps> = (props) => {
  return (
    <div className="my-component">
      {props.children}
    </div>
  );
};
```

## Rule Options

```js
...
"fabmanager/component-class-named-as-component": [<enabled>, {
  "ignoreAbstractKeyword": true 
}]
...
```
### `ignoreAbstractKeyword`

When set to `true`, this rule ignores the `Abstract` keyword in the component class name.

Eg. `AbstractMyComponent` will require a class named `my-component` instead of `abstract-my-component`.
