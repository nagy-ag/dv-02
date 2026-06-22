import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const [, , sourceDirArg, outputDirArg] = process.argv;

if (!sourceDirArg || !outputDirArg) {
  console.error(
    "Usage: node scripts/prepare-convex-import.mjs <processed-data-dir> <output-dir>",
  );
  process.exit(1);
}

const sourceDir = resolve(sourceDirArg);
const outputDir = resolve(outputDirArg);

function readJson(filePath) {
  const text = readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  return JSON.parse(text);
}

function cleanTopItem(item) {
  return Object.fromEntries(
    Object.entries(item).map(([key, value]) => {
      if (
        value === null ||
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        return [key, value];
      }

      return [key, String(value)];
    }),
  );
}

const datasets = [];
const dataPoints = [];

for (const fileName of readdirSync(sourceDir)
  .filter((file) => file.endsWith(".json"))
  .sort()) {
  const dataset = readJson(join(sourceDir, fileName));

  datasets.push({
    slug: dataset.id,
    title: dataset.title,
    category: dataset.category,
    measure: dataset.measure,
    unit: dataset.unit,
    sourceName: dataset.sourceName,
    sourceUrl: dataset.sourceUrl,
    retrievedAt: dataset.retrievedAt,
    notes: dataset.notes,
    stats: dataset.stats,
    topItems: dataset.topItems.map(cleanTopItem),
  });

  for (const point of dataset.rankPoints) {
    dataPoints.push({
      datasetSlug: dataset.id,
      rank: point.rank,
      value: point.value,
      ccdf: point.ccdf,
    });
  }
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "datasets.json"), JSON.stringify(datasets));
writeFileSync(join(outputDir, "dataPoints.json"), JSON.stringify(dataPoints));

console.log(
  JSON.stringify(
    {
      outputDir,
      datasets: datasets.length,
      dataPoints: dataPoints.length,
    },
    null,
    2,
  ),
);
