import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as Repack from '@callstack/repack';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pkg = require('./package.json');

/**
 * Configuración Repack para `repack-microfront` con **Module Federation 2**.
 *
 * Esta app se expone como REMOTE: cualquier host con MF2 puede importar
 * `RepackMicrofront/App` por URL en runtime.
 *
 * `shared` declara las deps pesadas como singletons → el host las provee
 * y el bundle del microfront NO las incluye. Esto baja el tamaño del bundle
 * principal de ~7.6 MB a ~1-2 MB (solo lógica + chunks shared se cargan aparte).
 */
export default Repack.defineRspackConfig({
  context: __dirname,
  entry: './index.js',
  resolve: {
    ...Repack.getResolveOptions(),
    alias: {
      react: path.join(__dirname, 'node_modules/react'),
      'react/jsx-runtime': path.join(__dirname, 'node_modules/react/jsx-runtime'),
      'react/jsx-dev-runtime': path.join(__dirname, 'node_modules/react/jsx-dev-runtime'),
      'react-native': path.join(__dirname, 'node_modules/react-native'),
      // MF2 subpaths que rspack no resuelve por el field `exports`
      '@module-federation/runtime/helpers': path.join(__dirname, 'node_modules/@module-federation/runtime/dist/helpers.cjs'),
      '@module-federation/error-codes/browser': path.join(__dirname, 'node_modules/@module-federation/error-codes/dist/browser.cjs'),
      // Mocks para evitar crashes nativos / deps no instaladas que las libs
      // Deuna importan internamente pero no usamos en este proyecto.
      'react-native-screens': path.join(__dirname, 'src/mocks/react-native-screens.js'),
      'react-native-reanimated': path.join(__dirname, 'src/mocks/react-native-reanimated.js'),
      'react-native-reanimated-skeleton': path.join(__dirname, 'src/mocks/react-native-reanimated-skeleton.js'),
      'react-native-view-shot': path.join(__dirname, 'src/mocks/react-native-view-shot.js'),
      'react-native-share': path.join(__dirname, 'src/mocks/react-native-share.js'),
      'react-native-qrcode-svg': path.join(__dirname, 'src/mocks/react-native-qrcode-svg.js'),
      'react-native-turbo-image': path.join(__dirname, 'src/mocks/react-native-turbo-image.js'),
      'react-native-color-matrix-image-filters': path.join(__dirname, 'src/mocks/react-native-color-matrix-image-filters.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.[cm]?[jt]sx?$/,
        type: 'javascript/auto',
        use: {
          loader: '@callstack/repack/babel-swc-loader',
          parallel: true,
          options: {},
        },
      },
      ...Repack.getAssetTransformRules(),
    ],
  },
  plugins: [
    new Repack.RepackPlugin(),
    new Repack.plugins.ModuleFederationPluginV2({
      name: 'RepackMicrofront',
      filename: 'RepackMicrofront.container.js.bundle',
      dts: false,
      exposes: {
        './App': './src/App.tsx',
      },
      shared: {
        react: {
          singleton: true,
          eager: true,
          requiredVersion: pkg.dependencies.react,
        },
        'react-native': {
          singleton: true,
          eager: true,
          requiredVersion: pkg.dependencies['react-native'],
        },
        'react/jsx-runtime': {
          singleton: true,
          eager: true,
        },
        '@react-navigation/native': {
          singleton: true,
          eager: true,
          requiredVersion: pkg.dependencies['@react-navigation/native'],
        },
        '@react-navigation/stack': {
          singleton: true,
          eager: true,
          requiredVersion: pkg.dependencies['@react-navigation/stack'],
        },
        '@reduxjs/toolkit': {
          singleton: true,
          eager: true,
          requiredVersion: pkg.dependencies['@reduxjs/toolkit'],
        },
        'react-redux': {
          singleton: true,
          eager: true,
          requiredVersion: pkg.dependencies['react-redux'],
        },
        '@deuna/tl-core-components-rn': {
          singleton: true,
          eager: true,
          requiredVersion: pkg.dependencies['@deuna/tl-core-components-rn'],
        },
        '@deuna/tl-core-components-v2-rn': {
          singleton: true,
          eager: true,
          requiredVersion: pkg.dependencies['@deuna/tl-core-components-v2-rn'],
        },
        'react-native-gesture-handler': {
          singleton: true,
          eager: true,
        },
        'react-native-safe-area-context': {
          singleton: true,
          eager: true,
        },
        'react-native-svg': {
          singleton: true,
          eager: true,
        },
      },
    }),
  ],
});
