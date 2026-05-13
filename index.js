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
  // Proxy: cualquier propiedad/método no definido devuelve un no-op o null
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

/**
 * Bug en @deuna/tl-core-components-rn: varios styled-components usan
 * `neutral700` como identificador libre (no como `colors.neutral700` ni
 * destructurando del theme). En dev a veces se traga, pero en bundle de
 * producción crashea con ReferenceError. Lo definimos como global para
 * que el lookup encuentre el valor.
 *
 * Archivos afectados (auditados en node_modules):
 *   - tl-core-components-rn/src/atoms/icons/index.styles.js
 *   - tl-core-components-rn/src/atoms/typography/body/index.styles.js
 *   - tl-core-components-rn/src/atoms/typography/headline/index.styles.js
 *   - tl-core-components-rn/src/atoms/typography/number/index.styles.js
 */
globalThis.neutral700 = '#202020';

const { AppRegistry } = require('react-native');
const { enableScreens } = require('react-native-screens');
const App = require('./src/App').default;
const { name: appName } = require('./app.json');

enableScreens(false);

AppRegistry.registerComponent(appName, () => App);
