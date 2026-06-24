import { v } from "convex/values";
import { query } from "./_generated/server";
import type { Doc } from "./_generated/dataModel";
import type { QueryCtx } from "./_generated/server";

const MAX_DATASETS = 100;
const HEAD_POINTS_PER_DATASET = 220;
const TAIL_POINTS_PER_DATASET = 140;
const MIDPOINT_TARGETS_PER_DATASET = 36;
const MAX_POINTS_PER_DATASET = 520;

function publicDataset(dataset: Doc<"datasets">) {
  return {
    slug: dataset.slug,
    title: dataset.title,
    category: dataset.category,
    measure: dataset.measure,
    unit: dataset.unit,
    sourceName: dataset.sourceName,
    sourceUrl: dataset.sourceUrl,
    retrievedAt: dataset.retrievedAt,
    notes: dataset.notes,
    stats: dataset.stats,
    topItems: dataset.topItems.slice(0, 5),
  };
}

function publicPoint(point: Doc<"dataPoints">) {
  return {
    rank: point.rank,
    value: point.value,
    ccdf: point.ccdf,
  };
}

function sampleRankTargets(maxRank: number) {
  const boundedMaxRank = Math.max(1, Math.floor(maxRank));
  const targets = new Set<number>();

  for (let index = 1; index <= MIDPOINT_TARGETS_PER_DATASET; index += 1) {
    const progress = index / (MIDPOINT_TARGETS_PER_DATASET + 1);
    const logRank = Math.round(Math.exp(Math.log(boundedMaxRank) * progress));
    const linearRank = Math.round(1 + (boundedMaxRank - 1) * progress);
    const blendedRank = Math.round(logRank * 0.7 + linearRank * 0.3);
    targets.add(Math.min(Math.max(1, blendedRank), boundedMaxRank));
  }

  return [...targets].sort((a, b) => a - b);
}

async function sampledPointsForDataset(
  ctx: QueryCtx,
  dataset: Doc<"datasets">,
) {
  const pointsByRank = new Map<number, Doc<"dataPoints">>();
  const addPoint = (point: Doc<"dataPoints"> | null) => {
    if (point !== null) {
      pointsByRank.set(point.rank, point);
    }
  };

  const head = await ctx.db
    .query("dataPoints")
    .withIndex("by_dataset_slug_and_rank", (q) =>
      q.eq("datasetSlug", dataset.slug),
    )
    .take(HEAD_POINTS_PER_DATASET);

  for (const point of head) {
    addPoint(point);
  }

  const tail = await ctx.db
    .query("dataPoints")
    .withIndex("by_dataset_slug_and_rank", (q) =>
      q.eq("datasetSlug", dataset.slug),
    )
    .order("desc")
    .take(TAIL_POINTS_PER_DATASET);

  for (const point of tail) {
    addPoint(point);
  }

  for (const targetRank of sampleRankTargets(dataset.stats.count)) {
    const point = await ctx.db
      .query("dataPoints")
      .withIndex("by_dataset_slug_and_rank", (q) =>
        q.eq("datasetSlug", dataset.slug).gte("rank", targetRank),
      )
      .first();
    addPoint(point);
  }

  return [...pointsByRank.values()]
    .sort((a, b) => a.rank - b.rank)
    .slice(0, MAX_POINTS_PER_DATASET)
    .map(publicPoint);
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    const datasets = await ctx.db.query("datasets").take(MAX_DATASETS);

    return {
      groups: await Promise.all(
        datasets.map(async (dataset) => ({
          dataset: publicDataset(dataset),
          points: await sampledPointsForDataset(ctx, dataset),
        })),
      ),
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
      dataset: publicDataset(dataset),
      points: points.map(publicPoint),
    };
  },
});
