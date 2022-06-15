module.exports = {
  "rules": {
    "component-class-named-as-component": require('./lib/rules/component-class-named-as-component'),
    "component-named-like-file": require('./lib/rules/component-named-like-file'),
    "component-documentation": require('./lib/rules/component-documentation'),
    "no-bootstrap": require('./lib/rules/no-bootstrap'),
    "no-utilities": require('./lib/rules/no-utilities')
  }
};

