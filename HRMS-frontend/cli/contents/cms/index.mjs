import cmsAppRouteFileContent from './app/cms.mjs';

import moduleCmsPageFileContent from './modules/pages/cmsPage.mjs';

import moduleCmsFormComponentContent from './modules/components/CmsUpdateForm.mjs';

import moduleHooksFileContent from './modules/hooks.mjs';
import moduleKeysFileContent from './modules/keys.mjs';
import moduleSchemaFileContent from './modules/schema.mjs';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateCmsModule = ({
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

  const moduleRootDir = path.join(__dirname, '../../../src', 'modules', camelCaseName);

  const modulePagesDir = path.join(moduleRootDir, 'pages');
  const moduleComponentDir = path.join(moduleRootDir, 'components');

  const allDirectories = [appRouteModuleRootDir, modulePagesDir, moduleComponentDir];

  allDirectories.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  const cmsAppRouteFile = path.join(appRouteModuleRootDir, 'page.tsx');

  const moduleCmsPageFile = path.join(modulePagesDir, `${pascalCaseName}CmsPage.tsx`);

  const moduleCmsFormComponentFile = path.join(
    moduleComponentDir,
    `${pascalCaseName}CmsUpdateForm.tsx`
  );

  const moduleHooksFile = path.join(moduleRootDir, 'hooks.ts');
  const moduleKeysFile = path.join(moduleRootDir, 'keys.ts');
  const moduleSchemaFile = path.join(moduleRootDir, 'schema.ts');

  const allFiles = [
    [cmsAppRouteFile, cmsAppRouteFileContent],
    [moduleCmsPageFile, moduleCmsPageFileContent],
    [moduleCmsFormComponentFile, moduleCmsFormComponentContent],

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
