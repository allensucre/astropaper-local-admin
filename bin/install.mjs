#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "..");
const templateRoot = path.join(packageRoot, "templates");

const targetArg = process.argv[2] === "install" ? process.argv[3] : process.argv[2];
const targetRoot = path.resolve(process.cwd(), targetArg || ".");

const fileExists = async filePath => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

const copyTemplate = async relativePath => {
  const source = path.join(templateRoot, relativePath);
  const destination = path.join(targetRoot, relativePath);

  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.copyFile(source, destination);
  console.log(`copied ${relativePath}`);
};

const patchAstroConfig = async () => {
  const configPath = path.join(targetRoot, "astro.config.ts");

  if (!(await fileExists(configPath))) {
    throw new Error("astro.config.ts was not found. Run this from an AstroPaper project root.");
  }

  let source = await fs.readFile(configPath, "utf8");

  if (!source.includes('from "./src/utils/adminDevServer"')) {
    source = `import { adminDevServer } from "./src/utils/adminDevServer";\n${source}`;
  }

  if (source.includes("adminDevServer()")) {
    await fs.writeFile(configPath, source, "utf8");
    console.log("astro.config.ts already includes adminDevServer()");
    return;
  }

  if (/plugins:\s*\[/.test(source)) {
    source = source.replace(/plugins:\s*\[/, match => `${match}adminDevServer(), `);
  } else if (/export default defineConfig\(\{/.test(source)) {
    source = source.replace(
      /export default defineConfig\(\{/,
      "export default defineConfig({\n  vite: { plugins: [adminDevServer()] },"
    );
  } else {
    throw new Error("Could not patch astro.config.ts automatically.");
  }

  await fs.writeFile(configPath, source, "utf8");
  console.log("patched astro.config.ts");
};

const main = async () => {
  const packageJsonPath = path.join(targetRoot, "package.json");

  if (!(await fileExists(packageJsonPath))) {
    throw new Error("package.json was not found. Run this from an AstroPaper project root.");
  }

  await copyTemplate("src/pages/admin.astro");
  await copyTemplate("src/utils/adminDevServer.ts");
  await patchAstroConfig();

  console.log("");
  console.log("AstroPaper Local Admin installed.");
  console.log("Start your site with:");
  console.log("  corepack pnpm run dev --host 127.0.0.1");
  console.log("Then open:");
  console.log("  http://127.0.0.1:4321/admin");
};

main().catch(error => {
  console.error(error.message);
  process.exit(1);
});
