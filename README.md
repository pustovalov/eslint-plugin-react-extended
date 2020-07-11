ESLint-plugin-React-extended
============================

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url] 
[![Coverage Status][coverage-image]][coverage-url] 
[![Code Climate][climate-image]][climate-url] 

React specific linting rules for ESLint

# Installation

Install [ESLint](https://www.github.com/eslint/eslint) either locally or globally. (Note that locally, per project, is strongly preferred)

```sh
$ yarn add eslint --dev
```

If you installed `ESLint` globally, you have to install React plugin globally too. Otherwise, install it locally.

```sh
$ yarn add eslint-plugin-react-extended --dev
```

# Configuration

Use [our preset](#recommended) to get reasonable defaults:

```json
  "extends": [
    "eslint:recommended",
    "plugin:react-extended/recommended"
  ]
```

You should also specify settings that will be shared across all the plugin rules. ([More about eslint shared settings](https://eslint.org/docs/user-guide/configuring#adding-shared-settings))

```json5
{
  "settings": {
    "react": {
      "createClass": "createReactClass", // Regex for Component Factory to use,
                                         // default to "createReactClass"
      "pragma": "React",  // Pragma to use, default to "React"
      "version": "detect", // React version. "detect" automatically picks the version you have installed.
                           // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
                           // default to latest and warns if missing
                           // It will default to "detect" in the future
      "flowVersion": "0.53" // Flow version
    },
    "propWrapperFunctions": [
        // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
        "forbidExtraProps",
        {"property": "freeze", "object": "Object"},
        {"property": "myFavoriteWrapper"}
    ],
    "linkComponents": [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      "Hyperlink",
      {"name": "Link", "linkAttribute": "to"}
    ]
  }
}
```

If you do not use a preset you will need to specify individual rules and add extra configuration.

Add "react" to the plugins section.

```json
{
  "plugins": [
    "react-extended"
  ]
}
```

Enable JSX support.

With ESLint 2+

```json
{
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  }
}
```

Enable the rules that you would like to use.

```json
  "rules": {
    "react-extended/jsx-no-random-key": "error",
  }
```

# List of supported rules

## JSX-specific rules

<!-- AUTO-GENERATED-CONTENT:START (JSX_RULES) -->
* [react-extended/jsx-no-random-key](docs/rules/jsx-no-random-key.md): Prevent usage of random value for `key` prop
<!-- AUTO-GENERATED-CONTENT:END -->

# Shareable configurations

## Recommended

This plugin exports a `recommended` configuration that enforces React good practices.

To enable this configuration use the `extends` property in your `.eslintrc` config file:

```json
{
  "extends": ["eslint:recommended", "plugin:react-extended/recommended"]
}
```

See [ESLint documentation](http://eslint.org/docs/user-guide/configuring#extending-configuration-files) for more information about extending configuration files.

The rules enabled in this configuration are:

* [react-extended/jsx-no-random-key](docs/rules/jsx-no-random-key.md): Prevent usage of random value for `key` prop

## All

This plugin also exports an `all` configuration that includes every available rule.
This pairs well with the `eslint:all` rule.

```json
{
  "plugins": [
    "react-extended"
  ],
  "extends": ["eslint:all", "plugin:react-extended/all"]
}
```

**Note**: These configurations will import `eslint-plugin-react-extended` and enable JSX in [parser options](http://eslint.org/docs/user-guide/configuring#specifying-parser-options).

# License

ESLint-plugin-React-extended is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).


[npm-url]: https://npmjs.org/package/eslint-plugin-react-extended
[npm-image]: https://img.shields.io/npm/v/eslint-plugin-react-extended.svg

[travis-url]: https://travis-ci.org/pustovalov/eslint-plugin-react-extended
[travis-image]: https://img.shields.io/travis/pustovalov/eslint-plugin-react-extended/master.svg

[coverage-url]: https://coveralls.io/r/pustovalov/eslint-plugin-react-extended?branch=master
[coverage-image]: https://img.shields.io/coveralls/pustovalov/eslint-plugin-react-extended/master.svg

[climate-url]: https://codeclimate.com/github/pustovalov/eslint-plugin-react-extended
[climate-image]: https://img.shields.io/codeclimate/maintainability/pustovalov/eslint-plugin-react-extended.svg
