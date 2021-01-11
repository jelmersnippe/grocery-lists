module.exports = {
    root: true,
    extends: '@react-native-community',
    rules: {
        'prettier/prettier': 0,
        'indent': ['error', 4, {'SwitchCase': 1}],
        'comma-dangle': ['error', 'never'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always']
    },
};
