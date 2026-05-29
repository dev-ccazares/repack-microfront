const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

const MOCKS = {
  'react-native-screens': path.resolve(__dirname, 'src/mocks/react-native-screens.js'),
  'react-native-reanimated': path.resolve(__dirname, 'src/mocks/react-native-reanimated.js'),
  'react-native-reanimated-skeleton': path.resolve(__dirname, 'src/mocks/react-native-reanimated-skeleton.js'),
  'react-native-view-shot': path.resolve(__dirname, 'src/mocks/react-native-view-shot.js'),
  'react-native-share': path.resolve(__dirname, 'src/mocks/react-native-share.js'),
  'react-native-qrcode-svg': path.resolve(__dirname, 'src/mocks/react-native-qrcode-svg.js'),
  'react-native-turbo-image': path.resolve(__dirname, 'src/mocks/react-native-turbo-image.js'),
  'react-native-color-matrix-image-filters': path.resolve(__dirname, 'src/mocks/react-native-color-matrix-image-filters.js'),
};

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg', 'js', 'ts', 'jsx', 'tsx', 'json'],
    resolveRequest: (context, moduleName, platform) => {
      if (MOCKS[moduleName]) {
        return { filePath: MOCKS[moduleName], type: 'sourceFile' };
      }
      if (
        moduleName === 'react' ||
        moduleName === 'react/jsx-runtime' ||
        moduleName === 'react/jsx-dev-runtime' ||
        moduleName === 'react-native'
      ) {
        return {
          filePath: require.resolve(moduleName, { paths: [__dirname] }),
          type: 'sourceFile',
        };
      }
      return context.resolveRequest(context, moduleName, platform);
    },
  },
};

module.exports = mergeConfig(defaultConfig, config);
