/* eslint-disable @typescript-eslint/no-var-requires */

const i = require("@inquirer/prompts");
const fs = require("fs/promises");
const prettier = require("prettier");
const { COLORS, kebabToPascal, kebabToCamel, defaultPromptName } = require("./global");
const { exec } = require("node:child_process");

async function createCoreComponent({ name, path, PascalName }) {
  await fs.appendFile(
    `${path}/${name}.core.tsx`,
    await prettier.format(
      `
        import { ElementType } from "react";
        import { PropsWithAdapter } from "components/types/props-with-adapter";

        import { cn } from "@/shared/helpers/cn";

        import { ${PascalName}Port } from "./${name}.types";

        export function ${PascalName}Core<C extends ElementType = "div">({Adapter, ...props}: PropsWithAdapter<${PascalName}Port<C>>) {

          return (
            <Adapter {...props} />
          );
        };
  `,
      { parser: "typescript" }
    )
  );
}

async function createVariants({ name, path, PascalName }) {
  await fs.mkdir(`${path}/variants`);
  await fs.appendFile(
    `${path}/variants/${name}-default.tsx`,
    await prettier.format(
      `
        import { ElementType } from "react";

        import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";
        
        import { ${PascalName}DefaultAdapter} from "../adapters/default/default.adapter";

        import { ${PascalName}Port } from "../${name}.types";

        export function ${PascalName}<C extends ElementType = "div">(props: ${PascalName}Port<C>) {
          return withComponentAdapter<${PascalName}Port<C>>(${PascalName}DefaultAdapter)(props);
        };
  `,
      { parser: "typescript" }
    )
  );
}

async function createAdapter({ name, path, PascalName }) {
  await fs.mkdir(`${path}/adapters`);
  await fs.mkdir(`${path}/adapters/default`);
  await fs.appendFile(
    `${path}/adapters/default/default.adapter.tsx`,
    await prettier.format(
      `
        import { ElementType } from "react";

        import { cn } from "@/shared/helpers/cn";

        import { ${PascalName}Port } from "../../${name}.types";
        import { ${PascalName}DefaultVariants } from "./default.variants";

        export function ${PascalName}DefaultAdapter<C extends ElementType = "div">({as, classNames, htmlProps}: ${PascalName}Port<C>) {
          const Component = as || "div";
          const slots = ${PascalName}DefaultVariants();

          return (
            <Component {...htmlProps} className={cn(slots.base(), classNames?.base)} />
          );
        };
  `,
      { parser: "typescript" }
    )
  );
  await fs.appendFile(
    `${path}/adapters/default/default.variants.ts`,
    await prettier.format(
      `
        import { tv } from "tailwind-variants";

        export const ${PascalName}DefaultVariants = tv({
          slots: {
            base: "",
          },
          variants: {},
          defaultVariants: {},
        });
  `,
      { parser: "typescript" }
    )
  );
}

async function createTypes({ name, path, PascalName }) {
  await fs.appendFile(
    `${path}/${name}.types.ts`,
    await prettier.format(
      `
        import { ComponentPropsWithoutRef, ElementType } from "react";

        interface Variants {}

        interface ClassNames {
          base: string;
        }

        export interface ${PascalName}Port<C extends ElementType> extends Partial<Variants> {
          as?: C;
          htmlProps?: ComponentPropsWithoutRef<C>;
          classNames?: Partial<ClassNames>;
        }
  `,
      { parser: "typescript" }
    )
  );
}

async function createLoading({ name, path, PascalName }) {
  await fs.appendFile(
    `${path}/${name}.loading.tsx`,
    await prettier.format(
      `
        export function ${PascalName}Loading() {
          return <div />;
        };
  `,
      { parser: "typescript" }
    )
  );
}

async function createIndex({ name, path }) {
  await fs.appendFile(
    `${path}/index.ts`,
    await prettier.format(
      `
        export * from "./variants/${name}-default";
        export * from "./${name}.types";
        export * from "./${name}.loading";
  `,
      { parser: "typescript" }
    )
  );
}

async function createFiles(informations) {
  await createVariants(informations);
  await createTypes(informations);
  await createLoading(informations);
  await createIndex(informations);
  await createAdapter(informations);
  await exec(`eslint '${informations.path}/*.{js,jsx,json,ts,tsx}' --max-warnings=0 --fix`);

  if (informations.withCore) {
    await createCoreComponent(informations);
  }
}

async function promptName() {
  const { name, folder, path } = await defaultPromptName();

  /** variant default **/

  return { folder, name, path };
}

async function createDS() {
  const { folder, name, path } = await promptName();

  const withCore = await i.confirm({ message: "Do you want core?" });

  await fs.mkdir(path);

  await createFiles({
    folder,
    name,
    path,
    PascalName: kebabToPascal(name),
    camelName: kebabToCamel(name),
    withCore,
  });

  console.log(`\n${COLORS.GREEN}✅ Component created${COLORS.NC}`);
  console.log(`Component path: ${COLORS.BLUE}${path}${COLORS.NC}\n`);
}

module.exports = { createDS };
