const path = require('path');
const WebpackObfuscator = require('webpack-obfuscator');

module.exports = {
  entry: './src/main.ts', // Replace with the entry file of your application
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new WebpackObfuscator({
      rotateStringArray: true,
      compact: true,
      controlFlowFlattening: true,
      deadCodeInjection: true,
      deadCodeInjectionThreshold: 0.4,
      identifierNamesGenerator: 'hexadecimal',
      log: false,
      numbersToExpressions: true,
      renameGlobals: true,
      selfDefending: true,
      stringArray: true,
      stringArrayThreshold: 0.75,
      unicodeEscapeSequence: true,
    }),
  ],
};
