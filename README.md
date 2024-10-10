# vue-dataguard

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Project structure

src/
├── assets/
├── components/
│ ├── FilterSection.vue
│ ├── LabelChip.vue
│ ├── RepositoryCard.vue
│ └── RepositoryList.vue
├── composables/
│ ├── useDropdownFilter.ts
├── useGroupedRepos.ts
├── services/
│ └── githubApi.ts
├── stores/
│ └── github/
│ ├── index.ts
│ ├── state.ts
│ ├── getters.ts
│ ├── actions.ts
│ └── constants.ts
├── types/
│ └── index.ts
├── views/
│ ├── HomePage.vue
│ └── GithubRepositories.vue
├── App.vue
└── main.ts

### Technology Stack

- Vue 3: Frontend framework
- TypeScript: For type-safe code
- Pinia: State management
- Tailwind CSS: Utility-first CSS framework for styling
- Vite: Build tool and development server
