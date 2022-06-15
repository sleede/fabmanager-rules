module.exports = {
  /**
   * Return the React component
   */
  findComponent: function (node, sourceCode) {
    let component = null;
    if (node.declarations &&
      node.declarations[0] &&
      node.declarations[0].id &&
      node.declarations[0].id.typeAnnotation &&
      node.declarations[0].id.typeAnnotation.typeAnnotation &&
      node.declarations[0].id.typeAnnotation.typeAnnotation.typeName) {

      if (sourceCode.getText(node.declarations[0].id.typeAnnotation.typeAnnotation.typeName) === 'React.FC') {
        component = node.parent;
      }
    }

    if (component) {
      if (component.declaration && component.declaration.type === 'VariableDeclaration') {
        return component.declaration.declarations[0].id;
      } else if (component.specifiers && component.specifiers[0]) {
        return component.specifiers[0].exported;
      }
    }
  }
};
