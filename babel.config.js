module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.ios.ts', '.android.ts', '.ios.tsx', '.android.tsx', '.ts', '.tsx', '.json', '.js', '.jsx'],
        root: ['.'],
        alias: {
          '@app': './src',
          '@utils': './src/utils',
          '@localTypes': './src/types',
          '@localization': './src/localization',
        },
      },
    ],
  ],
};
