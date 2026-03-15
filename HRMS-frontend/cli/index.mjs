#!/usr/bin/env node
import { select } from '@inquirer/prompts';
import { Command } from 'commander';

const program = new Command();

import { generateCmsModule } from './contents/cms/index.mjs';
import { generateCrudModule } from './contents/crud/index.mjs';

program.name('myCliTool').description('A simple CLI to generate files').version('1.0.0');

program
  .command('gen')
  .description('Generate module files')
  .option('-n, --name <module name>', 'Name of the module')
  .action(async options => {
    const camelCaseName = options.name.trim();

    const pascalCaseName = camelCaseName.charAt(0).toUpperCase() + camelCaseName.slice(1);

    const kebabCaseName = camelCaseName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

    const normalCaseName = camelCaseName
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, s => s.toUpperCase());

    if (!camelCaseName) {
      console.error('❌ Please provide a module name using -n or --name');
      process.exit(1);
    }

    const moduleType = await select({
      message: 'Choose the module type:',
      choices: [
        { name: 'CRUD', value: 'crud' },
        { name: 'CMS', value: 'cms' },
      ],
    });

    if (moduleType === 'crud') {
      generateCrudModule({ camelCaseName, pascalCaseName, kebabCaseName, normalCaseName });
    } else {
      generateCmsModule({ camelCaseName, pascalCaseName, kebabCaseName, normalCaseName });
    }
  });

await program.parseAsync(process.argv);
