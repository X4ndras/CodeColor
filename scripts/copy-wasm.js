import { copyFileSync, mkdirSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const languages = [
  "javascript",
  "python",
  "typescript",
  "rust",
  "go",
  "c",
  "css",
  //"lua",
];

// Ensure target directory exists
mkdirSync(join(__dirname, "../public/tree-sitter"), { recursive: true });

// Copy each WASM file
languages.forEach((lang) => {
  const sourcePath = join(
    __dirname,
    `../node_modules/tree-sitter-${lang}/tree-sitter-${lang}.wasm`,
  );
  const targetPath = join(
    __dirname,
    `../public/tree-sitter/tree-sitter-${lang}.wasm`,
  );

  try {
    copyFileSync(sourcePath, targetPath);
    console.log(`Copied ${lang} WASM file`);
  } catch (error) {
    console.error(`Failed to copy ${lang} WASM file:`, error);
  }
});
