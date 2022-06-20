# eslint-plugin-fabmanager

ESLint rules for Fab-manager

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-fabmanager`:

```sh
npm install eslint-plugin-fabmanager --save-dev
```

## Usage

Add `fabmanager` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "fabmanager"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "fabmanager/no-bootstrap": "error"
    }
}
```

## Development

Use [Yeoman](https://github.com/eslint/generator-eslint) to generate a new rule.

Code with test-driven development.
