"use client";

import { usePreloadedQuery, type Preloaded } from "convex/react";
import {
  BarChart3,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Languages,
  Layers,
  Menu,
  X,
} from "lucide-react";
import {
  createContext,
  useCallback,
  useEffect,
  useContext,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";

import { api } from "../../convex/_generated/api";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  languageLocales,
  languageOptions,
  translations,
  type Language,
  type Translation,
} from "@/lib/i18n";
import {
  cautionStories,
  chapters,
  datasetStories,
  evidenceGroups,
  scaleModes,
  type DatasetStory,
  type EvidenceGroup,
  type ScaleMode,
} from "@/lib/story";

type RankPoint = {
  rank: number;
  value: number;
  ccdf: number;
};

type DatasetBundle = {
  dataset: DatasetDoc;
  points: RankPoint[];
  story: DatasetStory;
};

type TransformedPoint = {
  x: number;
  y: number;
  raw: RankPoint;
};

type TooltipState = {
  left: number;
  top: number;
  point: RankPoint;
} | null;

const allModes = Object.keys(scaleModes) as ScaleMode[];
const heroRightModes: ScaleMode[] = ["log", "loglog", "tail"];

// Change these values to control the hero's right-side scale loop.
const HERO_SCALE_HOLD_MS = 20_000;
const HERO_SCALE_TRANSITION_MS = 4_800;
const languageStorageKey = "scale-button-language";

type LocaleContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translation;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

type DatasetDoc = {
  slug: string;
  title: string;
  category: string;
  measure: string;
  unit: string;
  sourceName: string;
  sourceUrl: string;
  retrievedAt: string;
  notes: string;
  stats: {
    count: number;
    min: number;
    max: number;
    mean: number;
  };
  topItems: Array<Record<string, string | number | boolean | null>>;
};

function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used inside LocaleContext.Provider");
  }
  return context;
}

