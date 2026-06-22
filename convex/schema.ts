import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const statsValidator = v.object({
  count: v.number(),
  min: v.number(),
  max: v.number(),
  mean: v.number(),
});

const topItemValueValidator = v.union(
  v.string(),
  v.number(),
  v.boolean(),
  v.null(),
);

export default defineSchema({
  datasets: defineTable({
    slug: v.string(),
    title: v.string(),
    category: v.string(),
    measure: v.string(),
    unit: v.string(),
    sourceName: v.string(),
    sourceUrl: v.string(),
    retrievedAt: v.string(),
    notes: v.string(),
    stats: statsValidator,
    topItems: v.array(v.record(v.string(), topItemValueValidator)),
  }).index("by_slug", ["slug"]),

  dataPoints: defineTable({
    datasetSlug: v.string(),
    rank: v.number(),
    value: v.number(),
    ccdf: v.number(),
  }).index("by_dataset_slug_and_rank", ["datasetSlug", "rank"]),
});
