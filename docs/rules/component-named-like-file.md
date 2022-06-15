# Enforces consistent naming of components

## Rules Details

Example of **incorrect** code for this rule:

filename: my-component.tsx
```tsx
export const OtherComponentName: React.FC<MyComponentProps> = (props) => {
}
```

Example of **correct** code for this rule:

filename: my-component.tsx
```tsx
export const MyComponent: React.FC<MyComponentProps> = (props) => {
};
```

