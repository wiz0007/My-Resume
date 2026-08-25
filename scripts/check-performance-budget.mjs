import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const distAssets = join(process.cwd(), "dist", "assets");

const kb = (bytes) => Number((bytes / 1024).toFixed(2));

const budgets = {
  entryJsKb: 80,
  routeJsKb: 170,
  animationJsKb: 220,
  threeJsKb: 1150,
  cssKb: 70,
};

const files = readdirSync(distAssets).map((name) => {
  const sizeKb = kb(statSync(join(distAssets, name)).size);
  return { name, sizeKb };
});

const failures = [];
const assertBudget = (label, file, limit) => {
  if (!file) return;
  if (file.sizeKb > limit) {
    failures.push(`${label}: ${file.name} is ${file.sizeKb} KB, budget ${limit} KB`);
  }
};

const jsFiles = files.filter((file) => file.name.endsWith(".js"));
const cssFiles = files.filter((file) => file.name.endsWith(".css"));
const entry = jsFiles.find((file) => /^index-/.test(file.name));
const animation = jsFiles.find((file) => /^animation-/.test(file.name));
const three = jsFiles.find((file) => /^three-/.test(file.name));
const routeChunks = jsFiles.filter((file) => /Page-/.test(file.name));

assertBudget("entry JS", entry, budgets.entryJsKb);
assertBudget("animation JS", animation, budgets.animationJsKb);
assertBudget("three JS", three, budgets.threeJsKb);

for (const file of routeChunks) assertBudget("route JS", file, budgets.routeJsKb);
for (const file of cssFiles) assertBudget("CSS", file, budgets.cssKb);

if (failures.length) {
  console.error("Performance budget failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Performance budget passed.");
