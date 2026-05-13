import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as Repack from '@callstack/repack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Configuración Repack para `repack-microfront`:
 *
 * App RN standalone bundleada con Repack (rspack como bundler en vez de Metro).
 * Demuestra el patrón "microfrontend = APK independiente" del lado React Native.
 * Se abre desde el host (`com.microfronts`) por deep link o ícono propio.
 *
 * Module Federation 2 NO está activo en este config — tenía issues de
 * compatibilidad con Hermes + libs Deuna en builds release. Si se quiere
 * activar luego como remote, agregar `new Repack.plugins.ModuleFederationPluginV2`
 * y `@module-federation/enhanced` como dep.
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
  ],
});
