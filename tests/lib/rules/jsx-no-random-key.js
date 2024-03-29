/**
 * @fileoverview Prevent usage of random value for `key` prop.
 * @author Pavel Pustovalov
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/jsx-no-random-key');

const parsers = require('../../helpers/parsers');

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true
  }
};

const settings = {
  react: {
    pragma: 'Act',
    fragment: 'Frag'
  }
};

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ERROR_MESSAGE = 'Don\'t use random value for "key" prop';

const ruleTester = new RuleTester({parserOptions});

ruleTester.run('jsx-no-random-key', rule, {
  valid: parsers.all([
    {code: 'fn()'},
    {code: '[1, 2, 3].map(function () {})'},
    {code: '<App />;'},
    {code: '[<App key={0} />, <App key={1} />];'},
    {code: '[1, 2, 3].map(function(x) { return <App key={x} /> });'},
    {code: '[1, 2, 3].map(x => <App key={x} />);'},
    {code: '[1, 2, 3].map(x => { return <App key={x} /> });'},
    {code: '[1, 2, 3].foo(x => <App />);'},
    {code: 'var App = () => <div />;'},
    {code: '[1, 2, 3].map(function(x) { return; });'},
    {code: 'foo(() => <div />);'},
    {
      code: 'foo(() => <></>);',
      features: ['fragment'],
    },
    {
      code: '<></>;',
      features: ['fragment'],
    },
    {
      code: '[<React.Fragment key={1}>1</React.Fragment>];',
      features: ['fragment'],
    },
    {code: '[{uuid: 1}, {uuid: 2}, {uuid: 3}].map(x => { return <App key={x.uuid} /> });'},
    {code: '[{cuid: 1}, {cuid: 2}, {cuid: 3}].map(x => { return <App key={x.cuid} /> });'},
    {code: '[{nanoid: 1}, {nanoid: 2}, {nanoid: 3}].map(x => { return <App key={x.nanoid} /> });'},
    {code: '[{id: 1}, {id: 2}, {id: 3}].map(x => { return <App key={x.id} /> });'},
    {
      code: '[1, 2, 3]?.map(x => <BabelEslintApp key={x} />)',
      features: ['no-default'],
    },
    {code: 'collection.push(<App key="some_key" />);'}
  ]),
  invalid: parsers.all([
    {
      code: '<App key={nanoid()} />',
      errors: [{message: ERROR_MESSAGE}]
    },
    {
      code: '[<App key={nanoid()} />];',
      errors: [{message: ERROR_MESSAGE}]
    },
    {
      code: '[<App key={shortid.generate()} />];',
      errors: [{message: ERROR_MESSAGE}]
    },
    {
      code: '[<App key={cuid()} />];',
      errors: [{message: ERROR_MESSAGE}]
    },
    {
      code: '[<App key={uuidv1()} />];',
      errors: [{message: ERROR_MESSAGE}]
    },
    {
      code: '[<App key={uuidv3()} />];',
      errors: [{message: ERROR_MESSAGE}]
    },
    {
      code: '[<App key={uuidv4()} />];',
      errors: [{message: ERROR_MESSAGE}]
    },
    {
      code: '[<App key={uuidv5()} />];',
      errors: [{message: ERROR_MESSAGE}]
    },
    {
      code: '[<App key={short.generate()} />];',
      errors: [{message: ERROR_MESSAGE}]
    },
    {
      code: '[<App key={slugid.v4()} />];',
      errors: [{message: ERROR_MESSAGE}]
    },
    {
      code: '[<App key={Math.random(100)} />];',
      errors: [{message: ERROR_MESSAGE}]
    },
    {
      code: '[1, 2 ,3].map(function(x) { return <App key={nanoid()} /> });',
      errors: [{message: ERROR_MESSAGE}]
    },
    {
      code: '[1, 2 ,3].map(x => <App key={nanoid()} />);',
      errors: [{message: ERROR_MESSAGE}]
    },
    {
      code: '[1, 2 ,3].map(x => { return <App key={nanoid()} /> });',
      errors: [{message: ERROR_MESSAGE}]
    },
    {
      code: '[1, 2, 3]?.map(x => <BabelEslintApp key={nanoid()} />)',
      features: ['no-default'],
      errors: [{message: ERROR_MESSAGE}]
    },
    {
      code: '[1, 2, 3]?.map(x => <TypescriptEslintApp key={nanoid()} />)',
      features: ['ts'],
      errors: [{message: ERROR_MESSAGE}]
    },
    {
      code: '[1, 2, 3].map(x => <React.Fragment key={nanoid()}>{x}</React.Fragment>);',
      features: ['fragment'],
      settings,
      errors: [{message: ERROR_MESSAGE}]
    },
    {
      code: '[<React.Fragment key={nanoid()}>1</React.Fragment>];',
      features: ['fragment'],
      settings,
      errors: [{message: ERROR_MESSAGE}]
    },
    {
      code: 'collection.push(<App key={nanoid()} />);',
      errors: [{message: ERROR_MESSAGE}]
    }
  ])
});
