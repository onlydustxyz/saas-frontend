/* eslint-disable @typescript-eslint/no-var-requires */

const i = require("@inquirer/prompts");
const fs = require("fs/promises");
const prettier = require("prettier");
const { COLORS, kebabToPascal, kebabToCamel, defaultPromptName } = require("./global");
const { exec } = require("node:child_process");

async function createComponent({ name, path, PascalName }) {
  await fs.appendFile(
    `${path}/${name}.tsx`,
    await prettier.format(
      `
        import { ${PascalName}Props  } from "./${name}.types";

        export function ${PascalName}({ children }: ${PascalName}Props ) {
          return <div>{children}</div>;
        }
  `,
      { parser: "typescript" }
    )
  );
}

async function createTypes({ name, path, PascalName, camelName, options: { variants } }) {
  await fs.appendFile(
    `${path}/${name}.types.ts`,
    await prettier.format(
      `
        import { PropsWithChildren } from "react";
        
        export interface ${PascalName}Props extends PropsWithChildren {}
  `,
      { parser: "typescript" }
    )
  );
}

async function createFiles(informations) {
  await createComponent(informations);
  await createTypes(informations);

  exec(`eslint '${informations.path}/*.{js,jsx,json,ts,tsx}' --max-warnings=0 --fix`);
}

async function promptName() {
  const { name, folder, path } = await defaultPromptName();

  return { folder, name, path };
}

async function createMainComponent() {
  const { folder, name, path } = await promptName();

  await fs.mkdir(path);

  await createFiles({
    folder,
    name,
    path,
    PascalName: kebabToPascal(name),
    camelName: kebabToCamel(name),
    options: {},
  });

  console.log(`\n${COLORS.GREEN}✅ Component created${COLORS.NC}`);
  console.log(`Component path: ${COLORS.BLUE}${path}${COLORS.NC}\n`);
}

module.exports = { createMainComponent };
