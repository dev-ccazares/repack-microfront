# repack-microfront

Microfrontend React Native bundleado con **Repack** (rspack como bundler en vez de Metro). App standalone que demuestra que el design system de Deuna se puede compilar con Repack.

Forma parte del POC de microfrontends junto con:
- [`react-native-microfronts`](https://github.com/dev-ccazares/react-native-microfronts) — Host RN
- [`svelte-microfront`](https://github.com/dev-ccazares/svelte-microfront) — Microfront Svelte web

## Stack

- **React Native 0.80.3** + **React 19.1**
- **Repack 5.2.5** (rspack) — dev server y bundler en vez de Metro
- **Redux Toolkit** para estado global
- `@deuna/tl-core-components-rn` + `@deuna/tl-core-components-v2-rn`

## Cómo levantarlo

### Pre-requisitos

- Node 18+
- Android Studio + emulador (o device físico con USB debug)
- `adb` en PATH
- **Java 17**
- Acceso al registry privado de Deuna (necesitas crear tu `.npmrc` — no incluido por seguridad)

### Configurar `.npmrc` (una sola vez)

Las libs `@deuna/tl-core-components-*` viven en Azure DevOps de Deuna. Pegá tus credenciales personales en `.npmrc` en la raíz del proyecto (**no subirlo nunca**):

```
registry=https://pkgs.dev.azure.com/BancoPichinchaEC/_packaging/DeUna/npm/registry/
always-auth=true
//pkgs.dev.azure.com/BancoPichinchaEC/_packaging/DeUna/npm/registry/:username=...
//pkgs.dev.azure.com/BancoPichinchaEC/_packaging/DeUna/npm/registry/:_password=...
//pkgs.dev.azure.com/BancoPichinchaEC/_packaging/DeUna/npm/registry/:email=...
```

### Pasos

```bash
# 1. Clonar
git clone https://github.com/dev-ccazares/repack-microfront.git
cd repack-microfront

# 2. Instalar dependencias
npm install --legacy-peer-deps

# 3. Arrancar dev server de Repack (puerto 8081)
npm start

# 4. En OTRA terminal: build APK + instalar en device
npm run android
```

Cuando termina, el app se abre solo en el emulador. Para reabrirlo después:

```bash
adb shell am start -n com.repackmicrofront/.MainActivity
# o tap el ícono "Repack Microfront" en el cajón de apps
```

### ⚠️ Conflicto con el host RN

Este proyecto usa el puerto **8081** (default de RN). El host (`react-native-microfronts`) también lo usa. **No pueden correr ambos Metros al mismo tiempo**.

Flujo recomendado:
1. Para probar el host (con sus 2 botones) → arrancá el Metro del host
2. Cuando quieras abrir el repack-microfront → matá el Metro del host (`Ctrl+C`) y arrancá el de este repo
3. Cuando termines, volvé al Metro del host si necesitas el botón Svelte

## ¿Por qué Repack en vez de Metro?

| Aspecto | Metro | Repack (rspack) |
|---|---|---|
| Bundler | propio (Babel) | rspack (Rust) |
| Module Federation 2 | ❌ | ✅ |
| Tree-shaking | parcial | agresivo |
| Velocidad cold build | base | comparable o más rápida |
| Compat ecosistema RN | nativa | 99% via aliases/loaders |

Repack abre la puerta a microfrontends "reales" (Module Federation 2) en mobile — algo que Metro no soporta nativamente.

## Workarounds aplicados en `index.js`

Para que las libs Deuna corran en Hermes (release y dev) hay 2 polyfills:

1. **Shim de `document`** — `styled-components/native@5.3.x` llama `document.querySelectorAll()` al cargar sin guard.
2. **Global `neutral700`** — varios archivos del lib v1 usan `neutral700` como identificador libre en template strings.

Ambos se aplican antes que cualquier `require()` para que estén disponibles cuando las libs Deuna se evalúan.

## Estructura

```
src/
├── App.tsx                Root con NavigationContainer + Stack
├── screens/               4 pantallas del flujo de pago
├── components/            Componentes propios
├── store/                 Redux store + slices
├── mocks/                 Mocks de libs nativas no instaladas
└── theme/                 Tema Deuna

rspack.config.mjs          Config de Repack (aliases + mocks)
react-native.config.js     Registra commands de Repack
index.js                   Entry point: polyfills + AppRegistry
```

## Troubleshooting

| Error | Causa | Fix |
|---|---|---|
| `Unable to load script` (pantalla roja) | Metro no corriendo o puerto incorrecto | `adb reverse tcp:8081 tcp:8081` y reload |
| `RepackMicrofront has not been registered` | Conectado al Metro del host por error | Mata el Metro del host y arranca este |
| `CLEARTEXT communication not permitted` | Falta debug manifest | Verifica `android/app/src/debug/AndroidManifest.xml` |
| `document.X is not a function` | Faltó polyfill en index.js | Confirma que el shim de `document` está activo |
