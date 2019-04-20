module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    }
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true
  },
  plugins: ["react"],
  extends: ["eslint:recommended", "plugin:react/recommended"],
  rules: {
    "comma-dangle": 0,
    "react/jsx-uses-vars": 1,
    "react/display-name": 1,
    "no-unused-vars": "warn",
    "no-console": 1,
    "no-unexpected-multiline": "warn"
  },
  settings: {
    react: {
      pragma: "React",
      version: "16.3.1"
    }
  }
};
