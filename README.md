# SURAPP (frontend)

Built with [Nuxt.js](https://nuxtjs.org)

- **Programming language**: [TypeScript](https://typescript.nuxtjs.org)
- **Package manager**: Npm
- **UI framework**: [Tailwind CSS](https://tailwindcss.com)
- **Nuxt.js modules**: [Axios](https://axios.nuxtjs.org), [i18n](https://i18n.nuxtjs.org)
- **Linting tools**: ESLint, Prettier, StyleLint
- **Testing framework**: [Jest](https://jestjs.io)
- **Rendering mode**: Single Page App
- **Deployment target**: Static (Static/JAMStack hosting)
- **Development tools**: jsconfig.json (Recommended for VS Code)

We use the Class API of
https://typescript.nuxtjs.org/cookbook/components/#script for most of our components and the Composition API should be considered for more complex components like overviews (with search, filers, sorting, pagination etc.).

## Build Setup

### Install dependencies

```shell
npm install
```

### Serve with hot reload at localhost:3000

```shell
npm run dev
```

### Run tests

```shell
npm run test
```

### Run linter

```shell
npm run lint
```

### Build for production

```
npm run build
```

Deploy the created dist/ folder to your static hosting like Surge, GitHub Pages or nginx.
