module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['plugin:react/recommended', 'airbnb'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        'react/require-default-props': 'off',
        'react/no-unstable-nested-components': 'off',
        'react/destructuring-assignment': 'off',
        'consistent-return': 'off',
        'no-param-reassign': 'off',
        'no-nested-ternary': 'off',
        'no-confusing-arrow': 'off',
        'import/no-named-as-default': 'off',
        'eol-last': 'off',
        'react/jsx-filename-extension': [
            'error',
            { extensions: ['.js', '.jsx'] }
        ],
        'react/forbid-prop-types': 'off',
        'no-underscore-dangle': 'off',
        'linebreak-style': ['error', 'windows'],
        'react/jsx-wrap-multilines': 'off',
        'object-curly-newline': ['error', { multiline: true }],
        'import/prefer-default-export': 'off',
        'react/jsx-props-no-spreading': 'off',
        semi: ['error', 'never'],
        indent: [
            'error',
            4,
            {
                ignoredNodes: [
                    'JSXElement',
                    'JSXElement > *',
                    'JSXAttribute',
                    'JSXIdentifier',
                    'JSXNamespacedName',
                    'JSXMemberExpression',
                    'JSXSpreadAttribute',
                    'JSXExpressionContainer',
                    'JSXOpeningElement',
                    'JSXClosingElement',
                    'JSXText',
                    'JSXEmptyExpression',
                    'JSXSpreadChild'
                ]
            }
        ],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-closing-bracket-location': 'off',
        'no-trailing-spaces': 'off',
        'padded-blocks': 'off',
        quotes: ['error', 'single'],
        'comma-dangle': ['error', 'never'],
        'arrow-body-style': 'off',
        'react/function-component-definition': [
            2,
            {
                namedComponents: 'arrow-function',
                unnamedComponents: 'arrow-function'
            }
        ]
    }
}