function useLinearModeOnViewportEntry<T extends HTMLElement>(
  onEnter: (mode: ScaleMode) => void,
  resetKey: string,
) {
  const [target, setTarget] = useState<T | null>(null);
  const wasVisibleRef = useRef(false);
  const onEnterRef = useRef(onEnter);
  const targetRef = useCallback((node: T | null) => {
    setTarget(node);
  }, []);

  useEffect(() => {
    onEnterRef.current = onEnter;
  }, [onEnter]);

  useEffect(() => {
    wasVisibleRef.current = false;
  }, [resetKey]);

  useEffect(() => {
    if (!target || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;

        if (isVisible && !wasVisibleRef.current) {
          onEnterRef.current("linear");
        }

        wasVisibleRef.current = isVisible;
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.01,
      },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [resetKey, target]);

  return targetRef;
}

function useRenderWhenNearViewport<T extends HTMLElement>(rootMargin = "720px") {
  const [target, setTarget] = useState<T | null>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const targetRef = useCallback((node: T | null) => {
    setTarget(node);
  }, []);

  useEffect(() => {
    if (shouldRender || !target) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      window.setTimeout(() => setShouldRender(true), 0);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold: 0.01,
      },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [rootMargin, shouldRender, target]);

  return [targetRef, shouldRender] as const;
}

export function ScaleButtonApp({
  preloadedScaleData,
}: {
  preloadedScaleData: Preloaded<typeof api.scaleData.list>;
}) {
  const payload = usePreloadedQuery(preloadedScaleData);
  const [language, setLanguageState] = useState<Language>("en");
  const t = translations[language];

  useEffect(() => {
    const stored = window.localStorage.getItem(languageStorageKey);
    if (stored === "en" || stored === "hu" || stored === "ro") {
      window.setTimeout(() => setLanguageState(stored), 0);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(languageStorageKey, nextLanguage);
    document.documentElement.lang = nextLanguage;
  };

  const bundles = useMemo(() => {
    const groupsBySlug = new Map(
      payload.groups.map((group) => [group.dataset.slug, group]),
    );

    return datasetStories
      .map((story) => {
        const group = groupsBySlug.get(story.id);
        if (!group) {
          return null;
        }

        const points = group.points.map((point) => ({
          rank: point.rank,
          value: point.value,
          ccdf: point.ccdf,
        }));

        return { dataset: group.dataset, points, story };
      })
      .filter((bundle): bundle is DatasetBundle => bundle !== null);
  }, [payload]);

  const bundleMap = useMemo(() => {
    const map = new Map<string, DatasetBundle>();
    for (const bundle of bundles) {
      map.set(bundle.story.id, bundle);
    }
    return map;
  }, [bundles]);

  return (
    <LocaleContext.Provider value={{ language, setLanguage, t }}>
      <div className="app-shell">
        <SiteHeader />
        <StoryRail />
        <main id="main-content">
          <Hero
            bundle={bundleMap.get("wikipedia-pageviews-2025-12-31")}
          />
          <OpeningBand />
          <ScaleMachine
            bundle={bundleMap.get("word-frequency-gutenberg-moby-dick")}
          />
          {evidenceGroups.map((group) => (
            <EvidenceGroupSection
              key={group.id}
              group={group}
              bundleMap={bundleMap}
            />
          ))}
          <ScaleAtlas bundles={bundles} />
          <ComparisonWall bundles={bundles} />
          <CautionSection bundleMap={bundleMap} />
          <SourcesSection bundles={bundles} />
          <ClosingSection />
        </main>
        <SiteFooter />
      </div>
    </LocaleContext.Provider>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { t } = useLocale();

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        {t.nav.skip}
      </a>
      <nav className="site-nav" aria-label={t.nav.story}>
        <a className="brand" href="#top" aria-label={`${t.nav.brand} home`}>
          <span className="brand-mark" aria-hidden="true">
            <BarChart3 size={18} />
          </span>
          <span>{t.nav.brand}</span>
        </a>

        <div className="desktop-nav" aria-label={t.nav.chapters}>
          <a href="#machine">{t.nav.story}</a>
          <a href="#atlas">{t.nav.atlas}</a>
          <a href="#sources">{t.nav.sources}</a>
        </div>

        <div className="nav-actions">
          <LanguageDropdown />
          <ThemeSwitcher label={t.nav.theme} />
          <button
            type="button"
            className="icon-button mobile-nav-button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? t.nav.closeNavigation : t.nav.openNavigation}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="mobile-menu" aria-label={t.nav.openNavigation}>
          {[
            ["#machine", t.nav.button],
            ...evidenceGroups.map((group) => [
              `#evidence-${group.id}`,
              t.evidenceGroups[group.id].title,
            ] as const),
            ["#atlas", t.nav.atlas],
            ["#comparison", t.nav.compare],
            ["#caution", t.nav.caution],
            ["#sources", t.nav.sources],
          ].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
              <ChevronRight size={16} />
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}

function LanguageDropdown() {
  const { language, setLanguage, t } = useLocale();
  const [open, setOpen] = useState(false);
  const activeLanguage = languageOptions.find((item) => item.code === language);

  return (
    <div className="language-dropdown">
      <button
        type="button"
        className="language-trigger"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.nav.language}
      >
        <Languages size={16} />
        <span>{activeLanguage?.shortLabel ?? "EN"}</span>
        <ChevronDown size={14} />
      </button>
      {open ? (
        <div className="language-menu" role="listbox" aria-label={t.nav.language}>
          {languageOptions.map((item) => (
            <button
              key={item.code}
              type="button"
              data-language={item.code}
              role="option"
              aria-selected={item.code === language}
              onClick={() => {
                setLanguage(item.code);
                setOpen(false);
              }}
            >
              <span>{item.label}</span>
              <strong>{item.shortLabel}</strong>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function StoryRail() {
  const { t } = useLocale();

  return (
    <nav className="story-rail" aria-label={t.nav.story}>
      <a href="#top">{t.nav.open}</a>
      <a href="#machine">{t.nav.button}</a>
      {evidenceGroups.map((group) => (
        <a key={group.id} href={`#evidence-${group.id}`}>
          {t.evidenceGroups[group.id].title.split(" ")[0]}
        </a>
      ))}
      <a href="#atlas">{t.nav.atlas}</a>
    </nav>
  );
}

function Hero({
  bundle,
}: {
  bundle?: DatasetBundle;
}) {
  const { t } = useLocale();
  const [mode, setMode] = useState<ScaleMode>("loglog");
  const [previousMode, setPreviousMode] = useState<ScaleMode | null>(null);
  const [transitionKey, setTransitionKey] = useState(0);
  const modeRef = useRef<ScaleMode>("loglog");
  const transitionTimeoutRef = useRef<number | null>(null);
  const thesis = splitFinalSentence(t.hero.thesis);

  const beginScaleTransition = useCallback((nextMode: ScaleMode) => {
    if (mode === nextMode) {
      return;
    }

    if (transitionTimeoutRef.current) {
      window.clearTimeout(transitionTimeoutRef.current);
    }

    setPreviousMode(mode);
    setMode(nextMode);
    modeRef.current = nextMode;
    setTransitionKey((key) => key + 1);

    transitionTimeoutRef.current = window.setTimeout(() => {
      setPreviousMode(null);
      transitionTimeoutRef.current = null;
    }, HERO_SCALE_TRANSITION_MS);
  }, [mode]);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    if (previousMode) {
      return undefined;
    }

    const holdTimeout = window.setTimeout(() => {
      const currentIndex = heroRightModes.indexOf(modeRef.current);
      const nextMode = heroRightModes[(currentIndex + 1) % heroRightModes.length];
      beginScaleTransition(nextMode);
    }, HERO_SCALE_HOLD_MS);

    return () => window.clearTimeout(holdTimeout);
  }, [beginScaleTransition, mode, previousMode]);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="hero-section split-hero" id="top" aria-labelledby="hero-title">
      <div className="page-shell hero-title-panel">
        <div className="hero-copy">
          <h1 id="hero-title">{t.hero.title}</h1>
          <p className="hero-thesis">
            {thesis.lead}
            <span>{thesis.emphasis}</span>
          </p>
          <p className="hero-subtitle">{t.hero.subtitle}</p>
          <HeroScaleInstrument mode={mode} onChange={beginScaleTransition} />
        </div>
      </div>

      <div className="hero-split-stage" aria-hidden="true">
        {bundle ? (
          <HeroSplitChart
            bundle={bundle}
            mode={mode}
            previousMode={previousMode}
            transitionKey={transitionKey}
          />
        ) : null}
      </div>
    </section>
  );
}

function HeroScaleInstrument({
  mode,
  onChange,
}: {
  mode: ScaleMode;
  onChange: (mode: ScaleMode) => void;
}) {
  const { t } = useLocale();

  return (
    <div className="hero-mode-picker" aria-label={t.hero.modePickerLabel}>
      <span className="hero-mode-fixed">{t.scaleModes.linear.label}</span>
      <span className="hero-mode-separator" aria-hidden="true">
        |
      </span>
      {heroRightModes.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          aria-pressed={mode === item}
        >
          {t.scaleModes[item].label}
        </button>
      ))}
    </div>
  );
}

function splitFinalSentence(text: string) {
  const parts = text.match(/^(.*?\.\s+.*?\.\s+)(.+)$/);

  if (!parts) {
    return { lead: "", emphasis: text };
  }

  return {
    lead: parts[1],
    emphasis: parts[2],
  };
}

function HeroSplitChart({
  bundle,
  mode,
  previousMode,
  transitionKey,
}: {
  bundle: DatasetBundle;
  mode: ScaleMode;
  previousMode: ScaleMode | null;
  transitionKey: number;
}) {
  const { language, t } = useLocale();
  const chart = useMemo(() => buildHeroSplitChart(bundle.points, mode), [
    bundle.points,
    mode,
  ]);
  const previousChart = useMemo(
    () => previousMode ? buildHeroSplitChart(bundle.points, previousMode) : null,
    [bundle.points, previousMode],
  );
  const isTransitioning = Boolean(previousMode);

  return (
    <svg
      className="hero-split-svg"
      viewBox="0 0 1440 620"
      role="img"
      aria-label={`${localizeDatasetTitle(bundle, t)}: ${t.chart.linearSide} to ${t.scaleModes[mode].label}`}
    >
      <defs>
        <filter id="hero-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="hero-soft-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="18" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 .72 0"
            result="glow"
          />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="hero-chart-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--hero-ink-line)" />
          <stop offset="45%" stopColor="var(--hero-ink-line)" />
          <stop offset="100%" stopColor="var(--hero-accent)" />
        </linearGradient>
      </defs>

      <g className="hero-background-grid">
        {chart.backgroundGridY.map((y) => (
          <line
            key={`bg-y-${y}`}
            x1={chart.leftPlot.x}
            x2={chart.rightPlot.right}
            y1={y}
            y2={y}
          />
        ))}
        {chart.backgroundGridX.map((x) => (
          <line
            key={`bg-x-${x}`}
            x1={x}
            x2={x}
            y1={chart.backgroundGridTop}
            y2={chart.leftPlot.bottom}
          />
        ))}
      </g>

      <g className="hero-plot hero-plot-left">
        <text className="hero-plot-label" x={chart.leftPlot.x + 58} y={chart.leftPlot.y - 34}>
          {t.scaleModes.linear.label}
        </text>
        <line
          className="hero-plot-label-line"
          x1={chart.leftPlot.x + 56}
          x2={chart.leftPlot.x + 132}
          y1={chart.leftPlot.y - 22}
          y2={chart.leftPlot.y - 22}
        />
        <circle
          className="hero-plot-label-dot"
          cx={chart.leftPlot.x + 44}
          cy={chart.leftPlot.y - 22}
          r="4"
        />
        <rect
          x={chart.leftPlot.x}
          y={chart.leftPlot.y}
          width={chart.leftPlot.width}
          height={chart.leftPlot.height}
        />
        {chart.leftGridX.map((x) => (
          <line key={x} x1={x} y1={chart.leftPlot.y} x2={x} y2={chart.leftPlot.bottom} />
        ))}
        {chart.leftGridY.map((tick) => (
          <g key={tick.value}>
            <line
              x1={chart.leftPlot.x}
              y1={tick.y}
              x2={chart.leftPlot.right}
              y2={tick.y}
            />
            <text className="hero-axis-tick hero-axis-tick--left" x={chart.leftPlot.x - 16} y={tick.y + 6}>
              {formatCompact(tick.value, language)}
            </text>
          </g>
        ))}
        {chart.leftXTicks.map((tick) => (
          <text key={tick.value} className="hero-axis-tick" x={tick.x} y={chart.leftPlot.bottom + 38}>
            {formatCompact(tick.value, language)}
          </text>
        ))}
        <text
          className="hero-axis-title"
          x={chart.leftPlot.x + chart.leftPlot.width / 2}
          y={chart.leftPlot.bottom + 72}
        >
          {t.chart.rank}
        </text>
        <text
          className="hero-axis-title"
          x={chart.leftPlot.x - 66}
          y={chart.leftPlot.y + chart.leftPlot.height / 2}
          transform={`rotate(-90 ${chart.leftPlot.x - 66} ${chart.leftPlot.y + chart.leftPlot.height / 2})`}
        >
          {localizeUnit(bundle.dataset.unit, t)}
        </text>
      </g>

      <g className="hero-plot hero-plot-right">
        <text className="hero-plot-label" x={chart.rightPlot.right - 78} y={chart.rightPlot.y - 34}>
          {t.scaleModes[mode].label}
        </text>
        <line
          className="hero-plot-label-line"
          x1={chart.rightPlot.right - 92}
          x2={chart.rightPlot.right - 22}
          y1={chart.rightPlot.y - 22}
          y2={chart.rightPlot.y - 22}
        />
        <circle
          className="hero-plot-label-dot"
          cx={chart.rightPlot.right - 10}
          cy={chart.rightPlot.y - 22}
          r="4"
        />
        <rect
          x={chart.rightPlot.x}
          y={chart.rightPlot.y}
          width={chart.rightPlot.width}
          height={chart.rightPlot.height}
        />
        {chart.rightGridX.map((x) => (
          <line key={x} x1={x} y1={chart.rightPlot.y} x2={x} y2={chart.rightPlot.bottom} />
        ))}
        {chart.rightGridY.map((tick) => (
          <g key={tick.value}>
            <line
              x1={chart.rightPlot.x}
              y1={tick.y}
              x2={chart.rightPlot.right}
              y2={tick.y}
            />
            <text className="hero-axis-tick hero-axis-tick--right" x={chart.rightPlot.right + 22} y={tick.y + 6}>
              {formatCompact(tick.value, language)}
            </text>
          </g>
        ))}
        {chart.rightXTicks.map((tick) => (
          <text key={tick.value} className="hero-axis-tick" x={tick.x} y={chart.rightPlot.bottom + 38}>
            {formatCompact(tick.value, language)}
          </text>
        ))}
        <text
          className="hero-axis-title"
          x={chart.rightPlot.x + chart.rightPlot.width / 2}
          y={chart.rightPlot.bottom + 72}
        >
          {t.chart.rank}
        </text>
        <text
          className="hero-axis-title"
          x={chart.rightPlot.right + 54}
          y={chart.rightPlot.y + chart.rightPlot.height / 2}
          transform={`rotate(90 ${chart.rightPlot.right + 54} ${chart.rightPlot.y + chart.rightPlot.height / 2})`}
        >
          {localizeUnit(bundle.dataset.unit, t)}
        </text>
      </g>

      <g className="hero-data-noise hero-data-noise--left">
        {chart.leftDots.map((point, index) => (
          <circle
            key={`${point.x}-${point.y}-${index}`}
            cx={point.x}
            cy={point.y}
            r={point.r}
            style={
              {
                "--delay": `${index * 17}ms`,
                "--float-x": `${point.dx}px`,
                "--float-y": `${point.dy}px`,
                "--float-speed": `${point.duration}ms`,
              } as CSSProperties
            }
          />
        ))}
      </g>

      <g className="hero-data-noise hero-data-noise--ambient">
        {chart.ambientDots.map((point, index) => (
          <circle
            key={`${point.x}-${point.y}-${index}`}
            cx={point.x}
            cy={point.y}
            r={point.r}
            style={
              {
                "--delay": `${index * 31}ms`,
                "--float-x": `${point.dx}px`,
                "--float-y": `${point.dy}px`,
                "--float-speed": `${point.duration}ms`,
              } as CSSProperties
            }
          />
        ))}
      </g>

      <path className="hero-data-line hero-data-line--left" d={chart.leftPath} />
      <g className="hero-data-markers hero-data-markers--left">
        {chart.leftMarkers.map((point, index) => (
          <circle key={`${point.x}-${point.y}-${index}`} cx={point.x} cy={point.y} r={point.r} />
        ))}
      </g>

      {previousChart ? (
        <HeroEnergyField
          chart={previousChart}
          className="hero-energy-field--exiting"
          fieldKey={`energy-exit-${transitionKey}`}
        />
      ) : null}

      <HeroEnergyField
        chart={chart}
        className={isTransitioning ? "hero-energy-field--entering" : "hero-energy-field--steady"}
        fieldKey={`energy-${mode}-${transitionKey}`}
      />

      {previousChart ? (
        <HeroRightLayer
          chart={previousChart}
          className="hero-right-layer--exiting"
          layerKey={`right-exit-${transitionKey}`}
        />
      ) : null}

      <HeroRightLayer
        chart={chart}
        className={isTransitioning ? "hero-right-layer--entering" : "hero-right-layer--steady"}
        layerKey={`${mode}-${transitionKey}`}
      />
    </svg>
  );
}

function HeroEnergyField({
  chart,
  className,
  fieldKey,
}: {
  chart: ReturnType<typeof buildHeroSplitChart>;
  className: string;
  fieldKey: string;
}) {
  return (
    <g
      key={fieldKey}
      className={`hero-energy-field ${className}`}
      filter="url(#hero-soft-glow)"
    >
      {chart.energyPaths.map((path, index) => (
        <path
          key={path.id}
          className={path.kind === "solid" ? "hero-energy-solid" : "hero-energy-dash"}
          d={path.d}
          pathLength={1}
          style={
            {
              "--delay": `${index * 95}ms`,
              "--stroke-width": `${path.strokeWidth}`,
              "--break-x": `${path.breakX}px`,
              "--break-y": `${path.breakY}px`,
            } as CSSProperties
          }
        />
      ))}
      {chart.energyParticles.map((point, index) => (
        <circle
          key={`${point.x}-${point.y}-${index}`}
          cx={point.x}
          cy={point.y}
          r={point.r}
          style={{ "--delay": `${index * 210}ms` } as CSSProperties}
        />
      ))}
    </g>
  );
}

function HeroRightLayer({
  chart,
  className,
  layerKey,
}: {
  chart: ReturnType<typeof buildHeroSplitChart>;
  className: string;
  layerKey: string;
}) {
  return (
    <g key={layerKey} className={`hero-right-layer ${className}`}>
      <path className="hero-right-guide" d={chart.rightGuidePath} />
      <path className="hero-data-line hero-data-line--right" d={chart.rightPath} pathLength={1} />
      <g className="hero-data-markers hero-data-markers--right">
        {chart.rightMarkers.map((point, index) => (
          <circle key={`${point.x}-${point.y}-${index}`} cx={point.x} cy={point.y} r={point.r} />
        ))}
      </g>
      <circle className="hero-join-node" cx={chart.join.x} cy={chart.join.y} r="6" />
    </g>
  );
}

type HeroVisualPoint = {
  x: number;
  y: number;
};

type HeroEnergyPath = {
  id: string;
  d: string;
  kind: "dash" | "solid";
  strokeWidth: number;
  breakX: number;
  breakY: number;
};

function buildHeroSplitChart(points: RankPoint[], mode: ScaleMode) {
  const leftPlot = makePlotBox(92, 205, 420, 292);
  const rightPlot = makePlotBox(928, 205, 420, 292);
  const backgroundGridTop = 72;
  const leftSource = downsample(points, 280);
  const leftDomainX = extent(points.map((point) => point.rank));
  const maxValue = Math.max(...points.map((point) => point.value));
  const positiveValues = points
    .map((point) => point.value)
    .filter((value) => value > 0);
  const minPositiveValue =
    positiveValues.length > 0 ? Math.min(...positiveValues) : Math.max(maxValue / 1_000_000, 1);
  const leftDomainY: [number, number] = [0, maxValue];
  const rawRankTicks = makeRawRankTicks(leftDomainX);
  const rawValueTicks = ticks(0, maxValue, 5);
  const leftVisual = leftSource.map((point) => {
    const xProgress = normalize(point.rank, leftDomainX);
    const yProgress = normalize(point.value, leftDomainY);

    return {
      x: leftPlot.x + xProgress * leftPlot.width,
      y: leftPlot.bottom - yProgress * leftPlot.height,
    };
  });

  const leftPath = createPath(leftVisual);
  const leftMarkerSource = leftSource.filter((point, index) => {
    const yProgress = normalize(point.value, leftDomainY);

    if (index === 0 || index === leftSource.length - 1) {
      return true;
    }

    if (yProgress < 0.018) {
      return pseudoRandom(point.rank + 719) > 0.96;
    }

    if (yProgress < 0.055) {
      return pseudoRandom(point.rank + 719) > 0.84;
    }

    return pseudoRandom(point.rank + 719) > 0.58;
  });
  const leftMarkers = downsample(leftMarkerSource, 20).map((point, index) => {
    const xProgress = normalize(point.rank, leftDomainX);
    const yProgress = normalize(point.value, leftDomainY);

    return {
      x: leftPlot.x + xProgress * leftPlot.width,
      y: leftPlot.bottom - yProgress * leftPlot.height,
      r: index === 0 ? 3.8 : 2.55,
    };
  });
  const leftDotCandidates = points.filter((point) => {
    const yProgress = normalize(point.value, leftDomainY);
    const random = pseudoRandom(point.rank + 503);

    if (yProgress < 0.018) {
      return random > 0.955;
    }

    if (yProgress < 0.055) {
      return random > 0.86;
    }

    return random > 0.48;
  });
  const leftDotSource = downsample(leftDotCandidates, 78);
  const leftDots = leftDotSource.map((point) => {
    const xProgress = normalize(point.rank, leftDomainX);
    const yProgress = normalize(point.value, leftDomainY);
    const base = {
      x: leftPlot.x + xProgress * leftPlot.width,
      y: leftPlot.bottom - yProgress * leftPlot.height,
    };
    const randomA = pseudoRandom(point.rank + 17);
    const randomB = pseudoRandom(point.rank + 61);

    return {
      x: clamp(base.x + (randomA - 0.5) * 30, leftPlot.x - 14, leftPlot.right + 16),
      y: clamp(base.y + (randomB - 0.5) * 135, leftPlot.y - 12, leftPlot.bottom + 16),
      r: 0.55 + randomA * 1,
      dx: (pseudoRandom(point.rank + 79) - 0.5) * 13,
      dy: (pseudoRandom(point.rank + 97) - 0.5) * 18,
      duration: 5_200 + Math.round(pseudoRandom(point.rank + 131) * 2_900),
    };
  });

  const rightOrdered = [...points].sort((a, b) => b.rank - a.rank);
  const rightSample = downsample(rightOrdered, 220);
  const rightDomainX = heroXDomain(mode, leftDomainX);
  const rightDomainY = heroYDomain(mode, minPositiveValue, maxValue);
  const rightVisual = rightSample.map((point) => {
    const xProgress = 1 - normalize(heroXValue(point.rank, mode), rightDomainX);
    const yProgress = normalize(heroYValue(point.value, mode, minPositiveValue), rightDomainY);

    return {
      x: rightPlot.x + xProgress * rightPlot.width,
      y: rightPlot.bottom - yProgress * rightPlot.height,
    };
  });

  const bridgeStart = leftVisual[leftVisual.length - 1] ?? {
    x: leftPlot.right,
    y: leftPlot.bottom,
  };
  const firstRight = rightVisual[0] ?? {
    x: rightPlot.x,
    y: rightPlot.bottom,
  };
  const join = { x: firstRight.x, y: firstRight.y };
  const rightPath = createPath(rightVisual);
  const rightGuidePath = createPath([
    rightVisual[rightVisual.length - 1] ?? join,
    rightVisual[Math.floor(rightVisual.length * 0.5)] ?? join,
    join,
  ]);
  const rightMarkerSource = downsample(rightVisual, 38);
  const rightMarkers = rightMarkerSource.map((point, index) => ({
    ...point,
    r: index === rightMarkerSource.length - 1 ? 3.8 : 2.7,
  }));
  const energyPaths = makeEnergyPaths(bridgeStart, join);
  const energyParticles = Array.from({ length: 12 }, (_, index) => {
    const progress = index / 11;
    const x = bridgeStart.x + (join.x - bridgeStart.x) * progress;
    const centerY = bridgeStart.y + (join.y - bridgeStart.y) * progress;
    const y =
      centerY +
      Math.sin(progress * Math.PI * 2.4 + index * 0.7) *
        (24 + 38 * Math.sin(progress * Math.PI));

    return {
      x,
      y,
      r: 1.7 + pseudoRandom(index + 13) * 1.7,
    };
  });
  const ambientDots = Array.from({ length: 158 }, (_, index) => {
    const randomA = pseudoRandom(index + 101);
    const randomB = pseudoRandom(index + 211);
    const randomC = pseudoRandom(index + 313);
    const randomD = pseudoRandom(index + 421);
    const randomE = pseudoRandom(index + 557);
    const xStart = leftPlot.x - 28;
    const xEnd = rightPlot.right + 24;
    const titleClearMinX = 360;
    const titleClearMaxX = 1080;
    let x = xStart + randomA * (xEnd - xStart);
    let y = backgroundGridTop + randomB * (leftPlot.bottom - backgroundGridTop + 14);

    if (y < 260 && x > titleClearMinX && x < titleClearMaxX) {
      const sendLeft = randomC < 0.5;
      x = sendLeft
        ? xStart + randomD * (titleClearMinX - xStart - 26)
        : titleClearMaxX + 26 + randomD * (xEnd - titleClearMaxX - 26);
      y += 34 + randomE * 80;
    }

    return {
      x,
      y,
      r: 0.45 + randomC * 1.25,
      dx: (randomD - 0.5) * 22,
      dy: (randomE - 0.5) * 26,
      duration: 6_800 + Math.round(pseudoRandom(index + 701) * 5_400),
    };
  });
  const leftXTicks = makeHeroLeftXTicks(rawRankTicks, leftPlot, leftDomainX);
  const rightXTicks = makeHeroRightXTicks(
    [...rawRankTicks].reverse(),
    rightPlot,
    mode,
    leftDomainX,
  );

  return {
    leftPlot,
    rightPlot,
    backgroundGridTop,
    join,
    leftPath,
    rightPath,
    rightGuidePath,
    leftMarkers,
    rightMarkers,
    leftDots,
    ambientDots,
    energyPaths,
    energyParticles,
    backgroundGridX: makeGridPositions(leftPlot.x, rightPlot.right, 10),
    backgroundGridY: makeGridPositions(backgroundGridTop, leftPlot.bottom, 7),
    leftGridX: leftXTicks.map((tick) => tick.x),
    rightGridX: rightXTicks.map((tick) => tick.x),
    leftGridY: makeHeroLeftYTicks(rawValueTicks, leftPlot, leftDomainY),
    rightGridY: makeHeroRightYTicks(rawValueTicks, rightPlot, mode, minPositiveValue, maxValue),
    leftXTicks,
    rightXTicks,
  };
}

function heroXValue(rank: number, mode: ScaleMode) {
  return mode === "loglog" || mode === "tail" ? safeLog(rank) : rank;
}

function heroYValue(value: number, mode: ScaleMode, minPositiveValue: number) {
  const safeValue = Math.max(value, minPositiveValue);

  if (mode === "tail") {
    return Math.sqrt(safeValue);
  }

  return safeLog(safeValue);
}

function heroXDomain(mode: ScaleMode, rankDomain: [number, number]): [number, number] {
  if (mode === "loglog" || mode === "tail") {
    return [safeLog(Math.max(rankDomain[0], 1)), safeLog(Math.max(rankDomain[1], 1))];
  }

  return rankDomain;
}

function heroYDomain(
  mode: ScaleMode,
  minPositiveValue: number,
  maxValue: number,
): [number, number] {
  if (mode === "tail") {
    return [Math.sqrt(minPositiveValue), Math.sqrt(maxValue)];
  }

  return [safeLog(minPositiveValue), safeLog(maxValue)];
}

function makeRawRankTicks([min, max]: [number, number]) {
  const middle = Math.round(min + (max - min) / 2);
  return [min, middle, max];
}

function makeHeroLeftXTicks(
  values: number[],
  plot: ReturnType<typeof makePlotBox>,
  domain: [number, number],
) {
  return values.map((value) => ({
    value,
    x: plot.x + normalize(value, domain) * plot.width,
    y: plot.bottom,
  }));
}

function makeHeroRightXTicks(
  values: number[],
  plot: ReturnType<typeof makePlotBox>,
  mode: ScaleMode,
  rankDomain: [number, number],
) {
  const domain = heroXDomain(mode, rankDomain);

  return values.map((value) => ({
    value,
    x: plot.x + (1 - normalize(heroXValue(value, mode), domain)) * plot.width,
    y: plot.bottom,
  }));
}

function makeHeroLeftYTicks(
  values: number[],
  plot: ReturnType<typeof makePlotBox>,
  domain: [number, number],
) {
  return values.map((value) => ({
    value,
    x: plot.x,
    y: plot.bottom - normalize(value, domain) * plot.height,
  }));
}

function makeHeroRightYTicks(
  values: number[],
  plot: ReturnType<typeof makePlotBox>,
  mode: ScaleMode,
  minPositiveValue: number,
  maxValue: number,
) {
  const domain = heroYDomain(mode, minPositiveValue, maxValue);

  return values.map((value) => {
    const y =
      value <= 0
        ? plot.bottom
        : plot.bottom -
          normalize(heroYValue(value, mode, minPositiveValue), domain) * plot.height;

    return {
      value,
      x: plot.x,
      y: clamp(y, plot.y, plot.bottom),
    };
  });
}

function makePlotBox(x: number, y: number, width: number, height: number) {
  return {
    x,
    y,
    width,
    height,
    right: x + width,
    bottom: y + height,
  };
}

function makeGridPositions(start: number, end: number, interiorCount: number) {
  return Array.from({ length: interiorCount }, (_, index) => {
    const progress = (index + 1) / (interiorCount + 1);
    return start + (end - start) * progress;
  });
}

function makeEnergyPaths(start: HeroVisualPoint, end: HeroVisualPoint): HeroEnergyPath[] {
  const dashedPaths = Array.from({ length: 12 }, (_, index) => {
    const progress = index / 11;
    const amplitude = 34 + Math.sin(progress * Math.PI) * 58;
    const phase = (index - 5.5) * 0.58;
    const c1x = start.x + (end.x - start.x) * 0.28;
    const c2x = start.x + (end.x - start.x) * 0.72;
    const c1y =
      start.y -
      Math.sin(progress * Math.PI + phase) * amplitude -
      (index - 5.5) * 3.7;
    const c2y =
      end.y +
      Math.cos(progress * Math.PI + phase) * amplitude +
      (index - 5.5) * 3.1;
    const d = `M${start.x.toFixed(2)},${(start.y + (index - 5.5) * 1.1).toFixed(2)} C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${end.x.toFixed(2)},${(end.y - (index - 5.5) * 1).toFixed(2)}`;

    return {
      id: `dash-${index}`,
      d,
      kind: "dash" as const,
      strokeWidth: 0.7 + (index % 4) * 0.18,
      breakX: (pseudoRandom(index + 821) - 0.5) * 48,
      breakY: -14 - pseudoRandom(index + 941) * 36,
    };
  });

  return dashedPaths;
}

function OpeningBand() {
  const { t } = useLocale();

  return (
    <section className="opening-band" aria-labelledby="average-title">
      <div className="page-shell opening-grid">
        <div>
          <p className="section-kicker">{t.opening.kicker}</p>
          <h2 id="average-title">{t.opening.title}</h2>
        </div>
        <div className="average-lines">
          {t.opening.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p className="average-reveal">
            {t.opening.reveal} <strong>{t.opening.revealStrong}</strong>
          </p>
        </div>
      </div>
    </section>
  );
}

function ScaleMachine({ bundle }: { bundle?: DatasetBundle }) {
  const [mode, setMode] = useState<ScaleMode>("linear");
  const chartEntryRef = useLinearModeOnViewportEntry<HTMLDivElement>(
    setMode,
    bundle?.story.id ?? "machine-empty",
  );
  const { language, t } = useLocale();
  const fit = bundle ? regressionForMode(bundle.points, mode) : null;
  const insight = bundle ? buildScaleInsight(bundle, mode, t, language, fit ?? undefined) : null;

  return (
    <section className="machine-section story-screen" id="machine" aria-labelledby="machine-title">
      <div className="page-shell">
        <header className="section-heading machine-heading">
          <p className="section-index">{t.machine.index}</p>
          <h2 id="machine-title">{t.machine.title}</h2>
          <p>{t.machine.body}</p>
        </header>

        <div className="machine-layout">
          <div className="chart-stage" ref={chartEntryRef}>
            {bundle ? (
              <DeferredChart bundle={bundle} mode={mode} showFit={mode !== "linear"} />
            ) : (
              <div className="chart-empty">{t.machine.noDataset}</div>
            )}
          </div>
          <div className="machine-controls">
            <ScaleToggle mode={mode} onChange={setMode} />
            {insight ? (
              <div className="machine-insight" key={`${bundle?.story.id}-${mode}`}>
                <span>{t.scaleInsight.activeScale} / {t.scaleModes[mode].label}</span>
                <strong>{insight.title}</strong>
                <p>{insight.body}</p>
                <em>{insight.metric}</em>
              </div>
            ) : null}
            {fit ? (
              <div className="fit-note">
                <span>{t.machine.visualStraightness}</span>
                <strong>{formatScore(fit.r2)}</strong>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function EvidenceGroupSection({
  group,
  bundleMap,
}: {
  group: EvidenceGroup;
  bundleMap: Map<string, DatasetBundle>;
}) {
  const { t } = useLocale();
  const [activeDatasetId, setActiveDatasetId] = useState(group.defaultDatasetId);
  const groupCopy = t.evidenceGroups[group.id];
  const bundles = group.datasetIds
    .map((datasetId) => bundleMap.get(datasetId))
    .filter((bundle): bundle is DatasetBundle => Boolean(bundle));
  const activeBundle =
    bundles.find((bundle) => bundle.story.id === activeDatasetId) ??
    bundles[0];

  if (!activeBundle) {
    return null;
  }

  return (
    <section
      className="chapter-section story-screen"
      id={`evidence-${group.id}`}
      aria-labelledby={`${group.id}-title`}
    >
      <div className="page-shell">
        <header className="section-heading chapter-heading">
          <p className="section-index">{group.index} / {t.nav.chapters}</p>
          <h2 id={`${group.id}-title`}>{groupCopy.title}</h2>
          <p className="chapter-intro">{groupCopy.intro}</p>
          {bundles.length > 1 ? (
            <EvidenceDatasetSwitcher
              group={group}
              bundles={bundles}
              activeDatasetId={activeBundle.story.id}
              onChange={setActiveDatasetId}
            />
          ) : null}
        </header>

        <FeaturePanel
          key={activeBundle.story.id}
          bundle={activeBundle}
        />
      </div>
    </section>
  );
}

function FeaturePanel({
  bundle,
}: {
  bundle: DatasetBundle;
}) {
  const [mode, setMode] = useState<ScaleMode>("linear");
  const chartEntryRef = useLinearModeOnViewportEntry<HTMLDivElement>(
    setMode,
    bundle.story.id,
  );
  const { language, t } = useLocale();
  const fit = regressionForMode(bundle.points, mode);
  const story = localizeStory(bundle, t);
  const insight = buildScaleInsight(bundle, mode, t, language, fit);
  const span = Math.log10(bundle.dataset.stats.max / bundle.dataset.stats.min);

  return (
    <article className="feature-panel">
      <div className="feature-copy">
        <h3>{localizeDatasetTitle(bundle, t)}</h3>
        <p className="feature-hook">{story.hook}</p>
        <div className="meaning-panel" key={`${bundle.story.id}-${mode}`}>
          <span>{t.scaleInsight.activeScale} / {t.scaleModes[mode].label}</span>
          <strong>{insight.title}</strong>
          <p>{insight.body}</p>
          <em>{insight.metric}</em>
        </div>
        <details className="evidence-drawer">
          <summary>{t.feature.evidence}</summary>
          <div className="stat-grid">
            <Stat label={t.feature.observations} value={formatInteger(bundle.dataset.stats.count, language)} />
            <Stat label={t.feature.maximum} value={formatValue(bundle.dataset.stats.max, bundle.dataset.unit, t, language)} />
            <Stat label={t.feature.mean} value={formatValue(bundle.dataset.stats.mean, bundle.dataset.unit, t, language)} />
            <Stat label={t.feature.ordersOfRange} value={Number.isFinite(span) ? span.toFixed(1) : "n/a"} />
          </div>
          <TopItems bundle={bundle} />
        </details>
      </div>
      <div className="feature-chart-column" ref={chartEntryRef}>
        <div className="feature-toolbar">
          <ScaleToggle mode={mode} onChange={setMode} />
          <span>
            {t.scaleModes[mode].question} / {t.feature.score} {formatScore(fit.r2)}
          </span>
        </div>
        <div className="chart-stage feature-chart">
          <DeferredChart bundle={bundle} mode={mode} showFit={mode !== "linear"} />
        </div>
        <p className="chart-source-note">
          <strong>{t.scaleInsight.sourceNote}:</strong> {story.detail}
        </p>
      </div>
    </article>
  );
}

function EvidenceDatasetSwitcher({
  group,
  bundles,
  activeDatasetId,
  onChange,
}: {
  group: EvidenceGroup;
  bundles: DatasetBundle[];
  activeDatasetId: string;
  onChange: (datasetId: string) => void;
}) {
  const { t } = useLocale();

  return (
    <div
      className="evidence-dataset-switcher"
      aria-label={t.evidenceGroups[group.id].switcherLabel}
    >
      {bundles.map((bundle) => (
        <button
          type="button"
          key={bundle.story.id}
          aria-pressed={activeDatasetId === bundle.story.id}
          onClick={() => onChange(bundle.story.id)}
        >
          {localizeDatasetTitle(bundle, t)}
        </button>
      ))}
    </div>
  );
}

function ScaleAtlas({ bundles }: { bundles: DatasetBundle[] }) {
  const [chapterFilter, setChapterFilter] = useState<"all" | string>("all");
  const [mode, setMode] = useState<ScaleMode>("linear");
  const chartEntryRef = useLinearModeOnViewportEntry<HTMLDivElement>(
    setMode,
    `atlas-${chapterFilter}`,
  );
  const { t } = useLocale();
  const visibleBundles = bundles.filter((bundle) =>
    chapterFilter === "all" ? true : bundle.story.chapter === chapterFilter,
  );

  return (
    <section className="atlas-section story-screen" id="atlas" aria-labelledby="atlas-title">
      <div className="page-shell">
        <header className="section-heading">
          <p className="section-index">{t.atlas.index}</p>
          <h2 id="atlas-title">{t.atlas.title}</h2>
          <p>{t.atlas.body}</p>
        </header>
        <div className="atlas-toolbar">
          <div className="chapter-filter" aria-label={t.atlas.filterLabel}>
            <button
              type="button"
              aria-pressed={chapterFilter === "all"}
              onClick={() => setChapterFilter("all")}
            >
              {t.atlas.all}
            </button>
            {chapters.map((chapter) => (
              <button
                type="button"
                key={chapter.id}
                aria-pressed={chapterFilter === chapter.id}
                onClick={() => setChapterFilter(chapter.id)}
              >
                {t.chapters[chapter.id].title.split(" ")[0]}
              </button>
            ))}
          </div>
          <ScaleToggle mode={mode} onChange={setMode} />
        </div>
        <div className="atlas-stage" ref={chartEntryRef}>
          <div className="atlas-count">
            <Layers size={22} />
            <strong>{visibleBundles.length}</strong>
            <span>{chapterFilter === "all" ? t.atlas.datasetsInView : t.atlas.datasetsInChapter}</span>
          </div>
          <div className="atlas-grid">
            {visibleBundles.map((bundle) => (
              <AtlasCard key={bundle.story.id} bundle={bundle} mode={mode} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AtlasCard({
  bundle,
  mode,
}: {
  bundle: DatasetBundle;
  mode: ScaleMode;
}) {
  const { t } = useLocale();
  const fit = regressionForMode(bundle.points, mode);

  return (
    <article className="atlas-card">
      <div className="mini-chart">
        <DeferredChart bundle={bundle} mode={mode} compact noGrid />
      </div>
      <div>
        <p>{localizeCategory(bundle.dataset.category, t)}</p>
        <h3>{localizeDatasetTitle(bundle, t)}</h3>
        <span>{formatScore(fit.r2)} {t.atlas.visualStraightness}</span>
      </div>
    </article>
  );
}

function ComparisonWall({ bundles }: { bundles: DatasetBundle[] }) {
  const [mode, setMode] = useState<ScaleMode>("linear");
  const [open, setOpen] = useState(false);
  const chartEntryRef = useLinearModeOnViewportEntry<HTMLDivElement>(
    setMode,
    `comparison-${open ? "open" : "closed"}`,
  );
  const { t } = useLocale();

  return (
    <section className="comparison-section" id="comparison" aria-labelledby="comparison-title">
      <div className="page-shell">
        <details
          className="comparison-drawer"
          open={open}
          onToggle={(event) => setOpen(event.currentTarget.open)}
        >
          <summary>
            <span>{t.comparison.index}</span>
            <strong id="comparison-title">{t.comparison.openWall}</strong>
            <small>{t.comparison.body}</small>
          </summary>
          {open ? (
            <>
              <div className="comparison-toolbar">
                <ScaleToggle mode={mode} onChange={setMode} />
                <p>{t.comparison.showingPrefix} {t.scaleModes[mode].summary.toLowerCase()}</p>
              </div>
              <div className="comparison-grid" ref={chartEntryRef}>
                {bundles.map((bundle) => {
                  const fit = regressionForMode(bundle.points, mode);
                  return (
                    <article className="comparison-card" key={bundle.story.id}>
                      <div className="mini-chart">
                        <DeferredChart bundle={bundle} mode={mode} compact noGrid />
                      </div>
                      <div>
                        <span>{localizeDatasetTitle(bundle, t)}</span>
                        <strong>{formatScore(fit.r2)}</strong>
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          ) : null}
        </details>
      </div>
    </section>
  );
}

function CautionSection({
  bundleMap,
}: {
  bundleMap: Map<string, DatasetBundle>;
}) {
  const { t } = useLocale();

  return (
    <section className="caution-section" id="caution" aria-labelledby="caution-title">
      <div className="page-shell">
        <header className="section-heading caution-heading">
          <p className="section-index">{t.caution.index}</p>
          <h2 id="caution-title">{t.caution.title}</h2>
          <p>{t.caution.body}</p>
        </header>
        <div className="caution-grid">
          {cautionStories.map((item) => {
            const bundle = bundleMap.get(item.id);
            if (!bundle) {
              return null;
            }
            const caution = t.cautions[item.id] ?? item;
            return (
              <article className="caution-card" key={item.id}>
                <p>{caution.badge}</p>
                <h3>{localizeDatasetTitle(bundle, t)}</h3>
                <span>{caution.text}</span>
                <div className="caution-charts">
                  <div>
                    <div className="caution-chart-label">
                      <span>{t.scaleModes.linear.label}</span>
                      <strong>
                        {formatScore(regressionForMode(bundle.points, "linear").r2)}
                      </strong>
                    </div>
                    <div className="mini-chart">
                      <DeferredChart bundle={bundle} mode="linear" compact noGrid />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <aside className="method-note">
          <p className="section-kicker">{t.caution.readCarefully}</p>
          <p>{t.caution.note}</p>
        </aside>
      </div>
    </section>
  );
}

function SourcesSection({ bundles }: { bundles: DatasetBundle[] }) {
  const { t } = useLocale();

  return (
    <section className="sources-section" id="sources" aria-labelledby="sources-title">
      <div className="page-shell sources-layout">
        <header className="section-heading sources-heading">
          <p className="section-index">{t.sources.index}</p>
          <h2 id="sources-title">{t.sources.title}</h2>
          <p>{t.sources.body}</p>
        </header>
        <div className="source-list">
          {bundles.map((bundle) => (
            <a
              key={bundle.story.id}
              className="source-row"
              href={bundle.dataset.sourceUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span className="source-row-copy">
                <strong>{localizeDatasetTitle(bundle, t)}</strong>
                <small>{bundle.dataset.sourceName}</small>
                <cite className="source-apa">
                  <span>{t.sources.apaReference}</span>
                  {bundle.dataset.sourceName}. (n.d.).{" "}
                  <em>{bundle.dataset.title}</em> [Data set].{" "}
                  {formatApaRetrieval(bundle.dataset.retrievedAt)} from{" "}
                  {bundle.dataset.sourceUrl}
                </cite>
              </span>
              <ExternalLink size={16} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingSection() {
  const { t } = useLocale();

  return (
    <section className="closing-section" aria-labelledby="closing-title">
      <div className="page-shell closing-inner">
        <p className="section-kicker">{t.closing.kicker}</p>
        <h2 id="closing-title">{t.closing.title}</h2>
        <p className="closing-copy">{t.closing.copy}</p>
        <div className="closing-sequence" aria-label="What each scale reveals">
          {allModes.map((mode) => (
            <p key={mode}>
              <span>{t.scaleModes[mode].label}</span> {t.closing.sequence[mode]}
            </p>
          ))}
        </div>
        <p className="closing-final">
          {t.closing.finalA}
          <br />
          <strong>{t.closing.finalB}</strong>
        </p>
        <a className="return-link" href="#top">
          {t.closing.restart}
        </a>
      </div>
    </section>
  );
}

function SiteFooter() {
  const { t } = useLocale();

  return (
    <footer className="site-footer">
      <div className="page-shell">
        <p>{t.nav.brand}</p>
        <p>{t.footer.built}</p>
        <a href="#sources">{t.sources.dataAndCitations}</a>
      </div>
    </footer>
  );
}

function ScaleToggle({
  mode,
  onChange,
  compact = false,
  modes = allModes,
  ariaLabel,
}: {
  mode: ScaleMode;
  onChange: (mode: ScaleMode) => void;
  compact?: boolean;
  modes?: ScaleMode[];
  ariaLabel?: string;
}) {
  const { t } = useLocale();

  return (
    <div
      className={compact ? "scale-toggle scale-toggle--compact" : "scale-toggle"}
      aria-label={ariaLabel}
    >
      {modes.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          aria-pressed={mode === item}
        >
          {compact ? t.scaleModes[item].shortLabel : t.scaleModes[item].label}
        </button>
      ))}
    </div>
  );
}

function DeferredChart(props: {
  bundle: DatasetBundle;
  mode: ScaleMode;
  compact?: boolean;
  hero?: boolean;
  noGrid?: boolean;
  showFit?: boolean;
  eager?: boolean;
}) {
  const [chartRef, shouldRender] = useRenderWhenNearViewport<HTMLDivElement>(
    props.compact ? "520px" : "760px",
  );
  const renderChart = props.eager || shouldRender;
  const className = props.hero
    ? "deferred-chart deferred-chart--hero"
    : props.compact
      ? "deferred-chart deferred-chart--compact"
      : "deferred-chart";

  return (
    <div className={className} ref={chartRef}>
      {renderChart ? <Chart {...props} /> : <ChartPlaceholder {...props} />}
    </div>
  );
}

function ChartPlaceholder({
  compact = false,
  hero = false,
}: {
  compact?: boolean;
  hero?: boolean;
}) {
  const className = hero
    ? "chart chart--hero chart-placeholder"
    : compact
      ? "chart chart--compact chart-placeholder"
      : "chart chart-placeholder";

  return (
    <div className={className} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

function Chart({
  bundle,
  mode,
  compact = false,
  hero = false,
  noGrid = false,
  showFit = false,
}: {
  bundle: DatasetBundle;
  mode: ScaleMode;
  compact?: boolean;
  hero?: boolean;
  noGrid?: boolean;
  showFit?: boolean;
}) {
  const [tooltip, setTooltip] = useState<TooltipState>(null);
  const { language, t } = useLocale();
  const width = compact ? 360 : 820;
  const height = compact ? 220 : hero ? 500 : 460;
  const margin = compact
    ? { top: 18, right: 18, bottom: 24, left: 30 }
    : { top: 34, right: 34, bottom: 58, left: 78 };

  const chart = useMemo(() => {
    const transformed = transformPoints(bundle.points, mode);
    const ordered =
      mode === "tail" ? [...transformed].sort((a, b) => a.x - b.x) : transformed;
    const xDomain = chartDomain(mode, "x", ordered.map((point) => point.x), 0.025);
    const yDomain = chartDomain(mode, "y", ordered.map((point) => point.y), 0.06);
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = (value: number) =>
      margin.left +
      ((value - xDomain[0]) / Math.max(xDomain[1] - xDomain[0], Number.EPSILON)) *
        innerWidth;
    const yScale = (value: number) =>
      margin.top +
      innerHeight -
      ((value - yDomain[0]) / Math.max(yDomain[1] - yDomain[0], Number.EPSILON)) *
        innerHeight;

    const path = ordered
      .map(
        (point, index) =>
          `${index === 0 ? "M" : "L"}${xScale(point.x).toFixed(2)},${yScale(point.y).toFixed(2)}`,
      )
      .join(" ");

    const dotStep = Math.max(1, Math.ceil(ordered.length / (compact ? 42 : 140)));
    const dots = ordered.filter((_, index) => index % dotStep === 0);
    const xTicks = ticks(xDomain[0], xDomain[1], compact ? 3 : 5);
    const yTicks = ticks(yDomain[0], yDomain[1], compact ? 3 : 5);
    const fit = regression(ordered);

    return {
      ordered,
      xDomain,
      yDomain,
      xScale,
      yScale,
      path,
      dots,
      xTicks,
      yTicks,
      fit,
    };
  }, [bundle.points, compact, height, margin.bottom, margin.left, margin.right, margin.top, mode, width]);

  const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
    if (compact) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const viewX = ((event.clientX - rect.left) / rect.width) * width;
    let nearest = chart.ordered[0];
    let nearestDistance = Number.POSITIVE_INFINITY;

    for (const point of chart.ordered) {
      const distance = Math.abs(chart.xScale(point.x) - viewX);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = point;
      }
    }

    setTooltip({
      left: Math.min(Math.max(event.clientX - rect.left + 14, 10), rect.width - 210),
      top: Math.max(event.clientY - rect.top - 74, 10),
      point: nearest.raw,
    });
  };

  const fitLine =
    showFit && Number.isFinite(chart.fit.slope) ? (
      <line
        className="fit-line"
        x1={chart.xScale(chart.xDomain[0])}
        y1={chart.yScale(chart.fit.intercept + chart.fit.slope * chart.xDomain[0])}
        x2={chart.xScale(chart.xDomain[1])}
        y2={chart.yScale(chart.fit.intercept + chart.fit.slope * chart.xDomain[1])}
      />
    ) : null;

  return (
    <div className={hero ? "chart chart--hero" : compact ? "chart chart--compact" : "chart"}>
      <svg
        className="chart-svg"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`${localizeDatasetTitle(bundle, t)}, ${t.scaleModes[mode].label}`}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setTooltip(null)}
      >
        {!noGrid
          ? chart.xTicks.map((tick) => (
              <line
                key={`x-${tick}`}
                className="grid-line"
                x1={chart.xScale(tick)}
                y1={margin.top}
                x2={chart.xScale(tick)}
                y2={height - margin.bottom}
              />
            ))
          : null}
        {!noGrid
          ? chart.yTicks.map((tick) => (
              <line
                key={`y-${tick}`}
                className="grid-line"
                x1={margin.left}
                y1={chart.yScale(tick)}
                x2={width - margin.right}
                y2={chart.yScale(tick)}
              />
            ))
          : null}
        <path className="data-area" d={`${chart.path} L${width - margin.right},${height - margin.bottom} L${margin.left},${height - margin.bottom} Z`} />
        <path className="data-line" d={chart.path} pathLength={1} />
        {fitLine}
        {chart.dots.map((point) => (
          <circle
            key={`${point.raw.rank}-${point.raw.value}`}
            className="data-dot"
            cx={chart.xScale(point.x)}
            cy={chart.yScale(point.y)}
            r={compact ? 1.6 : 2.2}
          />
        ))}
        {!compact
          ? chart.xTicks.map((tick) => (
              <text
                key={`xl-${tick}`}
                className="tick-label"
                x={chart.xScale(tick)}
                y={height - 22}
                textAnchor="middle"
              >
                {formatTick(tick, mode, "x", language)}
              </text>
            ))
          : null}
        {!compact
          ? chart.yTicks.map((tick) => (
              <text
                key={`yl-${tick}`}
                className="tick-label"
                x={margin.left - 12}
                y={chart.yScale(tick) + 4}
                textAnchor="end"
              >
                {formatTick(tick, mode, "y", language)}
              </text>
            ))
          : null}
        {!compact ? (
          <>
            <text className="axis-title" x={width / 2} y={height - 6} textAnchor="middle">
              {axisTitle(bundle.dataset, mode, "x", t)}
            </text>
            <text
              className="axis-title"
              x={-height / 2}
              y={22}
              textAnchor="middle"
              transform="rotate(-90)"
            >
              {axisTitle(bundle.dataset, mode, "y", t)}
            </text>
          </>
        ) : null}
      </svg>
      {tooltip ? (
        <div
          className="chart-tooltip"
          style={{ left: tooltip.left, top: tooltip.top }}
        >
          <strong>{localizeDatasetTitle(bundle, t)}</strong>
          <span>
            {mode === "tail"
              ? `${t.chart.atLeast} `
              : `${t.chart.rank} ${formatInteger(tooltip.point.rank, language)}: `}
            {formatValue(tooltip.point.value, bundle.dataset.unit, t, language)}
          </span>
          <span>{t.chart.tailProbability} {formatPercent(tooltip.point.ccdf, language)}</span>
        </div>
      ) : null}
    </div>
  );
}

function TopItems({ bundle }: { bundle: DatasetBundle }) {
  const { language, t } = useLocale();

  return (
    <div className="top-items">
      <p>{t.feature.largestObservations}</p>
      {bundle.dataset.topItems.slice(0, 5).map((item, index) => (
        <div key={`${item.label}-${index}`}>
          <span>{String(item.label ?? `Item ${index + 1}`)}</span>
          <strong>{formatValue(Number(item.value), bundle.dataset.unit, t, language)}</strong>
        </div>
      ))}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function transformPoints(points: RankPoint[], mode: ScaleMode) {
  return points
    .map((point) => {
      const rank = Number(point.rank);
      const value = Number(point.value);
      const ccdf = Number(point.ccdf);
      let x = rank;
      let y = value;

      if (mode === "log") {
        y = safeLog(value);
      } else if (mode === "loglog") {
        x = safeLog(rank);
        y = safeLog(value);
      } else if (mode === "tail") {
        x = safeLog(value);
        y = safeLog(ccdf);
      }

      return { x, y, raw: point };
    })
    .filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y));
}

function buildScaleInsight(
  bundle: DatasetBundle,
  mode: ScaleMode,
  t: Translation,
  language: Language,
  fit = regressionForMode(bundle.points, mode),
) {
  const topItem = bundle.dataset.topItems[0];
  const topLabel = String(topItem?.label ?? localizeDatasetTitle(bundle, t));
  const topValue = Number(topItem?.value ?? bundle.dataset.stats.max);
  const safeMean = Math.max(bundle.dataset.stats.mean, Number.EPSILON);
  const positiveValues = bundle.points
    .map((point) => point.value)
    .filter((value) => value > 0);
  const minPositive = positiveValues.length > 0 ? Math.min(...positiveValues) : 1;
  const maxPositive = Math.max(bundle.dataset.stats.max, minPositive);
  const tailPoint =
    bundle.points[Math.min(bundle.points.length - 1, Math.max(0, Math.floor(bundle.points.length * 0.05)))] ??
    bundle.points[bundle.points.length - 1];
  const template = t.scaleInsight.templates[mode];
  const variables = {
    topLabel,
    topValue: formatValue(topValue, bundle.dataset.unit, t, language),
    multiple: formatRatio(topValue / safeMean, language),
    orders: formatRatio(Math.log10(maxPositive / minPositive), language),
    score: formatScore(fit.r2),
    threshold: formatValue(tailPoint?.value ?? bundle.dataset.stats.max, bundle.dataset.unit, t, language),
    probability: formatPercent(tailPoint?.ccdf ?? 0, language),
  };

  return {
    title: template.title,
    body: renderTemplate(template.body, variables),
    metric: renderTemplate(template.metric, variables),
  };
}

function renderTemplate(template: string, variables: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => variables[key] ?? match);
}

function createPath(points: HeroVisualPoint[]) {
  return points
    .map((point, index) =>
      `${index === 0 ? "M" : "L"}${point.x.toFixed(2)},${point.y.toFixed(2)}`,
    )
    .join(" ");
}

function downsample<T>(items: T[], targetLength: number) {
  if (items.length <= targetLength) {
    return items;
  }

  return Array.from({ length: targetLength }, (_, index) => {
    const sourceIndex = Math.round((index / Math.max(targetLength - 1, 1)) * (items.length - 1));
    return items[sourceIndex];
  });
}

function normalize(value: number, [min, max]: [number, number]) {
  return (value - min) / Math.max(max - min, Number.EPSILON);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function pseudoRandom(seed: number) {
  let value = Math.trunc(seed) ^ 0x9e3779b9;
  value = Math.imul(value ^ (value >>> 16), 0x85ebca6b);
  value = Math.imul(value ^ (value >>> 13), 0xc2b2ae35);
  value ^= value >>> 16;
  return (value >>> 0) / 4294967296;
}

function safeLog(value: number) {
  return value > 0 ? Math.log10(value) : Number.NaN;
}

function extent(values: number[]): [number, number] {
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;

  for (const value of values) {
    if (value < min) min = value;
    if (value > max) max = value;
  }

  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    return [0, 1];
  }

  if (min === max) {
    return [min - 1, max + 1];
  }

  return [min, max];
}

function padExtent([min, max]: [number, number], ratio: number): [number, number] {
  const pad = Math.max((max - min) * ratio, Number.EPSILON);
  return [min - pad, max + pad];
}

function chartDomain(
  mode: ScaleMode,
  axis: "x" | "y",
  values: number[],
  paddingRatio: number,
): [number, number] {
  const rawDomain = extent(values);
  const paddedDomain = padExtent(rawDomain, paddingRatio);

  if (axis === "x" && (mode === "linear" || mode === "log")) {
    return [Math.max(1, rawDomain[0]), rawDomain[1]];
  }

  if (axis === "y" && mode === "linear") {
    return [Math.min(0, rawDomain[0]), rawDomain[1]];
  }

  if (axis === "x" && mode === "loglog") {
    return [Math.max(0, rawDomain[0]), rawDomain[1]];
  }

  if (mode === "tail") {
    if (axis === "x") {
      return rawDomain;
    }

    return [rawDomain[0], 0];
  }

  if (axis === "y" && (mode === "log" || mode === "loglog")) {
    return rawDomain;
  }

  return paddedDomain;
}

function ticks(min: number, max: number, count: number) {
  if (count <= 1) {
    return [min];
  }

  return Array.from({ length: count }, (_, index) => {
    const t = index / (count - 1);
    return min + (max - min) * t;
  });
}

function regressionForMode(points: RankPoint[], mode: ScaleMode) {
  return regression(transformPoints(points, mode));
}

function regression(points: TransformedPoint[]) {
  if (points.length < 2) {
    return { slope: 0, intercept: 0, r2: 0 };
  }

  const meanX = points.reduce((sum, point) => sum + point.x, 0) / points.length;
  const meanY = points.reduce((sum, point) => sum + point.y, 0) / points.length;
  let covariance = 0;
  let varianceX = 0;
  let varianceY = 0;

  for (const point of points) {
    const dx = point.x - meanX;
    const dy = point.y - meanY;
    covariance += dx * dy;
    varianceX += dx * dx;
    varianceY += dy * dy;
  }

  const slope = varianceX ? covariance / varianceX : 0;
  const intercept = meanY - slope * meanX;
  const r2 =
    varianceX && varianceY ? (covariance * covariance) / (varianceX * varianceY) : 0;

  return { slope, intercept, r2 };
}

function axisTitle(
  dataset: DatasetDoc,
  mode: ScaleMode,
  axis: "x" | "y",
  t: Translation,
) {
  if (mode === "tail") {
    return axis === "x"
      ? renderTemplate(t.chart.tailThreshold, {
          unit: localizeUnit(dataset.unit, t),
        })
      : t.chart.tailProbability;
  }

  if (axis === "x") {
    return mode === "loglog" ? t.chart.logRank : t.chart.rawRank;
  }

  return mode === "linear"
    ? localizeUnit(dataset.unit, t)
    : `${localizeUnit(dataset.unit, t)}, ${t.chart.logValue}`;
}

function formatTick(value: number, mode: ScaleMode, axis: "x" | "y", language: Language) {
  if (mode === "tail") {
    return axis === "x"
      ? formatCompact(10 ** value, language)
      : formatPercent(10 ** value, language);
  }

  if ((axis === "x" && mode === "loglog") || (axis === "y" && mode !== "linear")) {
    return formatCompact(10 ** value, language);
  }

  return formatCompact(value, language);
}

function formatValue(
  value: number,
  unit: string,
  t: Translation,
  language: Language,
) {
  if (!Number.isFinite(value)) {
    return "n/a";
  }

  if (unit.toLowerCase().includes("dollar")) {
    return `$${formatCompact(value, language)}`;
  }

  if (unit === "percent") {
    return `${formatCompact(value, language)}%`;
  }

  return `${formatCompact(value, language)} ${localizeUnit(unit, t)}`;
}

function formatCompact(value: number, language: Language) {
  return new Intl.NumberFormat(languageLocales[language], {
    notation: "compact",
    maximumFractionDigits: value < 10 ? 2 : 1,
  }).format(value);
}

function formatApaRetrieval(retrievedAt: string) {
  const date = new Date(retrievedAt);

  if (Number.isNaN(date.getTime())) {
    return "Retrieved";
  }

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);

  return `Retrieved ${formattedDate},`;
}

function formatRatio(value: number, language: Language) {
  if (!Number.isFinite(value)) {
    return "n/a";
  }

  return new Intl.NumberFormat(languageLocales[language], {
    notation: value >= 10_000 ? "compact" : "standard",
    maximumFractionDigits: value < 10 ? 1 : 0,
  }).format(value);
}

function formatInteger(value: number, language: Language) {
  return new Intl.NumberFormat(languageLocales[language]).format(value);
}

function formatPercent(value: number, language: Language) {
  return new Intl.NumberFormat(languageLocales[language], {
    style: "percent",
    maximumSignificantDigits: 3,
  }).format(value);
}

function formatScore(value: number) {
  return `${Math.round(value * 100)}%`;
}

function localizeDatasetTitle(bundle: DatasetBundle, t: Translation) {
  return t.datasetTitles[bundle.story.id] ?? bundle.dataset.title;
}

function localizeStory(bundle: DatasetBundle, t: Translation) {
  return t.stories[bundle.story.id] ?? bundle.story;
}

function localizeCategory(category: string, t: Translation) {
  return t.categories[category] ?? category;
}

function localizeUnit(unit: string, t: Translation) {
  return t.units[unit] ?? unit;
}
