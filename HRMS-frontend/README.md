## How to use cli

First `cd` into `cli` folder and run `yarn` once then

**Form the root directory** run

```
yarn run cli gen -n <moduleName>

```

here `moduleName` should be a singular camel case word.

after running the above command we have two options to choose from `CRUD` and `CMS`

### The `CRUD` option will generate

- create, edit, list and view routes inside the app folder
- create, edit, list, view page components, a create-update form, hooks.ts, schema.ts and key.ts
  files for that module inside the `modules` folder

### The `CMS` option will generate

- a CMS update route inside the app folder
- a CMS page component, a update form, hooks.ts, schema.ts and key.ts files for that module inside
  the `modules` folder
