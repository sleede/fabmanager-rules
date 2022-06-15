# Prevent usage of fab-manager's utilities helper classes

## Rules Details

Example of **incorrect** code for this rule:

```jsx
<div className="block rounded text-lg m-r">
  Do not use utilities classes
</div>
```

Example of **correct** code for this rule:

```jsx
<div className="my-component">
  Use stylesheets and css variables
</div>
```

```scss
.my-component {
  display: block;
  border-radius: var(--border-radius);
  font-size: var(--font-size-large);
  margin-right: var(--margin-normal);
}
```

