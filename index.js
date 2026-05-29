/**
 * Polyfill mínimo de `document` para que styled-components/native@5.3.x no crashee.
 * Esta versión llama document.querySelectorAll() al cargar el módulo sin
 * validar si existe. En bundles de producción (Hermes sin Metro), explota.
 *
 * Uso `require` en vez de `import` para garantizar que el polyfill se ejecute
 * ANTES de cargar nada que dependa de styled-components (ESM hoistea imports
 * al top, lo que hacía que styled-components corriera antes que el shim).
 */
if (typeof globalThis.document === 'undefined') {
  // Stub element con todos los métodos como no-ops
  const stubElement = {
    style: {},
    children: [],
    childNodes: [],
    appendChild: () => stubElement,
    removeChild: () => stubElement,
    insertBefore: () => stubElement,
    setAttribute: () => {},
    getAttribute: () => null,
    removeAttribute: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    cloneNode: () => stubElement,
  };
  globalThis.document = new Proxy(
    {
      head: stubElement,
      body: stubElement,
      documentElement: stubElement,
      readyState: 'complete',
    },
    {
      get(target, prop) {
        if (prop in target) return target[prop];
        // Métodos query → array vacío
        if (typeof prop === 'string' && prop.startsWith('querySelector')) {
          return prop === 'querySelectorAll' ? () => [] : () => null;
        }
        // Métodos getX → null o array vacío
        if (typeof prop === 'string' && prop.startsWith('getElement')) {
          return prop.endsWith('ById') ? () => null : () => [];
        }
        // createElement / createTextNode → stub element
        if (typeof prop === 'string' && prop.startsWith('create')) {
          return () => stubElement;
        }
        // Cualquier otro método → no-op
        return () => {};
      },
    },
  );
}

globalThis.neutral700 = '#202020';


const { ScriptManager, Script } = require('@callstack/repack/client');

ScriptManager.shared.addResolver(async (scriptId) => ({
  url: Script.getDevServerURL(scriptId),
  cache: false,
}));

const React = require('react');
const { AppRegistry, View, Text, ActivityIndicator } = require('react-native');
const { enableScreens } = require('react-native-screens');
const { name: appName } = require('./app.json');

enableScreens(false);

const LazyApp = React.lazy(() => import('./src/App'));

const LoadingFallback = () =>
  React.createElement(
    View,
    {
      style: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      },
    },
    React.createElement(ActivityIndicator, { size: 'large', color: '#662D91' }),
    React.createElement(
      Text,
      { style: { marginTop: 12, color: '#662D91' } },
      'Cargando microfront...',
    ),
  );

const Root = () =>
  React.createElement(
    React.Suspense,
    { fallback: React.createElement(LoadingFallback) },
    React.createElement(LazyApp),
  );

AppRegistry.registerComponent(appName, () => Root);
