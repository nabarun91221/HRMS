import createAppRouteFileContent from './app/create.mjs';
import editAppRouteFileContent from './app/edit.mjs';
import listAppRouteFileContent from './app/list.mjs';
import viewAppRouteFileContent from './app/view.mjs';

import moduleCreateFileContent from './modules/pages/createPage.mjs';
import moduleEditFileContent from './modules/pages/editPage.mjs';
import moduleListFileContent from './modules/pages/listPage.mjs';
import moduleViewFileContent from './modules/pages/viewPage.mjs';

import moduleAddEditFormComponentContent from './modules/components/CreateUpdateForm.mjs';

import moduleHooksFileContent from './modules/hooks.mjs';
import moduleKeysFileContent from './modules/keys.mjs';
import moduleSchemaFileContent from './modules/schema.mjs';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateCrudModule = ({
  camelCaseName,
  pascalCaseName,
  kebabCaseName,
  normalCaseName,
}) => {
  const appRouteModuleRootDir = path.join(
    __dirname,
    '../../../src',
    'app',
    'dashboard',
    kebabCaseName
  );

  const createAppRouteDir = path.join(appRouteModuleRootDir, 'create');
  const listAppRouteDir = path.join(appRouteModuleRootDir, 'list');
  const editAppRouteDir = path.join(appRouteModuleRootDir, 'edit', '[id]');
  const ViewAppRouteDir = path.join(appRouteModuleRootDir, 'view', '[id]');

  const moduleRootDir = path.join(__dirname, '../../../src', 'modules', camelCaseName);

  const modulePagesDir = path.join(moduleRootDir, 'pages');
  const moduleComponentDir = path.join(moduleRootDir, 'components');

  const allDirectories = [
    appRouteModuleRootDir,
    createAppRouteDir,
    listAppRouteDir,
    editAppRouteDir,
    ViewAppRouteDir,
    modulePagesDir,
    moduleComponentDir,
  ];

  allDirectories.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  const listAppRouteFile = path.join(listAppRouteDir, 'page.tsx');
  const createAppRouteFile = path.join(createAppRouteDir, 'page.tsx');
  const editAppRouteFile = path.join(editAppRouteDir, 'page.tsx');
  const ViewAppRouteFile = path.join(ViewAppRouteDir, 'page.tsx');

  const moduleListPageFile = path.join(modulePagesDir, `${pascalCaseName}ListPage.tsx`);

  const moduleCreatePageFile = path.join(modulePagesDir, `${pascalCaseName}CreatePage.tsx`);

  const moduleEditPageFile = path.join(modulePagesDir, `${pascalCaseName}EditPage.tsx`);

  const moduleViewPageFile = path.join(modulePagesDir, `${pascalCaseName}ViewPage.tsx`);

  const moduleAddEditFormComponentFile = path.join(
    moduleComponentDir,
    `${pascalCaseName}CreateUpdateForm.tsx`
  );

  const moduleHooksFile = path.join(moduleRootDir, 'hooks.ts');
  const moduleKeysFile = path.join(moduleRootDir, 'keys.ts');
  const moduleSchemaFile = path.join(moduleRootDir, 'schema.ts');

  const allFiles = [
    [listAppRouteFile, listAppRouteFileContent],
    [createAppRouteFile, createAppRouteFileContent],
    [editAppRouteFile, editAppRouteFileContent],
    [ViewAppRouteFile, viewAppRouteFileContent],
    [moduleListPageFile, moduleListFileContent],
    [moduleCreatePageFile, moduleCreateFileContent],
    [moduleEditPageFile, moduleEditFileContent],
    [moduleViewPageFile, moduleViewFileContent],
    [moduleAddEditFormComponentFile, moduleAddEditFormComponentContent],
    [moduleHooksFile, moduleHooksFileContent],
    [moduleKeysFile, moduleKeysFileContent],
    [moduleSchemaFile, moduleSchemaFileContent],
  ];

  allFiles.forEach(([file, content]) => {
    fs.writeFileSync(
      file,
      content({ camelCaseName, pascalCaseName, kebabCaseName, normalCaseName })
    );
  });
};
