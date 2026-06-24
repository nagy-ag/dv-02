export type ScaleMode = "linear" | "log" | "loglog" | "tail";

export type ChapterId =
  | "everyday"
  | "risk"
  | "inequality"
  | "attention"
  | "life"
  | "time";

export type Chapter = {
  id: ChapterId;
  index: string;
  title: string;
  intro: string;
  feature: string;
  accent: string;
};

export type EvidenceGroupId =
  | "movement"
  | "physicalRisk"
  | "marketRisk"
  | "householdEconomy"
  | "institutionScale"
  | "urbanNetworks"
  | "attentionKnowledge"
  | "lifeScale";

export type EvidenceGroup = {
  id: EvidenceGroupId;
  index: string;
  chapter: ChapterId;
  datasetIds: string[];
  defaultDatasetId: string;
};

export type DatasetStory = {
  id: string;
  chapter: ChapterId;
  citation: string;
  defaultMode: ScaleMode;
  hook: string;
  detail: string;
};

export const scaleModes: Record<
  ScaleMode,
  { label: string; shortLabel: string; question: string; summary: string }
> = {
  linear: {
    label: "Linear",
    shortLabel: "Linear",
    question: "What dominates?",
    summary: "Raw rank and raw value",
  },
  log: {
    label: "Log Y",
    shortLabel: "Log",
    question: "What was hidden?",
    summary: "Raw rank and logarithmic value",
  },
  loglog: {
    label: "Log-log",
    shortLabel: "Log-log",
    question: "Is there scale structure?",
    summary: "Logarithmic rank and value",
  },
  tail: {
    label: "Tail",
    shortLabel: "Tail",
    question: "How often do extremes happen?",
    summary: "Logarithmic value and tail probability",
  },
};

export const chapters: Chapter[] = [
  {
    id: "everyday",
    index: "02",
    title: "Everyday extremes",
    intro:
      "Schedules and averages describe a system. Delays, gaps, and long trips describe what a person actually encounters.",
    feature: "flight-delays-bts-2025-01",
    accent: "#007c78",
  },
  {
    id: "risk",
    index: "03",
    title: "Risk has a tail",
    intro:
      "Most days are ordinary. Risk lives in the small share of observations that are not, where damage and consequence accumulate quickly.",
    feature: "earthquakes-usgs-2025",
    accent: "#dc4e38",
  },
  {
    id: "inequality",
    index: "04",
    title: "Inequality has a shape",
    intro:
      "Wealth, output, institutions, and cities do not simply differ. They occupy ranges so wide that the middle disappears on ordinary axes.",
    feature: "household-net-worth-scf-2022",
    accent: "#a86f00",
  },
  {
    id: "attention",
    index: "05",
    title: "Attention has a tail",
    intro:
      "Language, research, knowledge, and software all distribute attention unevenly. A small number of names carry astonishing weight.",
    feature: "wikipedia-pageviews-2025-12-31",
    accent: "#196da8",
  },
  {
    id: "life",
    index: "06",
    title: "Life and the universe on log scales",
    intro:
      "Logarithms are useful beyond power laws. They let organisms and planets separated by many orders of magnitude remain visible together.",
    feature: "exoplanets-nasa-orbital-periods",
    accent: "#27845f",
  },
  {
    id: "time",
    index: "07",
    title: "Time has a tail",
    intro:
      "Extremes are not only large things. They are also the uneven intervals between events: short bursts, long silences, then sudden movement.",
    feature: "us-market-shock-waiting-times-french",
    accent: "#7b5ea7",
  },
];

