# Enforces presence of leading comments for components

## Rules Details

Example of **incorrect** code for this rule:

```jsx
export const OtherComponentName: React.FC<MyComponentProps> = (props) => {
}
```

Example of **correct** code for this rule:

```jsx
/**
 * This component is used as documentation purposes
 */
export const MyComponent: React.FC<MyComponentProps> = (props) => {
};
```

