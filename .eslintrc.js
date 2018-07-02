module.exports = {
  extends: [
    'react-app',
    'xo-space/esnext',
    'xo-react/space',
    'plugin:unicorn/recommended',
    'plugin:jsx-a11y/recommended'
  ],
  plugins: [
    'unicorn',
    'jsx-a11y'
  ],
  rules: {
    'react/jsx-closing-bracket-location': 'off',
    'react/jsx-closing-tag-location': 'off'
  }
};
