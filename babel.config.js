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
          "@guards":"./src/guards",
          '@screens': './src/screens',
          '@localTypes': './src/types',
          '@services': './src/services',
          '@components': './src/components',
          '@localization': './src/localization',
        },
      },
    ],
    'react-native-reanimated/plugin'
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
