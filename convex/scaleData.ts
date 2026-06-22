import { v } from "convex/values";
import { query } from "./_generated/server";

const MAX_DATASETS = 100;
const MAX_POINTS = 20000;
const MAX_POINTS_PER_DATASET = 1200;

export const list = query({
  args: {},
  handler: async (ctx) => {
    const datasets = await ctx.db.query("datasets").take(MAX_DATASETS);
    const points = await ctx.db.query("dataPoints").take(MAX_POINTS);
    const pointsByDataset = new Map<string, typeof points>();

    for (const point of points) {
      const list = pointsByDataset.get(point.datasetSlug) ?? [];
      list.push(point);
      pointsByDataset.set(point.datasetSlug, list);
    }

    return {
      groups: datasets.map((dataset) => ({
        dataset,
        points: pointsByDataset
          .get(dataset.slug)
          ?.sort((a, b) => a.rank - b.rank)
          .slice(0, MAX_POINTS_PER_DATASET) ?? [],
      })),
    };
  },
});

export const bySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const dataset = await ctx.db
      .query("datasets")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();

    if (dataset === null) {
      return null;
    }

    const points = await ctx.db
      .query("dataPoints")
      .withIndex("by_dataset_slug_and_rank", (q) =>
        q.eq("datasetSlug", args.slug),
      )
      .take(MAX_POINTS_PER_DATASET);

    return {
      dataset,
      points,
    };
  },
});
