# Set Up Tailwind Css With NextJS and TypeScript

## Steps for creating `nextjs-typescript-tailwind-css-stater`

### Create a new nextjs project with stater template

```sh
npx create-next-app -e with-tailwindcss [your-project-name]
```

### Move all the code into src folder

```sh
mkdir src
mv pages src
mv styles src
```

### Add absolute import by adding following line into `tsconfig.json` file

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### Change `tailwind.config.js` file for new project structure

```js
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}', // change this
    './src/components/**/*.{js,ts,jsx,tsx}', // change this
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'class', // change this
}
```

### Create a basic folder structure for your project

```sh
mkdir -p src/{assets,components,configs,contexts,hooks,types,utils}
cd src
touch assets/index.ts components/index.ts configs/index.ts contexts/index.ts hooks/index.ts types/index.ts utils/index.ts
```

### Change the default port for nextjs by changing the dev script in `package.json` file

```json
{
  "dev": "next dev -p 3022"
}
```

### Extend more colors by adding following into `tailwind.config.js` file

```js
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        facebook: '#3b5999',
        twitter: '#55acee',
        linkedin: '#0077b5',
        instagram: '#e4405f',
        whatsapp: '#25d366',
        youtube: '#cd201f',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
```

### Install MUI related dependencies

```sh
yarn add @mui/material @emotion/react @emotion/styled @mui/lab @mui/icons-material @mui/x-date-pickers @date-io/moment moment
```

### Install @material-table/core and exporter package

```sh
yarn add @material-table/core@next @material-table/exporters
```

### Install formik and yup for form validation

```sh
yarn add formik yup
```
