import { preloadQuery } from "convex/nextjs";

import { ScaleButtonApp } from "@/components/scale-button-app";
import { api } from "../../convex/_generated/api";

export default async function Home() {
  const preloadedScaleData = await preloadQuery(api.scaleData.list);

  return <ScaleButtonApp preloadedScaleData={preloadedScaleData} />;
}
