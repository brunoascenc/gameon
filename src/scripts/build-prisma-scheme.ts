import fs from "fs";
import path from "path";

const base = fs.readFileSync("src/prisma/base.prisma", "utf8");
const modelsDir = "src/models";
const parts = fs
  .readdirSync(modelsDir)
  .filter((f) => f.endsWith(".prisma"))
  .map((f) => fs.readFileSync(path.join(modelsDir, f), "utf8"));

fs.writeFileSync("src/prisma/schema.prisma", [base, ...parts].join("\n\n"));
console.log("Built schema.prisma from", parts.length, "model files");