export const evidenceGroups: EvidenceGroup[] = [
  {
    id: "movement",
    index: "02",
    chapter: "everyday",
    defaultDatasetId: "flight-delays-bts-2025-01",
    datasetIds: [
      "flight-delays-bts-2025-01",
      "taxi-trip-distances-nyc-tlc-2025-01",
    ],
  },
  {
    id: "physicalRisk",
    index: "03",
    chapter: "risk",
    defaultDatasetId: "earthquakes-usgs-2025",
    datasetIds: ["earthquakes-usgs-2025"],
  },
  {
    id: "marketRisk",
    index: "04",
    chapter: "time",
    defaultDatasetId: "us-market-absolute-returns-french",
    datasetIds: [
      "us-market-absolute-returns-french",
      "us-market-shock-waiting-times-french",
    ],
  },
  {
    id: "householdEconomy",
    index: "05",
    chapter: "inequality",
    defaultDatasetId: "household-net-worth-scf-2022",
    datasetIds: [
      "household-net-worth-scf-2022",
      "household-income-scf-2022",
      "household-assets-scf-2022",
      "household-debt-scf-2022",
      "country-gdp-worldbank-2024",
    ],
  },
  {
    id: "institutionScale",
    index: "06",
    chapter: "inequality",
    defaultDatasetId: "firm-assets-sec-2026q1",
    datasetIds: [
      "firm-assets-sec-2026q1",
      "bank-assets-fdic",
      "debt-securities-bis-2025q4",
    ],
  },
  {
    id: "urbanNetworks",
    index: "07",
    chapter: "inequality",
    defaultDatasetId: "city-populations-geonames",
    datasetIds: [
      "city-populations-geonames",
      "social-network-snap-facebook",
    ],
  },
  {
    id: "attentionKnowledge",
    index: "08",
    chapter: "attention",
    defaultDatasetId: "wikipedia-pageviews-2025-12-31",
    datasetIds: [
      "wikipedia-pageviews-2025-12-31",
      "word-frequency-gutenberg-moby-dick",
      "citations-openalex-2020-top",
      "open-source-downloads-pypi-2025-12",
    ],
  },
  {
    id: "lifeScale",
    index: "09",
    chapter: "life",
    defaultDatasetId: "exoplanets-nasa-orbital-periods",
    datasetIds: [
      "exoplanets-nasa-orbital-periods",
      "species-observations-gbif-2025",
      "body-size-pantheria",
    ],
  },
];

