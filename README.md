# vue-dataguard Technical documentation

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

This runs the end-to-end tests against the Vite development server but I'm not using them at the moment.

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

### Technology Stack I used

- Vue 3: Frontend framework
- TypeScript: For type-safe code
- Pinia: State management
- Tailwind CSS: Utility-first CSS framework for styling
- Vite: Build tool and development server

## Composables?

### useDropdownFilters

- File: useDropdownFilter.ts
- This composable manages the state for the dropdown filter in the Filter component.
  Why is it composable? Because it:
- Manages the visibility state of the dropdown
- Provides a method to close the dropdown
- Can be reused in other components

### useGroupedRepos

- File: useGroupedRepos.ts
- This composable fetches the repositories from the GitHub API and groups them by the language.
  Why is it composable? Because it:
- Groups the fetched repositories by language
- Can be reused in other components

## IMPORTANT!! Potential changes in future

1. I would consider moving the components to a separate folder and grouping them by feature e.g UI components (shared) like buttons, inputs etc
2. I would also consider adding more tests to the project
3. The folder structure is small enough to be handled by just prop drilling but I decided to go with `pinia` for state management because I wanted to try it. I used vuex before but
   I wanted to try something new. It much easier to use peronsally.
4. I used `view` mainly to just display the data and not much logic in the views. I would consider adding more logic to the views in the future.

### Containers?

- I didn't use containers in the project and it's not a big project but I would generally

### Tailwind

- Tailwind is easy to setup. I didn't have to do much configuration.
- Its relatively easy to use and I like the utility-first approach.
