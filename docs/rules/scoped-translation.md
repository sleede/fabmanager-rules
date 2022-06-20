# Enforce translations to be scoped per component 

## Rule Details

Examples of **incorrect** code for this rule:

```tsx
export const MyComponent: React.FC<MyComponentProps> = (props) => {
    const { t } = useTranslation('shared');
    return (
        <span>{t('app.shared.wrong_scope.message')}</span>
    );
};
```

Examples of **correct** code for this rule:

```js
export const MyComponent: React.FC<MyComponentProps> = (props) => {
  const { t } = useTranslation('shared');
  return (
    <span>{t('app.shared.my_component.message')}</span>
  );
};
```
