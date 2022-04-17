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
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'class',
}
```

### Create a basic folder structure for your project

```sh
mkdir -p src/{assets,components,configs,contexts,hooks,types,utils}
cd src
touch assets/index.ts components/index.ts configs/index.ts contexts/index.ts hooks/index.ts types/index.ts utils/index.ts
```

```

```
