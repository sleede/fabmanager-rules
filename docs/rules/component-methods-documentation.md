# Enforces presence of leading comments for React component's methods

## Rules Details

Example of **incorrect** code for this rule:

```tsx
export const MyComponent: React.FC<MyComponentProps> = (props) => {
  const [data, setData] = React.useState<Item>([]);
  
  const getItemById = (id: number): Item => {
    return _.find(data, { id });
  };
}
```

Example of **correct** code for this rule:

```tsx
export const MyComponent: React.FC<MyComponentProps> = (props) => {
    const [data, setData] = React.useState<Item>([]);

    /**
     * This method return the item matching the given id, if any.
     */
    const getItemById = (id: number): Item => {
        return _.find(data, { id });
    };
}
```