export const datasetStories: DatasetStory[] = [
  {
    id: "transit-headways-mbta-gtfs",
    chapter: "everyday",
    citation: "MBTA2026",
    defaultMode: "tail",
    hook: "A timetable promises regularity. Scheduled departure gaps already show a longer edge.",
    detail:
      "These are scheduled MBTA headways at the first stop, not observed arrivals or passenger waiting times.",
  },
  {
    id: "flight-delays-bts-2025-01",
    chapter: "everyday",
    citation: "BTS2025",
    defaultMode: "tail",
    hook: "Most positive delays are survivable. A small fraction are the ones that ruin the day.",
    detail:
      "January 2025 US flights with a positive arrival delay. In the tail view, height means the chance of a delay at least that long.",
  },
  {
    id: "taxi-trip-distances-nyc-tlc-2025-01",
    chapter: "everyday",
    citation: "NYCTLC2025",
    defaultMode: "tail",
    hook: "New York moves mostly in short hops, interrupted by rare journeys across the urban region.",
    detail:
      "More than 3.3 million valid yellow taxi trips from January 2025. The curve is heavy but visibly not one clean power law.",
  },
  {
    id: "earthquakes-usgs-2025",
    chapter: "risk",
    citation: "USGS2026",
    defaultMode: "tail",
    hook: "Small earthquakes happen constantly. The rare event carries an entirely different amount of energy.",
    detail:
      "Worldwide magnitude 2.5 and larger events in 2025. Relative energy is derived from the reported magnitude.",
  },
  {
    id: "us-market-absolute-returns-french",
    chapter: "risk",
    citation: "French2026",
    defaultMode: "tail",
    hook: "The market looks calm until the tail moves.",
    detail:
      "Absolute daily US market returns from the Kenneth French factors series. The chart describes magnitude, not direction.",
  },
  {
    id: "wildfires-mtbs-1984-2024",
    chapter: "risk",
    citation: "MTBS2025",
    defaultMode: "tail",
    hook: "Most recorded large fires stay near the program threshold. A few redraw landscapes.",
    detail:
      "MTBS large US wildfire and wildland-fire-use boundaries from 1984 through 2024.",
  },
  {
    id: "storm-damage-noaa-2025",
    chapter: "risk",
    citation: "NOAA2026",
    defaultMode: "tail",
    hook: "Damage is not evenly distributed across storms.",
    detail:
      "Reported property and crop damage for 2025 US storm events. Zero and missing damage records are excluded.",
  },
  {
    id: "pollution-openmeteo-nyc-2025",
    chapter: "risk",
    citation: "OpenMeteo2026",
    defaultMode: "log",
    hook: "An annual average can hide the hours when breathing conditions become dangerous.",
    detail:
      "Hourly New York City PM2.5 estimates for 2025. Its limited range makes a log-log claim especially unconvincing.",
  },
  {
    id: "conflict-fatalities-ucdp-ged-26-1",
    chapter: "risk",
    citation: "UCDP2026",
    defaultMode: "tail",
    hook: "Recorded violence is concentrated: a small number of events account for a disproportionate loss of life.",
    detail:
      "UCDP event-level best estimates from 1989 through 2025. Zero-fatality records are omitted; every point represents human loss.",
  },
  {
    id: "household-net-worth-scf-2022",
    chapter: "inequality",
    citation: "FederalReserve2023",
    defaultMode: "tail",
    hook: "Wealth is not spread like height or age. The upper tail keeps going.",
    detail:
      "Positive 2022 US household net worth from the Survey of Consumer Finances. Tail probabilities and means use survey weights.",
  },
  {
    id: "household-income-scf-2022",
    chapter: "inequality",
    citation: "FederalReserve2023",
    defaultMode: "tail",
    hook: "Income is uneven, though its upper tail has a different shape from accumulated wealth.",
    detail: "Positive 2022 SCF income observations with survey-weighted tail probabilities.",
  },
  {
    id: "household-assets-scf-2022",
    chapter: "inequality",
    citation: "FederalReserve2023",
    defaultMode: "tail",
    hook: "Asset ownership stretches across almost ten orders of magnitude in the positive extract.",
    detail:
      "Positive 2022 SCF household assets. Logarithmic charts necessarily exclude zero and negative values.",
  },
  {
    id: "household-debt-scf-2022",
    chapter: "inequality",
    citation: "FederalReserve2023",
    defaultMode: "tail",
    hook: "Debt is concentrated too, but not in exactly the same shape as wealth or assets.",
    detail: "Positive 2022 SCF household debt with survey-weighted tail probabilities.",
  },
  {
    id: "country-gdp-worldbank-2024",
    chapter: "inequality",
    citation: "WorldBank2026",
    defaultMode: "loglog",
    hook: "A small group of economies carries much of global output.",
    detail:
      "Country GDP in current US dollars for 2024. World Bank aggregate regions are excluded.",
  },
  {
    id: "firm-assets-sec-2026q1",
    chapter: "inequality",
    citation: "SEC2026",
    defaultMode: "log",
    hook: "Public-company assets span a vast range, but the curve refuses one simple scale story.",
    detail:
      "Total assets from annual-style filings in the SEC 2026 Q1 Financial Statement Data Set.",
  },
  {
    id: "bank-assets-fdic",
    chapter: "inequality",
    citation: "FDIC2026",
    defaultMode: "loglog",
    hook: "The financial system concentrates inside a small number of very large institutions.",
    detail:
      "Total assets for active FDIC-insured institutions, converted from thousands to US dollars.",
  },
  {
    id: "debt-securities-bis-2025q4",
    chapter: "inequality",
    citation: "BIS2026",
    defaultMode: "loglog",
    hook: "Borrowing in global capital markets is highly concentrated across issuing economies.",
    detail: "Outstanding resident-issued debt securities for 39 countries in 2025 Q4.",
  },
  {
    id: "city-populations-geonames",
    chapter: "inequality",
    citation: "GeoNames2026",
    defaultMode: "loglog",
    hook: "A few megacities tower over tens of thousands of smaller places.",
    detail: "Population values from the GeoNames cities15000 database.",
  },
  {
    id: "social-network-snap-facebook",
    chapter: "inequality",
    citation: "SNAP2026",
    defaultMode: "log",
    hook: "Most nodes have modest degree. A smaller number become hubs, but not along a clean power law here.",
    detail: "Node degree calculated from the undirected SNAP Facebook combined edge list.",
  },
  {
    id: "word-frequency-gutenberg-moby-dick",
    chapter: "attention",
    citation: "Melville2021",
    defaultMode: "loglog",
    hook: "A few words carry the language of an entire novel.",
    detail:
      "Word counts computed from the Project Gutenberg plain-text edition of Moby-Dick. This is the classic rank-frequency reveal.",
  },
  {
    id: "citations-openalex-2020-top",
    chapter: "attention",
    citation: "OpenAlex2026",
    defaultMode: "loglog",
    hook: "A few papers become intellectual giants while attention falls away rapidly down the ranking.",
    detail:
      "The 1,000 most-cited OpenAlex works published in 2020; this is a top-ranked extract, not the full corpus.",
  },
  {
    id: "wikipedia-pageviews-2025-12-31",
    chapter: "attention",
    citation: "Wikimedia2025",
    defaultMode: "loglog",
    hook: "Millions of pages exist. On any given day, attention floods into a very small number.",
    detail: "The top 999 English Wikipedia articles by pageviews on December 31, 2025.",
  },
  {
    id: "open-source-downloads-pypi-2025-12",
    chapter: "attention",
    citation: "PSF2026",
    defaultMode: "loglog",
    hook: "Modern software rests on a small set of invisible infrastructure packages.",
    detail:
      "The top 100,000 PyPI package names by downloads in December 2025. Automated traffic may be included.",
  },
  {
    id: "species-observations-gbif-2025",
    chapter: "life",
    citation: "GBIF2026",
    defaultMode: "loglog",
    hook: "Some species are recorded everywhere. Many remain nearly invisible in the observation database.",
    detail:
      "Top GBIF scientific-name occurrence counts for 2025. Records are not estimates of true population abundance.",
  },
  {
    id: "body-size-pantheria",
    chapter: "life",
    citation: "JonesEtAl2009",
    defaultMode: "log",
    hook: "Mammal life occupies astonishingly different physical scales.",
    detail: "Adult body mass from the PanTHERIA mammal life-history database.",
  },
  {
    id: "exoplanets-nasa-orbital-periods",
    chapter: "life",
    citation: "NASA2026",
    defaultMode: "log",
    hook: "Log scales reveal cosmic variety even when the pattern is not a pure power law.",
    detail:
      "Confirmed exoplanet orbital periods from the NASA Exoplanet Archive composite parameters table.",
  },
  {
    id: "us-market-shock-waiting-times-french",
    chapter: "time",
    citation: "French2026",
    defaultMode: "tail",
    hook: "Calm periods cluster. Shocks cluster too.",
    detail:
      "Trading-day gaps between US market moves with an absolute return of at least 3%. The intervals are derived from real daily returns.",
  },
];

export const storyById = new Map(datasetStories.map((story) => [story.id, story]));

export const cautionStories = [
  {
    id: "exoplanets-nasa-orbital-periods",
    badge: "Log scale helps",
    text: "Planet periods span wild ranges, but the curve stays mixed. Useful visibility is not the same as a power law.",
  },
  {
    id: "pollution-openmeteo-nyc-2025",
    badge: "Range is limited",
    text: "PM2.5 spikes are important, yet this extract spans too little range for a clean scale-free reading.",
  },
  {
    id: "taxi-trip-distances-nyc-tlc-2025-01",
    badge: "Mixtures matter",
    text: "Local trips, airport trips, and unusual long journeys bend the curve into multiple regimes.",
  },
];
