/**
 * @fileoverview  Prevent usage of random value for `key` prop.
 * @author Pavel Pustovalov
 */

'use strict';

const hasProp = require('jsx-ast-utils/hasProp');
const getPropValue = require('jsx-ast-utils/getPropValue');
const getProp = require('jsx-ast-utils/getProp');
const docsUrl = require('../util/docsUrl');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const FORBIDDEN_KEY_VALUES = [
  'cuid',
  'Math',
  'nanoid',
  'short',
  'shortid',
  'slugid',
  'uuidv1',
  'uuidv3',
  'uuidv4',
  'uuidv5'
];

const ERROR_MESSAGE = 'Don\'t use random value for "key" prop';

module.exports = {
  meta: {
    docs: {
      description: 'Prevent usage of random value for `key` prop',
      category: 'Possible Errors',
      recommended: false,
      url: docsUrl('jsx-no-random-key')
    },
    schema: []
  },

  create(context) {
    return {
      JSXElement(node) {
        if (!hasProp(node.openingElement.attributes, 'key')) {
          return;
        }

        const keyProp = getProp(node.openingElement.attributes, 'key');
        const keyValue = getPropValue(keyProp);

        if (
          keyProp.value &&
          keyProp.value.expression &&
          keyProp.value.expression.type === 'CallExpression' &&
          typeof keyValue === 'string' &&
          FORBIDDEN_KEY_VALUES.some((v) => keyValue.includes(v))
        ) {
          context.report({
            node,
            message: ERROR_MESSAGE
          });
        }
      }
    };
  }
};
