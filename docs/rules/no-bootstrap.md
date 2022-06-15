# Prevent usage of bootstrap 3 helper classes

## Rules Details

Example of **incorrect** code for this rule:

```jsx
<div className="alert alert-danger">
  Do not use bootstrap classes
</div>
```

Example of **correct** code for this rule:

```jsx
<FabAlert level="danger">
  Bootstrap classes are not used anymore
</FabAlert>
```

