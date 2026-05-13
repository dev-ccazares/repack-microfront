import path from 'path';
import { fileURLToPath } from 'url';
import * as Repack from '@callstack/repack';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default (env) => {
  const {
    mode = 'development',
    platform = process.env.PLATFORM,
    devServer = undefined,
    bundleFilename = undefined,
    sourceMapFilename = undefined,
    assetsPath = undefined,
    reactNativePath = path.join(__dirname, 'node_modules/react-native'),
  } = env;

  if (!platform) {
    throw new Error('Missing platform — pass PLATFORM env var or use --platform flag');
  }

  const minimize = mode === 'production';

  return {
    mode,
    devtool: false,
    context: __dirname,
    entry: ['./index.js'],

    resolve: {
      /**
       * Spread Repack's resolve options (handles platform extensions like
       * .android.js, .native.js, etc.) then override aliases.
       *
       * Aliases force react / react-native to always resolve from root,
       * preventing duplicate instances caused by @deuna libs having their
       * own node_modules.
       */
      ...Repack.getResolveOptions(platform),
      alias: {
        'react-native': reactNativePath,
        react: path.join(__dirname, 'node_modules/react'),
        'react/jsx-runtime': path.join(
          __dirname,
          'node_modules/react/jsx-runtime',
        ),
        'react/jsx-dev-runtime': path.join(
          __dirname,
          'node_modules/react/jsx-dev-runtime',
        ),
      },
    },

    output: {
      clean: true,
      hashFunction: 'xxhash64',
      path: path.join(__dirname, 'build/generated', platform),
      filename: 'index.bundle',
      chunkFilename: '[name].chunk.bundle',
      publicPath: undefined,
    },

    optimization: {
      minimize,
    },

    module: {
      rules: [
        /**
         * Repack 5.x transform rules (SWC-based):
         * - JS/TS compilation via SWC
         * - Flow type stripping
         * - NativeComponent codegen files via babel-loader
         */
        ...Repack.getJsTransformRules(),

        /**
         * Asset rules: images, fonts, audio, etc.
         * SVG is included and handled as a binary asset (not as component).
         */
        ...Repack.getAssetTransformRules(),
      ],
    },

    plugins: [
      new Repack.RepackPlugin({
        context: __dirname,
        mode,
        platform,
        devServer,
        output: {
          bundleFilename,
          sourceMapFilename,
          assetsPath,
        },
      }),
    ],
  };
};
