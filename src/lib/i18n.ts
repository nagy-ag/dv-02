import type { ChapterId, EvidenceGroupId, ScaleMode } from "@/lib/story";

export type Language = "en" | "hu" | "ro";

type ModeCopy = {
  label: string;
  shortLabel: string;
  question: string;
  summary: string;
};

type ChapterCopy = {
  title: string;
  intro: string;
};

type StoryCopy = {
  hook: string;
  detail: string;
};

type EvidenceGroupCopy = {
  title: string;
  intro: string;
  switcherLabel: string;
};

type CautionCopy = {
  badge: string;
  text: string;
};

type ScaleInsightTemplate = {
  title: string;
  body: string;
  metric: string;
};

export type Translation = {
  languageName: string;
  nav: {
    brand: string;
    story: string;
    button: string;
    chapters: string;
    atlas: string;
    compare: string;
    sources: string;
    caution: string;
    open: string;
    openNavigation: string;
    closeNavigation: string;
    skip: string;
    language: string;
    theme: string;
  };
  loading: {
    title: string;
    detail: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    thesis: string;
    subtitle: string;
    datasets: string;
    datasetsDetail: string;
    scaleViews: string;
    scaleViewsDetail: string;
    sourceObservations: string;
    chapters: string;
    cta: string;
    modePickerLabel: string;
  };
  opening: {
    kicker: string;
    title: string;
    lines: string[];
    reveal: string;
    revealStrong: string;
  };
  machine: {
    index: string;
    title: string;
    body: string;
    visualStraightness: string;
    noDataset: string;
  };
  feature: {
    label: string;
    meaningPrefix: string;
    score: string;
    evidence: string;
    observations: string;
    maximum: string;
    mean: string;
    ordersOfRange: string;
    largestObservations: string;
  };
  scaleInsight: {
    activeScale: string;
    sourceNote: string;
    templates: Record<ScaleMode, ScaleInsightTemplate>;
  };
  atlas: {
    index: string;
    title: string;
    body: string;
    all: string;
    datasetsInView: string;
    datasetsInChapter: string;
    visualStraightness: string;
    filterLabel: string;
  };
  comparison: {
    index: string;
    title: string;
    body: string;
    showingPrefix: string;
    openWall: string;
  };
  caution: {
    index: string;
    title: string;
    body: string;
    readCarefully: string;
    note: string;
  };
  sources: {
    index: string;
    title: string;
    body: string;
    apaReference: string;
    dataAndCitations: string;
  };
  closing: {
    kicker: string;
    title: string;
    copy: string;
    sequence: Record<ScaleMode, string>;
    finalA: string;
    finalB: string;
    restart: string;
  };
  footer: {
    built: string;
  };
  chart: {
    linearSide: string;
    transformedSide: string;
    frequency: string;
    rank: string;
    value: string;
    rawRank: string;
    logRank: string;
    logValue: string;
    tailThreshold: string;
    tailProbability: string;
    atLeast: string;
  };
  scaleModes: Record<ScaleMode, ModeCopy>;
  chapters: Record<ChapterId, ChapterCopy>;
  evidenceGroups: Record<EvidenceGroupId, EvidenceGroupCopy>;
  stories: Record<string, StoryCopy>;
  cautions: Record<string, CautionCopy>;
  datasetTitles: Record<string, string>;
  categories: Record<string, string>;
  units: Record<string, string>;
};

export const languageOptions: Array<{
  code: Language;
  label: string;
  shortLabel: string;
}> = [
  { code: "en", label: "English", shortLabel: "EN" },
  { code: "hu", label: "Magyar", shortLabel: "HU" },
  { code: "ro", label: "Română", shortLabel: "RO" },
];

const datasetTitlesEn = {
  "bank-assets-fdic": "Bank Assets",
  "body-size-pantheria": "Body Sizes",
  "citations-openalex-2020-top": "Scientific Citations",
  "city-populations-geonames": "City Populations",
  "conflict-fatalities-ucdp-ged-26-1": "Conflict Fatalities",
  "country-gdp-worldbank-2024": "Country GDP",
  "debt-securities-bis-2025q4": "Debt Securities",
  "earthquakes-usgs-2025": "Earthquakes",
  "exoplanets-nasa-orbital-periods": "Exoplanets",
  "firm-assets-sec-2026q1": "Firm Size",
  "flight-delays-bts-2025-01": "Flight Delays",
  "household-assets-scf-2022": "Household Assets",
  "household-debt-scf-2022": "Household Debt",
  "household-income-scf-2022": "Household Income",
  "household-net-worth-scf-2022": "Household Net Worth",
  "open-source-downloads-pypi-2025-12": "Open-Source Package Downloads",
  "pollution-openmeteo-nyc-2025": "Air Pollution Spikes",
  "social-network-snap-facebook": "Social Network Degrees",
  "species-observations-gbif-2025": "Species Observations",
  "storm-damage-noaa-2025": "Weather Disaster Damage",
  "taxi-trip-distances-nyc-tlc-2025-01": "Taxi Trip Distances",
  "transit-headways-mbta-gtfs": "Bus/Train Scheduled Headways",
  "us-market-absolute-returns-french": "Stock-Market Extreme Returns",
  "us-market-shock-waiting-times-french": "Waiting Times Between Stock Shocks",
  "wikipedia-pageviews-2025-12-31": "Wikipedia Pageviews",
  "wildfires-mtbs-1984-2024": "Wildfires",
  "word-frequency-gutenberg-moby-dick": "Word Frequencies",
};

const datasetTitlesHu = {
  "bank-assets-fdic": "Banki eszközök",
  "body-size-pantheria": "Testméretek",
  "citations-openalex-2020-top": "Tudományos hivatkozások",
  "city-populations-geonames": "Városok népessége",
  "conflict-fatalities-ucdp-ged-26-1": "Konfliktusok halálos áldozatai",
  "country-gdp-worldbank-2024": "Országok GDP-je",
  "debt-securities-bis-2025q4": "Adósságpapír-állomány",
  "earthquakes-usgs-2025": "Földrengések",
  "exoplanets-nasa-orbital-periods": "Exobolygók",
  "firm-assets-sec-2026q1": "Vállalatméret",
  "flight-delays-bts-2025-01": "Repülési késések",
  "household-assets-scf-2022": "Háztartási eszközök",
  "household-debt-scf-2022": "Háztartási adósság",
  "household-income-scf-2022": "Háztartási jövedelem",
  "household-net-worth-scf-2022": "Háztartási nettó vagyon",
  "open-source-downloads-pypi-2025-12": "Nyílt forrású csomagletöltések",
  "pollution-openmeteo-nyc-2025": "Légszennyezési kiugrások",
  "social-network-snap-facebook": "Közösségi hálózati fokszámok",
  "species-observations-gbif-2025": "Fajmegfigyelések",
  "storm-damage-noaa-2025": "Időjárási katasztrófakárok",
  "taxi-trip-distances-nyc-tlc-2025-01": "Taxitutak távolsága",
  "transit-headways-mbta-gtfs": "Busz- és vonatkövetési idők",
  "us-market-absolute-returns-french": "Tőzsdei szélsőséges hozamok",
  "us-market-shock-waiting-times-french": "Várakozás tőzsdei sokkok között",
  "wikipedia-pageviews-2025-12-31": "Wikipedia-oldalmegtekintések",
  "wildfires-mtbs-1984-2024": "Erdőtüzek",
  "word-frequency-gutenberg-moby-dick": "Szógyakoriságok",
};

const datasetTitlesRo = {
  "bank-assets-fdic": "Active bancare",
  "body-size-pantheria": "Dimensiuni corporale",
  "citations-openalex-2020-top": "Citări științifice",
  "city-populations-geonames": "Populații urbane",
  "conflict-fatalities-ucdp-ged-26-1": "Victime în conflicte",
  "country-gdp-worldbank-2024": "PIB pe țări",
  "debt-securities-bis-2025q4": "Titluri de datorie",
  "earthquakes-usgs-2025": "Cutremure",
  "exoplanets-nasa-orbital-periods": "Exoplanete",
  "firm-assets-sec-2026q1": "Dimensiunea firmelor",
  "flight-delays-bts-2025-01": "Întârzieri de zbor",
  "household-assets-scf-2022": "Activele gospodăriilor",
  "household-debt-scf-2022": "Datoriile gospodăriilor",
  "household-income-scf-2022": "Venitul gospodăriilor",
  "household-net-worth-scf-2022": "Averea netă a gospodăriilor",
  "open-source-downloads-pypi-2025-12": "Descărcări de pachete open-source",
  "pollution-openmeteo-nyc-2025": "Vârfuri de poluare",
  "social-network-snap-facebook": "Grade în rețele sociale",
  "species-observations-gbif-2025": "Observații de specii",
  "storm-damage-noaa-2025": "Pagube din fenomene meteo",
  "taxi-trip-distances-nyc-tlc-2025-01": "Distanțe curse taxi",
  "transit-headways-mbta-gtfs": "Intervale programate bus/tren",
  "us-market-absolute-returns-french": "Randamente bursiere extreme",
  "us-market-shock-waiting-times-french": "Timpi între șocuri bursiere",
  "wikipedia-pageviews-2025-12-31": "Vizualizări Wikipedia",
  "wildfires-mtbs-1984-2024": "Incendii de vegetație",
  "word-frequency-gutenberg-moby-dick": "Frecvențe de cuvinte",
};

const storiesEn: Record<string, StoryCopy> = {
  "transit-headways-mbta-gtfs": {
    hook: "A timetable looks orderly until you rank the gaps. Then the quiet promise of regular service starts to stretch.",
    detail: "Scheduled MBTA headways at the first stop. This is planned service, not observed passenger waiting time.",
  },
  "flight-delays-bts-2025-01": {
    hook: "Most late flights are ordinary annoyances. The tail is where a delay becomes the whole story of the day.",
    detail: "Positive arrival delays for US flights in January 2025. Tail height means the chance of a delay at least that long.",
  },
  "taxi-trip-distances-nyc-tlc-2025-01": {
    hook: "The city is mostly short hops. Airport runs and rare long rides pull a second story out of the same street grid.",
    detail: "More than 3.3 million valid yellow taxi trips from January 2025. The curve is heavy-tailed but not one clean law.",
  },
  "earthquakes-usgs-2025": {
    hook: "Small earthquakes fill the record. Energy does not. A small change in magnitude moves the world onto another scale.",
    detail: "Worldwide magnitude 2.5+ events in 2025. Relative energy is derived from reported magnitude.",
  },
  "us-market-absolute-returns-french": {
    hook: "On a normal axis, markets look disciplined. Change the scale and the calm becomes a long memory of shocks.",
    detail: "Absolute daily US market returns from the Kenneth French factors series. The chart shows magnitude, not direction.",
  },
  "wildfires-mtbs-1984-2024": {
    hook: "Many fires sit near the recording threshold. A few cross from incident into landscape-scale event.",
    detail: "MTBS large US wildfire and wildland-fire-use boundaries from 1984 through 2024.",
  },
  "storm-damage-noaa-2025": {
    hook: "Storm counts are democratic. Storm damage is not. Loss concentrates where the tail begins.",
    detail: "Reported US storm-event property plus crop damage for 2025. Zero and missing damage records are excluded.",
  },
  "pollution-openmeteo-nyc-2025": {
    hook: "The annual air can look acceptable while the bad hours do the harm. Here scale helps, but range stays limited.",
    detail: "Hourly New York City PM2.5 estimates for 2025. The limited range makes a log-log claim weak.",
  },
  "conflict-fatalities-ucdp-ged-26-1": {
    hook: "The count of events is not the count of lives. The distribution makes concentration visible without softening what it represents.",
    detail: "UCDP event-level best fatality estimates from 1989 through 2025. Zero-fatality records are omitted.",
  },
  "household-net-worth-scf-2022": {
    hook: "Wealth does not taper gently. The upper tail keeps walking after the ordinary household has disappeared from view.",
    detail: "Positive 2022 US household net worth from the Survey of Consumer Finances. Tail probabilities and means use survey weights.",
  },
  "household-income-scf-2022": {
    hook: "Income is unequal too, but it speaks in a shorter rhythm than accumulated wealth. The scale makes that difference visible.",
    detail: "Positive 2022 SCF income observations with survey-weighted tail probabilities.",
  },
  "household-assets-scf-2022": {
    hook: "Assets stretch from almost nothing to balance sheets that behave like another species of household.",
    detail: "Positive 2022 SCF household assets. Logarithmic views necessarily exclude zero and negative values.",
  },
  "household-debt-scf-2022": {
    hook: "Debt also concentrates, but its tail is not wealth in reverse. The shape tells a different financial story.",
    detail: "Positive 2022 SCF household debt with survey-weighted tail probabilities.",
  },
  "country-gdp-worldbank-2024": {
    hook: "Countries share one map, not one economic scale. A few economies carry a large share of the global output line.",
    detail: "Country GDP in current US dollars for 2024. World Bank aggregate regions are excluded.",
  },
  "firm-assets-sec-2026q1": {
    hook: "Public companies do not just get bigger. Their balance sheets move through regimes, from small filers to giants.",
    detail: "Total assets from annual-style filings in the SEC 2026 Q1 Financial Statement Data Set.",
  },
  "bank-assets-fdic": {
    hook: "Banking is a concentration machine. Most institutions are visible only after the giants stop setting the axis.",
    detail: "Total assets for active FDIC-insured institutions, converted from thousands to US dollars.",
  },
  "debt-securities-bis-2025q4": {
    hook: "Global debt markets look like a country list until scale reveals how few issuers dominate the outstanding stock.",
    detail: "Outstanding resident-issued debt securities for 39 countries in 2025 Q4.",
  },
  "city-populations-geonames": {
    hook: "A city is one word for many scales. Megacities and small places only coexist when the axis gives them room.",
    detail: "Population values from the GeoNames cities15000 database.",
  },
  "social-network-snap-facebook": {
    hook: "Most people have modest degree. A few become hubs, but the bend matters: connection is uneven, not magically scale-free.",
    detail: "Node degree calculated from the undirected SNAP Facebook combined edge list.",
  },
  "word-frequency-gutenberg-moby-dick": {
    hook: "A novel has thousands of words, but a small vocabulary carries the current. Log-log turns language into architecture.",
    detail: "Word counts from the Project Gutenberg plain-text edition of Moby-Dick. This is the classic rank-frequency reveal.",
  },
  "citations-openalex-2020-top": {
    hook: "Scientific attention has a skyline. A few works rise high enough to change the scale for everything below them.",
    detail: "The 1,000 most-cited OpenAlex works published in 2020. This is a top-ranked extract, not the full corpus.",
  },
  "wikipedia-pageviews-2025-12-31": {
    hook: "Millions of pages are available. On one day, attention chooses a very small number and gives them the whole stage.",
    detail: "The top 999 English Wikipedia articles by pageviews on December 31, 2025.",
  },
  "open-source-downloads-pypi-2025-12": {
    hook: "Open source looks broad from the outside. Download counts reveal how much modern software leans on a few quiet packages.",
    detail: "The top 100,000 PyPI package names by downloads in December 2025. Automated traffic may be included.",
  },
  "species-observations-gbif-2025": {
    hook: "Observation is not abundance. Some species dominate the database while many others barely leave a trace.",
    detail: "Top GBIF scientific-name occurrence counts for 2025. Records are not estimates of true population abundance.",
  },
  "body-size-pantheria": {
    hook: "Mammals share a class, not a body scale. A mouse and a whale need a logarithm before they can share a chart.",
    detail: "Adult body mass from the PanTHERIA mammal life-history database.",
  },
  "exoplanets-nasa-orbital-periods": {
    hook: "Planetary years range from a blink to an orbit longer than a career. Log scale reveals variety without pretending it is one law.",
    detail: "Confirmed exoplanet orbital periods from the NASA Exoplanet Archive composite parameters table.",
  },
  "us-market-shock-waiting-times-french": {
    hook: "The market does not alternate neatly between calm and shock. Quiet stretches cluster, and so do the breaks.",
    detail: "Trading-day gaps between US market moves with an absolute return of at least 3%. The intervals are derived from real daily returns.",
  },
};

const storiesHu: Record<string, StoryCopy> = Object.fromEntries(
  Object.entries(storiesEn).map(([id, story]) => [
    id,
    {
      hook: story.hook,
      detail: story.detail,
    },
  ]),
);

const storiesRo: Record<string, StoryCopy> = Object.fromEntries(
  Object.entries(storiesEn).map(([id, story]) => [
    id,
    {
      hook: story.hook,
      detail: story.detail,
    },
  ]),
);

Object.assign(storiesHu, {
  "transit-headways-mbta-gtfs": {
    hook: "A menetrend rendet ígér. Rangsorba téve viszont a hézagok már megnyújtják ezt az ígéretet.",
    detail: "MBTA menetrendi követési idők az első megállónál. Ez tervezett szolgáltatás, nem mért utasvárakozás.",
  },
  "flight-delays-bts-2025-01": {
    hook: "A legtöbb késés csak bosszantó. A farokban kezdődik az a késés, amely átírja az egész napot.",
    detail: "Pozitív érkezési késések amerikai járatoknál, 2025 januárjában. A farok magassága azt mutatja, mekkora az esély legalább ekkora késésre.",
  },
  "taxi-trip-distances-nyc-tlc-2025-01": {
    hook: "New York többnyire rövid ugrásokban mozog. A reptéri és ritka hosszú utak külön történetet húznak ki ugyanabból a városból.",
    detail: "Több mint 3,3 millió érvényes sárga taxifuvar 2025 januárjából. A görbe nehéz farkú, de nem egyetlen tiszta törvény.",
  },
  "earthquakes-usgs-2025": {
    hook: "A kis földrengések megtöltik a listát. Az energia viszont máshol lakik: egy kis magnitúdóugrás már új skálát nyit.",
    detail: "Világszerte 2,5-ös vagy nagyobb magnitúdójú események 2025-ben. A relatív energia a jelentett magnitúdóból származik.",
  },
  "us-market-absolute-returns-french": {
    hook: "Normál tengelyen a piac fegyelmezettnek tűnik. Skálát váltva a nyugalom mögött hosszú sokkemlékezet jelenik meg.",
    detail: "Napi abszolút amerikai piaci hozamok a Kenneth French faktoridősorból. A diagram nagyságot mutat, nem irányt.",
  },
  "wildfires-mtbs-1984-2024": {
    hook: "Sok tűz a mérési küszöb közelében marad. Néhány viszont tájléptékű eseménnyé válik.",
    detail: "MTBS nagy amerikai erdőtűz- és vadterületi tűzhatárok 1984 és 2024 között.",
  },
  "storm-damage-noaa-2025": {
    hook: "A viharok száma lehet egyenletes. A kár nem az: a veszteség ott sűrűsödik, ahol a farok elkezdődik.",
    detail: "2025-ös amerikai viharesemények jelentett ingatlan- és terménykárai. A nulla és hiányzó kárértékek kimaradnak.",
  },
  "pollution-openmeteo-nyc-2025": {
    hook: "Az éves levegő elfogadhatónak tűnhet, miközben a rossz órák okozzák a bajt. Itt a skála segít, de a tartomány szűk.",
    detail: "Órás New York-i PM2.5-becslések 2025-re. A korlátozott tartomány gyengévé teszi a log-log állítást.",
  },
  "conflict-fatalities-ucdp-ged-26-1": {
    hook: "Az események száma nem azonos az elvesztett életek számával. A forma koncentrációt mutat, anélkül hogy elvenné a téma súlyát.",
    detail: "UCDP eseményszintű legjobb halálozási becslések 1989 és 2025 között. A nulla áldozatú rekordok kimaradnak.",
  },
  "household-net-worth-scf-2022": {
    hook: "A vagyon nem szelíden fogy el. A felső farok akkor is továbbmegy, amikor a hétköznapi háztartás már eltűnt a képről.",
    detail: "Pozitív amerikai háztartási nettó vagyon a 2022-es Survey of Consumer Finances alapján. A farokvalószínűségek és átlagok súlyozottak.",
  },
  "household-income-scf-2022": {
    hook: "A jövedelem is egyenlőtlen, de rövidebb ritmusban beszél, mint a felhalmozott vagyon. A skála ezt a különbséget teszi láthatóvá.",
    detail: "Pozitív 2022-es SCF jövedelem-megfigyelések súlyozott farokvalószínűségekkel.",
  },
  "household-assets-scf-2022": {
    hook: "Az eszközállomány az alig mérhetőtől olyan mérlegekig nyúlik, amelyek már más háztartási világot jelentenek.",
    detail: "Pozitív 2022-es SCF háztartási eszközök. A logaritmikus nézetek szükségképpen kizárják a nulla és negatív értékeket.",
  },
  "household-debt-scf-2022": {
    hook: "Az adósság is koncentrálódik, de nem a vagyon tükörképe. A forma más pénzügyi történetet mond.",
    detail: "Pozitív 2022-es SCF háztartási adósság súlyozott farokvalószínűségekkel.",
  },
  "country-gdp-worldbank-2024": {
    hook: "Az országok ugyanazon a térképen vannak, de nem ugyanazon a gazdasági skálán. Néhány gazdaság húzza a világkibocsátás nagy részét.",
    detail: "Ország-GDP folyó amerikai dollárban, 2024-re. A Világbank aggregált régiói kimaradnak.",
  },
  "firm-assets-sec-2026q1": {
    hook: "A tőzsdei cégek nem egyszerűen nagyobbak vagy kisebbek. A mérlegek rezsimeken mennek át, a kis bejelentőktől az óriásokig.",
    detail: "Összes eszköz az SEC 2026 Q1 Financial Statement Data Set éves jellegű bejelentéseiből.",
  },
  "bank-assets-fdic": {
    hook: "A bankrendszer koncentrációs gép. A legtöbb intézmény csak akkor válik láthatóvá, amikor az óriások már nem diktálják a tengelyt.",
    detail: "Aktív FDIC-biztosított intézmények összes eszköze, ezer dollárról dollárra átszámolva.",
  },
  "debt-securities-bis-2025q4": {
    hook: "A globális adósságpiac országlistának tűnik, amíg a skála meg nem mutatja, milyen kevés kibocsátó uralja az állományt.",
    detail: "Belföldi rezidensek által kibocsátott fennálló hitelpapírok 39 országra, 2025 Q4-ben.",
  },
  "city-populations-geonames": {
    hook: "A város egyetlen szó sok léptékre. Megavárosok és kis helyek csak akkor férnek össze, ha a tengely teret ad nekik.",
    detail: "Népességértékek a GeoNames cities15000 adatbázisból.",
  },
  "social-network-snap-facebook": {
    hook: "A legtöbb ember szerény fokszámú. Néhányan hubbá válnak, de a hajlás számít: a kapcsolat egyenetlen, nem varázslatosan skálafüggetlen.",
    detail: "Csomópont-fokszám a SNAP Facebook egyesített, irányítatlan él-listájából számolva.",
  },
  "word-frequency-gutenberg-moby-dick": {
    hook: "Egy regénynek több ezer szava van, de kevés szó viszi az áramot. A log-log nézet nyelvből szerkezetet rajzol.",
    detail: "Szógyakoriságok a Project Gutenberg Moby-Dick szövegéből. Ez a klasszikus rang-gyakorisági feltárás.",
  },
  "citations-openalex-2020-top": {
    hook: "A tudományos figyelemnek látképe van. Néhány munka olyan magasra emelkedik, hogy minden alatta lévőhöz új skálát ad.",
    detail: "Az 1000 legtöbbet idézett, 2020-ban megjelent OpenAlex-munka. Ez felső rangsori kivonat, nem a teljes korpusz.",
  },
  "wikipedia-pageviews-2025-12-31": {
    hook: "Milliónyi oldal elérhető. Egyetlen napon a figyelem mégis nagyon kevésnek adja az egész színpadot.",
    detail: "A 999 legnézettebb angol Wikipedia-cikk 2025. december 31-én.",
  },
  "open-source-downloads-pypi-2025-12": {
    hook: "A nyílt forrás kívülről széles világnak tűnik. A letöltések megmutatják, mennyi modern szoftver támaszkodik néhány csendes csomagra.",
    detail: "A 100 000 legtöbbet letöltött PyPI-csomagnév 2025 decemberében. Automatizált forgalom is szerepelhet.",
  },
  "species-observations-gbif-2025": {
    hook: "A megfigyelés nem azonos a gyakorisággal. Néhány faj uralja az adatbázist, sok más alig hagy nyomot.",
    detail: "Legmagasabb GBIF tudományosnév-előfordulási számok 2025-re. A rekordok nem a valós populációbőség becslései.",
  },
  "body-size-pantheria": {
    hook: "Az emlősök egy osztályba tartoznak, de nem egy testskálára. Egy egér és egy bálna csak logaritmussal fér ugyanarra a lapra.",
    detail: "Felnőtt testtömeg a PanTHERIA emlős életmenet-adatbázisból.",
  },
  "exoplanets-nasa-orbital-periods": {
    hook: "Egy bolygó éve lehet pillanatnyi, vagy hosszabb egy karriernél. A log skála változatosságot mutat, nem erőltet törvényt.",
    detail: "Megerősített exobolygók keringési periódusai a NASA Exoplanet Archive összetett paramétertáblájából.",
  },
  "us-market-shock-waiting-times-french": {
    hook: "A piac nem szabályosan váltogatja a nyugalmat és a sokkot. A csend is csomósodik, a törések is.",
    detail: "Kereskedési napok száma az amerikai piacon legalább 3%-os abszolút elmozdulások között. Az intervallumok valós napi hozamokból származnak.",
  },
});

Object.assign(storiesRo, {
  "transit-headways-mbta-gtfs": {
    hook: "Un orar promite ordine. Când pui golurile în clasament, promisiunea începe să se întindă.",
    detail: "Intervale MBTA programate la prima stație. Este serviciu planificat, nu timp de așteptare observat.",
  },
  "flight-delays-bts-2025-01": {
    hook: "Cele mai multe întârzieri sunt doar neplăcute. În coadă începe întârzierea care rescrie toată ziua.",
    detail: "Întârzieri pozitive la sosire pentru zboruri din SUA, ianuarie 2025. În coadă, înălțimea arată șansa unei întârzieri cel puțin atât de lungi.",
  },
  "taxi-trip-distances-nyc-tlc-2025-01": {
    hook: "New York se mișcă mai ales în salturi scurte. Curse spre aeroport și drumuri rare mai lungi scot o a doua poveste din aceeași rețea.",
    detail: "Peste 3,3 milioane de curse valide cu taxi galben din ianuarie 2025. Curba are coadă grea, dar nu este o singură lege curată.",
  },
  "earthquakes-usgs-2025": {
    hook: "Cutremurele mici umplu registrul. Energia nu. O mică schimbare de magnitudine mută lumea pe altă scară.",
    detail: "Evenimente globale de magnitudine 2,5+ în 2025. Energia relativă este derivată din magnitudinea raportată.",
  },
  "us-market-absolute-returns-french": {
    hook: "Pe o axă normală, piața pare disciplinată. Schimbă scala și calmul devine o memorie lungă a șocurilor.",
    detail: "Randamente zilnice absolute ale pieței SUA din seria de factori Kenneth French. Graficul arată magnitudinea, nu direcția.",
  },
  "wildfires-mtbs-1984-2024": {
    hook: "Multe incendii rămân lângă pragul de înregistrare. Câteva devin evenimente la scara peisajului.",
    detail: "Limite MTBS pentru incendii mari din SUA și folosire controlată a focului în sălbăticie, 1984-2024.",
  },
  "storm-damage-noaa-2025": {
    hook: "Numărul furtunilor poate părea democratic. Paguba nu este: pierderea se adună acolo unde începe coada.",
    detail: "Pagube raportate la proprietăți și culturi pentru furtuni din SUA în 2025. Înregistrările cu pagubă zero sau lipsă sunt excluse.",
  },
  "pollution-openmeteo-nyc-2025": {
    hook: "Aerul anual poate părea acceptabil, în timp ce orele rele produc efectul. Aici scala ajută, dar intervalul rămâne îngust.",
    detail: "Estimări orare PM2.5 pentru New York City în 2025. Intervalul limitat face slabă o afirmație log-log.",
  },
  "conflict-fatalities-ucdp-ged-26-1": {
    hook: "Numărul evenimentelor nu este numărul vieților pierdute. Forma arată concentrarea fără să diminueze greutatea subiectului.",
    detail: "Estimări UCDP la nivel de eveniment, 1989-2025. Înregistrările fără victime sunt omise.",
  },
  "household-net-worth-scf-2022": {
    hook: "Averea nu se stinge lin. Coada superioară continuă după ce gospodăria obișnuită a dispărut din imagine.",
    detail: "Avere netă pozitivă a gospodăriilor SUA în 2022 din Survey of Consumer Finances. Probabilitățile din coadă și mediile folosesc ponderi de sondaj.",
  },
  "household-income-scf-2022": {
    hook: "Venitul este inegal, dar vorbește într-un ritm mai scurt decât averea acumulată. Scala face diferența vizibilă.",
    detail: "Observații pozitive de venit SCF 2022, cu probabilități din coadă ponderate prin sondaj.",
  },
  "household-assets-scf-2022": {
    hook: "Activele merg de la aproape nimic la bilanțuri care par o altă specie de gospodărie.",
    detail: "Active pozitive ale gospodăriilor SCF 2022. Vederile logaritmice exclud inevitabil valorile zero și negative.",
  },
  "household-debt-scf-2022": {
    hook: "Datoria se concentrează și ea, dar nu este averea în oglindă. Forma spune o altă poveste financiară.",
    detail: "Datorie pozitivă a gospodăriilor SCF 2022, cu probabilități din coadă ponderate prin sondaj.",
  },
  "country-gdp-worldbank-2024": {
    hook: "Țările împart aceeași hartă, nu aceeași scară economică. Câteva economii trag o mare parte din linia producției globale.",
    detail: "PIB pe țări în dolari SUA curenți pentru 2024. Regiunile agregate ale Băncii Mondiale sunt excluse.",
  },
  "firm-assets-sec-2026q1": {
    hook: "Companiile publice nu sunt doar mai mari sau mai mici. Bilanțurile trec prin regimuri, de la raportări mici la giganți.",
    detail: "Active totale din raportări de tip anual în SEC 2026 Q1 Financial Statement Data Set.",
  },
  "bank-assets-fdic": {
    hook: "Sistemul bancar este o mașină de concentrare. Majoritatea instituțiilor apar doar după ce giganții nu mai dictează axa.",
    detail: "Active totale pentru instituții FDIC active și asigurate, convertite din mii de dolari în dolari.",
  },
  "debt-securities-bis-2025q4": {
    hook: "Piața globală a datoriei pare o listă de țări până când scala arată cât de puțini emitenți domină stocul.",
    detail: "Titluri de datorie restante emise de rezidenți pentru 39 de țări în 2025 Q4.",
  },
  "city-populations-geonames": {
    hook: "Oraș este un singur cuvânt pentru multe scări. Megalopolisuri și locuri mici coexistă doar dacă axa le face loc.",
    detail: "Valori de populație din baza de date GeoNames cities15000.",
  },
  "social-network-snap-facebook": {
    hook: "Majoritatea oamenilor au grad modest. Câțiva devin huburi, dar curbura contează: conexiunea e inegală, nu magic scale-free.",
    detail: "Gradul nodului calculat din lista de muchii nedirecționate SNAP Facebook combined.",
  },
  "word-frequency-gutenberg-moby-dick": {
    hook: "Un roman are mii de cuvinte, dar un vocabular mic duce curentul. Log-log transformă limba în arhitectură.",
    detail: "Numărări de cuvinte din ediția text Project Gutenberg a romanului Moby-Dick. Este revelația clasică rang-frecvență.",
  },
  "citations-openalex-2020-top": {
    hook: "Atenția științifică are orizont. Câteva lucrări se ridică atât de sus încât schimbă scala pentru tot ce vine sub ele.",
    detail: "Cele 1.000 de lucrări OpenAlex cele mai citate, publicate în 2020. Este un extract din vârful clasamentului, nu întregul corpus.",
  },
  "wikipedia-pageviews-2025-12-31": {
    hook: "Există milioane de pagini. Într-o singură zi, atenția alege foarte puține și le dă toată scena.",
    detail: "Top 999 articole Wikipedia în engleză după vizualizări la 31 decembrie 2025.",
  },
  "open-source-downloads-pypi-2025-12": {
    hook: "Open source pare vast din exterior. Descărcările arată cât software modern se sprijină pe câteva pachete tăcute.",
    detail: "Primele 100.000 de nume de pachete PyPI după descărcări în decembrie 2025. Traficul automat poate fi inclus.",
  },
  "species-observations-gbif-2025": {
    hook: "Observarea nu este abundență. Unele specii domină baza de date, multe altele abia lasă urmă.",
    detail: "Cele mai mari numere de apariții GBIF după nume științific pentru 2025. Înregistrările nu sunt estimări ale abundenței reale.",
  },
  "body-size-pantheria": {
    hook: "Mamiferele împart o clasă, nu o scară corporală. Un șoarece și o balenă au nevoie de logaritm ca să stea pe aceeași pagină.",
    detail: "Masa corporală adultă din baza PanTHERIA despre istoria vieții mamiferelor.",
  },
  "exoplanets-nasa-orbital-periods": {
    hook: "Anul unei planete poate fi o clipă sau mai lung decât o carieră. Scala log arată varietate fără să pretindă o singură lege.",
    detail: "Perioade orbitale ale exoplanetelor confirmate din tabelul de parametri compuși NASA Exoplanet Archive.",
  },
  "us-market-shock-waiting-times-french": {
    hook: "Piața nu alternează ordonat între calm și șoc. Liniștea se grupează, iar rupturile la fel.",
    detail: "Intervale în zile de tranzacționare între mișcări ale pieței SUA cu randament absolut de cel puțin 3%. Intervalele sunt derivate din randamente zilnice reale.",
  },
});

export const translations = {
  en: {
    languageName: "English",
    nav: {
      brand: "The Scale Button",
      story: "Story",
      button: "The button",
      chapters: "Chapters",
      atlas: "Atlas",
      compare: "Compare",
      sources: "Sources",
      caution: "Where scales fail",
      open: "Open",
      openNavigation: "Open navigation",
      closeNavigation: "Close navigation",
      skip: "Skip to the story",
      language: "Language",
      theme: "Switch color theme",
    },
    loading: {
      title: "Loading 27 Convex-backed datasets",
      detail: "Preparing rank curves, tails, and source notes.",
    },
    hero: {
      eyebrow: "Interactive data essay / Convex-backed data",
      title: "The Scale Button",
      thesis: "Same data. Different scale. Different world.",
      subtitle: "A guided experiment in what averages hide.",
      datasets: "datasets",
      datasetsDetail: "Real-world systems",
      scaleViews: "scale views",
      scaleViewsDetail: "See the full picture",
      sourceObservations: "source observations",
      chapters: "chapters",
      cta: "Begin the experiment",
      modePickerLabel: "Choose the transformed right side of the hero chart",
    },
    opening: {
      kicker: "The comfortable answer",
      title: "The average sounds calm.",
      lines: [
        "The average market day is calm.",
        "The average flight delay is manageable.",
        "The average city is not very large.",
      ],
      reveal: "But the average is not where the system ends.",
      revealStrong: "The story lives in the tail.",
    },
    machine: {
      index: "01 / The instrument",
      title: "One button. Four ways to see.",
      body: "The data stays fixed. The scale decides which part of reality gets enough room to speak.",
      visualStraightness: "Visual straightness",
      noDataset: "No dataset loaded.",
    },
    feature: {
      label: "Evidence theme",
      meaningPrefix: "Meaning",
      score: "Score",
      evidence: "Open the evidence",
      observations: "Observations",
      maximum: "Maximum",
      mean: "Mean",
      ordersOfRange: "Orders of range",
      largestObservations: "Largest observations",
    },
    scaleInsight: {
      activeScale: "Active scale",
      sourceNote: "Source note",
      templates: {
        linear: {
          title: "The biggest observation sets the scale.",
          body: "{topLabel} reaches {topValue}, about {multiple}x the mean. On a linear axis that one height forces most observations into the floor.",
          metric: "Top value vs mean: {multiple}x",
        },
        log: {
          title: "The middle becomes visible.",
          body: "The values span {orders} orders of magnitude. Log Y spends vertical space on ratios, so the middle is no longer crushed by the maximum.",
          metric: "Visible range: {orders} orders",
        },
        loglog: {
          title: "Structure shows up as shape, not size.",
          body: "If the line becomes close to straight, rank and value are changing by proportions. Here the visual straightness is {score}, so treat it as a clue rather than proof.",
          metric: "Straightness cue: {score}",
        },
        tail: {
          title: "The question changes to probability.",
          body: "At {threshold}, about {probability} of observations are at least that large. Tail view turns an extreme into a frequency you can reason about.",
          metric: "P(value >= {threshold}) = {probability}",
        },
      },
    },
    atlas: {
      index: "10 / Scope without overload",
      title: "The Scale Atlas",
      body: "The project contains 27 systems. Browse them by chapter, then use the same scale button to compare shape without losing the story.",
      all: "All",
      datasetsInView: "datasets in view",
      datasetsInChapter: "datasets in this chapter",
      visualStraightness: "visual straightness",
      filterLabel: "Filter datasets by chapter",
    },
    comparison: {
      index: "11 / All systems",
      title: "The comparison wall",
      body: "Every system in the same frame. The straightness score measures visual linearity in the selected coordinates; it is not a formal power-law test.",
      showingPrefix: "Showing",
      openWall: "Open the full comparison",
    },
    caution: {
      index: "12 / The necessary warning",
      title: "The button is a lens, not proof.",
      body: "Logarithms reveal range. They do not manufacture a law. These real examples stay curved, stepped, or structurally mixed when their axes change.",
      readCarefully: "Read this carefully",
      note: "A high straightness score can be a clue, never a verdict. Truncation, mixtures, measurement rules, discrete values, and finite samples can all make a line look persuasive. Formal power-law analysis needs model fitting and comparison against alternatives.",
    },
    sources: {
      index: "13 / Provenance",
      title: "Real data. Visible receipts.",
      body: "Every chart is backed by public source metadata imported into Convex with the chart points.",
      apaReference: "APA reference",
      dataAndCitations: "Data and citations",
    },
    closing: {
      kicker: "The result",
      title: "The world is not average.",
      copy: "It is uneven, clustered, bursty, and extreme.",
      sequence: {
        linear: "shows the giants.",
        log: "reveals the hidden middle.",
        loglog: "exposes possible structure.",
        tail: "shows what we should not ignore.",
      },
      finalA: "The data did not change.",
      finalB: "The scale did.",
      restart: "Run the experiment again",
    },
    footer: {
      built: "Built from public data imported into Convex.",
    },
    chart: {
      linearSide: "Linear",
      transformedSide: "Transformed",
      frequency: "Frequency",
      rank: "Rank",
      value: "Value",
      rawRank: "Rank (largest to smallest)",
      logRank: "Rank (largest to smallest, log scale)",
      logValue: "log scale",
      tailThreshold: "Threshold ({unit}, log scale)",
      tailProbability: "Probability at or above threshold (log scale)",
      atLeast: "At least",
    },
    scaleModes: {
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
    },
    chapters: {
      everyday: {
        title: "Everyday extremes",
        intro: "Schedules and averages describe a system. Delays, gaps, and long trips describe what a person actually encounters.",
      },
      risk: {
        title: "Risk has a tail",
        intro: "Most days are ordinary. Risk lives in the small share of observations that are not, where damage and consequence accumulate quickly.",
      },
      inequality: {
        title: "Inequality has a shape",
        intro: "Wealth, output, institutions, and cities do not simply differ. They occupy ranges so wide that the middle disappears on ordinary axes.",
      },
      attention: {
        title: "Attention has a tail",
        intro: "Language, research, knowledge, and software all distribute attention unevenly. A small number of names carry astonishing weight.",
      },
      life: {
        title: "Life and the universe on log scales",
        intro: "Logarithms are useful beyond power laws. They let organisms and planets separated by many orders of magnitude remain visible together.",
      },
      time: {
        title: "Time has a tail",
        intro: "Extremes are not only large things. They are also the uneven intervals between events: short bursts, long silences, then sudden movement.",
      },
    },
    evidenceGroups: {
      movement: {
        title: "Movement changes when the tail appears",
        intro: "Flights and taxi rides both look ordinary in the middle. Switch datasets and the question changes from typical movement to the moments that absorb attention, time, and cost.",
        switcherLabel: "Choose a movement evidence dataset",
      },
      physicalRisk: {
        title: "Risk is stored in rare energy",
        intro: "Earthquakes are a clean lesson in scale. Many events are small; the destructive meaning sits in the proportional jump that a linear chart flattens.",
        switcherLabel: "Choose a physical risk evidence dataset",
      },
      marketRisk: {
        title: "Markets remember shocks",
        intro: "Averages describe the normal trading day. These views show the size of moves and the uneven waiting time between them.",
        switcherLabel: "Choose a market risk evidence dataset",
      },
      householdEconomy: {
        title: "Money does not share one scale",
        intro: "Households and countries can sit in the same argument only when the scale gives space to the middle and still admits the giants.",
        switcherLabel: "Choose an economy and household evidence dataset",
      },
      institutionScale: {
        title: "Institutions concentrate quietly",
        intro: "Firms, banks, and debt markets look like lists until scale reveals the balance-sheet gravity at the top.",
        switcherLabel: "Choose an institutional scale evidence dataset",
      },
      urbanNetworks: {
        title: "Cities and networks form hubs",
        intro: "Population and connection both gather unevenly. The important question is not only who is largest, but how quickly the rest falls away.",
        switcherLabel: "Choose an urban or network evidence dataset",
      },
      attentionKnowledge: {
        title: "Attention chooses a few names",
        intro: "Pages, words, papers, and packages are all abundance systems. The scale button shows how a few items carry visibility for the whole field.",
        switcherLabel: "Choose an attention evidence dataset",
      },
      lifeScale: {
        title: "Life needs logarithms",
        intro: "Species records, mammal bodies, and planetary years span ranges too wide for ordinary axes. Log scale helps us see without claiming every curve is a law.",
        switcherLabel: "Choose a life-scale evidence dataset",
      },
    },
    stories: storiesEn,
    cautions: {
      "exoplanets-nasa-orbital-periods": {
        badge: "Log scale helps",
        text: "Planet periods span wild ranges, but the curve stays mixed. Useful visibility is not the same as a power law.",
      },
      "pollution-openmeteo-nyc-2025": {
        badge: "Range is limited",
        text: "PM2.5 spikes are important, yet this extract spans too little range for a clean scale-free reading.",
      },
      "taxi-trip-distances-nyc-tlc-2025-01": {
        badge: "Mixtures matter",
        text: "Local trips, airport trips, and unusual long journeys bend the curve into multiple regimes.",
      },
    },
    datasetTitles: datasetTitlesEn,
    categories: {
      Attention: "Attention",
      Economy: "Economy",
      Inequality: "Inequality",
      "Life and Universe": "Life and Universe",
      Mobility: "Mobility",
      Knowledge: "Knowledge",
      Risk: "Risk",
      Society: "Society",
      Time: "Time",
    },
    units: {
      acres: "acres",
      citations: "citations",
      connections: "connections",
      days: "days",
      downloads: "downloads",
      fatalities: "fatalities",
      grams: "grams",
      "micrograms per cubic meter": "micrograms per cubic meter",
      miles: "miles",
      minutes: "minutes",
      "occurrence records": "occurrence records",
      occurrences: "occurrences",
      people: "people",
      percent: "percent",
      "trading days": "trading days",
      "US dollars": "US dollars",
      "2022 US dollars": "2022 US dollars",
      views: "views",
      "10^(1.5 * magnitude)": "relative energy",
    },
  },
  hu: {
    languageName: "Magyar",
    nav: {
      brand: "A Skála Gomb",
      story: "Történet",
      button: "A gomb",
      chapters: "Fejezetek",
      atlas: "Atlasz",
      compare: "Összevetés",
      sources: "Források",
      caution: "Ahol a skála félrevezet",
      open: "Nyitás",
      openNavigation: "Navigáció megnyitása",
      closeNavigation: "Navigáció bezárása",
      skip: "Ugrás a történethez",
      language: "Nyelv",
      theme: "Színtéma váltása",
    },
    loading: {
      title: "27 Convex-adatkészlet betöltése",
      detail: "Ranggörbék, faroknézetek és forrásjegyzetek előkészítése.",
    },
    hero: {
      eyebrow: "Interaktív adatesszé / Convex-adatok",
      title: "A Skála Gomb",
      thesis: "Ugyanaz az adat. Más skála. Más világ.",
      subtitle: "Vezetett kísérlet arról, mit rejt el az átlag.",
      datasets: "adatkészlet",
      datasetsDetail: "Valós rendszerek",
      scaleViews: "skálanézet",
      scaleViewsDetail: "Lásd a teljes képet",
      sourceObservations: "forrásmegfigyelés",
      chapters: "fejezet",
      cta: "Kezdjük a kísérletet",
      modePickerLabel: "Válaszd ki a hősdiagram jobb oldali transzformált nézetét",
    },
    opening: {
      kicker: "A kényelmes válasz",
      title: "Az átlag nyugodtnak hangzik.",
      lines: [
        "Egy átlagos piaci nap nyugodt.",
        "Egy átlagos repülési késés kezelhető.",
        "Egy átlagos város nem különösebben nagy.",
      ],
      reveal: "De a rendszer nem ér véget az átlagnál.",
      revealStrong: "A történet a farokban él.",
    },
    machine: {
      index: "01 / Az eszköz",
      title: "Egy gomb. Négy látásmód.",
      body: "Az adat nem változik. A skála dönti el, a valóság melyik része kap elég helyet megszólalni.",
      visualStraightness: "Vizuális egyenesség",
      noDataset: "Nincs betöltött adatkészlet.",
    },
    feature: {
      label: "Bizonyítéktéma",
      meaningPrefix: "Jelentés",
      score: "Pontszám",
      evidence: "Bizonyíték megnyitása",
      observations: "Megfigyelések",
      maximum: "Maximum",
      mean: "Átlag",
      ordersOfRange: "Nagyságrendi tartomány",
      largestObservations: "Legnagyobb megfigyelések",
    },
    scaleInsight: {
      activeScale: "Aktív skála",
      sourceNote: "Forrásjegyzet",
      templates: {
        linear: {
          title: "A legnagyobb megfigyelés szabja meg a skálát.",
          body: "{topLabel} értéke {topValue}, nagyjából {multiple}x az átlag. Lineáris tengelyen ez az egy magasság a legtöbb pontot a padlóhoz nyomja.",
          metric: "Csúcsérték az átlaghoz képest: {multiple}x",
        },
        log: {
          title: "A közép láthatóvá válik.",
          body: "Az értékek {orders} nagyságrendet fognak át. A Log Y az arányoknak ad függőleges teret, így a közepet nem nyomja össze a maximum.",
          metric: "Látható tartomány: {orders} nagyságrend",
        },
        loglog: {
          title: "A szerkezet alakban jelenik meg.",
          body: "Ha a vonal közel egyenes, a rang és az érték arányos változásokkal mozog. Itt a vizuális egyenesség {score}; ez jel, nem bizonyíték.",
          metric: "Egyenességi jel: {score}",
        },
        tail: {
          title: "A kérdés valószínűségre vált.",
          body: "{threshold} küszöbnél a megfigyelések körülbelül {probability} része legalább ekkora. A faroknézet a szélsőséget értelmezhető gyakorisággá alakítja.",
          metric: "P(érték >= {threshold}) = {probability}",
        },
      },
    },
    atlas: {
      index: "10 / Terjedelem túlterhelés nélkül",
      title: "A Skála Atlasz",
      body: "A projekt 27 rendszert tartalmaz. Böngéssz fejezetenként, majd ugyanazzal a skálagombbal hasonlítsd össze az alakjukat.",
      all: "Mind",
      datasetsInView: "adatkészlet látszik",
      datasetsInChapter: "adatkészlet ebben a fejezetben",
      visualStraightness: "vizuális egyenesség",
      filterLabel: "Adatkészletek szűrése fejezet szerint",
    },
    comparison: {
      index: "11 / Minden rendszer",
      title: "Az összehasonlító fal",
      body: "Minden rendszer ugyanabban a keretben. Az egyenességi pontszám a választott koordinátákban mért vizuális linearitás, nem formális power-law teszt.",
      showingPrefix: "Megjelenítve",
      openWall: "Teljes összehasonlítás megnyitása",
    },
    caution: {
      index: "12 / A szükséges figyelmeztetés",
      title: "A gomb lencse, nem bizonyíték.",
      body: "A logaritmus tartományt fed fel. Nem gyárt törvényt. Ezek a valós példák görbülnek, lépcsőznek vagy keverednek, amikor tengelyt váltunk.",
      readCarefully: "Ezt olvasd el figyelmesen",
      note: "A magas egyenességi pontszám jel lehet, soha nem ítélet. Csonkolás, keveredés, mérési szabályok, diszkrét értékek és véges minták mind meggyőző vonalat rajzolhatnak. A formális power-law elemzés modellezést és alternatívák összevetését igényli.",
    },
    sources: {
      index: "13 / Eredet",
      title: "Valós adatok. Látható források.",
      body: "Minden diagramhoz nyilvános forrásmetaadat tartozik, amely a pontokkal együtt került Convexbe.",
      apaReference: "APA-hivatkozás",
      dataAndCitations: "Adatok és hivatkozások",
    },
    closing: {
      kicker: "Az eredmény",
      title: "A világ nem átlagos.",
      copy: "Egyenetlen, csomósodó, robbanékony és szélsőséges.",
      sequence: {
        linear: "megmutatja az óriásokat.",
        log: "feltárja a rejtett közepet.",
        loglog: "láthatóvá teszi a lehetséges szerkezetet.",
        tail: "megmutatja, mit nem hagyhatunk figyelmen kívül.",
      },
      finalA: "Az adat nem változott.",
      finalB: "A skála változott.",
      restart: "Futtasd újra a kísérletet",
    },
    footer: {
      built: "Nyilvános adatokból építve, Convexbe importálva.",
    },
    chart: {
      linearSide: "Lineáris",
      transformedSide: "Transzformált",
      frequency: "Gyakoriság",
      rank: "Rang",
      value: "Érték",
      rawRank: "Rang (legnagyobbtól a legkisebbig)",
      logRank: "Rang (legnagyobbtól a legkisebbig, log skála)",
      logValue: "log skála",
      tailThreshold: "Küszöb ({unit}, log skála)",
      tailProbability: "Küszöb feletti valószínűség (log skála)",
      atLeast: "Legalább",
    },
    scaleModes: {
      linear: {
        label: "Lineáris",
        shortLabel: "Lineáris",
        question: "Mi uralja a képet?",
        summary: "Nyers rang és nyers érték",
      },
      log: {
        label: "Log Y",
        shortLabel: "Log",
        question: "Mi volt elrejtve?",
        summary: "Nyers rang és logaritmikus érték",
      },
      loglog: {
        label: "Log-log",
        shortLabel: "Log-log",
        question: "Van skálaszerkezet?",
        summary: "Logaritmikus rang és érték",
      },
      tail: {
        label: "Farok",
        shortLabel: "Farok",
        question: "Milyen gyakori a szélsőség?",
        summary: "Logaritmikus érték és farokvalószínűség",
      },
    },
    chapters: {
      everyday: {
        title: "Mindennapi szélsőségek",
        intro: "A menetrendek és átlagok rendszert írnak le. A késések, rések és hosszú utak azt, amit az ember valóban megtapasztal.",
      },
      risk: {
        title: "A kockázatnak farka van",
        intro: "A legtöbb nap hétköznapi. A kockázat abban a kis részben él, ahol a kár és a következmény gyorsan összegyűlik.",
      },
      inequality: {
        title: "Az egyenlőtlenségnek alakja van",
        intro: "A vagyon, termelés, intézmények és városok nem csak különböznek. Olyan tartományokat töltenek ki, ahol a közép eltűnik.",
      },
      attention: {
        title: "A figyelemnek farka van",
        intro: "Nyelv, kutatás, tudás és szoftver mind egyenetlenül osztja el a figyelmet. Kevés név elképesztő súlyt hordoz.",
      },
      life: {
        title: "Élet és univerzum log skálán",
        intro: "A logaritmus nem csak power-law esetben hasznos. Nagyságrendekkel eltérő élőlényeket és bolygókat tud együtt láthatóvá tenni.",
      },
      time: {
        title: "Az időnek farka van",
        intro: "A szélsőség nem csak nagy méret. Az események közti egyenetlen idő is: rövid kitörések, hosszú csendek, majd hirtelen mozgás.",
      },
    },
    evidenceGroups: {
      movement: {
        title: "A mozgás megváltozik, amikor látszik a farok",
        intro: "A járatok és taxik középen hétköznapinak tűnnek. Válts adatkészletet, és a kérdés a tipikus útról azokra a pillanatokra kerül, amelyek időt, figyelmet és költséget nyelnek el.",
        switcherLabel: "Mozgási bizonyítékadat kiválasztása",
      },
      physicalRisk: {
        title: "A kockázat ritka energiában tárolódik",
        intro: "A földrengés tiszta skálalecke. Sok esemény kicsi; a romboló jelentés abban az arányos ugrásban van, amelyet a lineáris diagram ellapít.",
        switcherLabel: "Fizikai kockázati bizonyítékadat kiválasztása",
      },
      marketRisk: {
        title: "A piac emlékszik a sokkokra",
        intro: "Az átlag a normál kereskedési napot írja le. Ezek a nézetek a mozgások méretét és a köztük lévő egyenetlen várakozást mutatják.",
        switcherLabel: "Piaci kockázati bizonyítékadat kiválasztása",
      },
      householdEconomy: {
        title: "A pénz nem egy skálán oszlik el",
        intro: "Háztartások és országok csak akkor ülnek egy érvelésben, ha a skála helyet ad a középnek, miközben az óriásokat sem rejti el.",
        switcherLabel: "Gazdasági és háztartási bizonyítékadat kiválasztása",
      },
      institutionScale: {
        title: "Az intézmények csendben koncentrálnak",
        intro: "Cégek, bankok és adósságpiacok listának tűnnek, amíg a skála meg nem mutatja a mérlegek felső gravitációját.",
        switcherLabel: "Intézményi skála bizonyítékadat kiválasztása",
      },
      urbanNetworks: {
        title: "A városok és hálózatok hubokat formálnak",
        intro: "A népesség és a kapcsolat is egyenetlenül gyűlik. Nem csak az számít, ki a legnagyobb, hanem az is, milyen gyorsan esik le a többi.",
        switcherLabel: "Városi vagy hálózati bizonyítékadat kiválasztása",
      },
      attentionKnowledge: {
        title: "A figyelem kevés nevet választ",
        intro: "Oldalak, szavak, cikkek és csomagok mind bőségrendszerek. A skálagomb megmutatja, hogyan viszi néhány elem a teljes mező láthatóságát.",
        switcherLabel: "Figyelmi bizonyítékadat kiválasztása",
      },
      lifeScale: {
        title: "Az élethez logaritmus kell",
        intro: "Fajrekordok, emlőstestek és bolygóévek túl széles tartományt fednek le a hétköznapi tengelyekhez. A log skála segít látni, de nem állítja, hogy minden görbe törvény.",
        switcherLabel: "Életléptékű bizonyítékadat kiválasztása",
      },
    },
    stories: storiesHu,
    cautions: {
      "exoplanets-nasa-orbital-periods": {
        badge: "A log skala segit",
        text: "A bolygók keringési ideje hatalmas tartományt fed le, de a görbe kevert marad. A láthatóság nem ugyanaz, mint egy törvény.",
      },
      "pollution-openmeteo-nyc-2025": {
        badge: "Korlátozott tartomány",
        text: "A PM2.5-kiugrások fontosak, de ez a kivonat túl kis tartományt fed le egy tiszta skálaolvasathoz.",
      },
      "taxi-trip-distances-nyc-tlc-2025-01": {
        badge: "A keveredés számít",
        text: "Helyi utak, reptéri utak és ritka hosszú utazások több rezsimre hajlítják a görbét.",
      },
    },
    datasetTitles: datasetTitlesHu,
    categories: {
      Attention: "Figyelem",
      Economy: "Gazdaság",
      Inequality: "Egyenlőtlenség",
      "Life and Universe": "Élet és univerzum",
      Mobility: "Mobilitás",
      Knowledge: "Tudás",
      Risk: "Kockázat",
      Society: "Társadalom",
      Time: "Idő",
    },
    units: {
      acres: "acre",
      citations: "hivatkozás",
      connections: "kapcsolat",
      days: "nap",
      downloads: "letöltés",
      fatalities: "halálos áldozat",
      grams: "gramm",
      "micrograms per cubic meter": "mikrogramm/köbméter",
      miles: "mérföld",
      minutes: "perc",
      "occurrence records": "előfordulási rekord",
      occurrences: "előfordulás",
      people: "fő",
      percent: "százalék",
      "trading days": "kereskedési nap",
      "US dollars": "USA-dollar",
      "2022 US dollars": "2022-es USA-dollar",
      views: "megtekintés",
      "10^(1.5 * magnitude)": "relatív energia",
    },
  },
  ro: {
    languageName: "Română",
    nav: {
      brand: "Butonul de Scală",
      story: "Poveste",
      button: "Butonul",
      chapters: "Capitole",
      atlas: "Atlas",
      compare: "Compară",
      sources: "Surse",
      caution: "Unde scala înșală",
      open: "Deschide",
      openNavigation: "Deschide navigarea",
      closeNavigation: "Închide navigarea",
      skip: "Sari la poveste",
      language: "Limbă",
      theme: "Schimbă tema de culoare",
    },
    loading: {
      title: "Se încarcă 27 de seturi de date din Convex",
      detail: "Pregătim curbe de rang, cozi și note despre surse.",
    },
    hero: {
      eyebrow: "Eseu interactiv de date / date Convex",
      title: "Butonul de Scală",
      thesis: "Aceleași date. Altă scală. Altă lume.",
      subtitle: "Un experiment ghidat despre ce ascund mediile.",
      datasets: "seturi de date",
      datasetsDetail: "Sisteme reale",
      scaleViews: "vederi de scală",
      scaleViewsDetail: "Vezi imaginea completă",
      sourceObservations: "observații sursă",
      chapters: "capitole",
      cta: "Începe experimentul",
      modePickerLabel: "Alege partea dreaptă transformată a graficului erou",
    },
    opening: {
      kicker: "Răspunsul comod",
      title: "Media sună calm.",
      lines: [
        "O zi medie de piață este calmă.",
        "O întârziere medie de zbor este gestionabilă.",
        "Un oraș mediu nu este foarte mare.",
      ],
      reveal: "Dar sistemul nu se termină la medie.",
      revealStrong: "Povestea trăiește în coadă.",
    },
    machine: {
      index: "01 / Instrumentul",
      title: "Un buton. Patru moduri de a vedea.",
      body: "Datele rămân fixe. Scala decide ce parte din realitate primește destul loc ca să vorbească.",
      visualStraightness: "Rectitudine vizuală",
      noDataset: "Nu este încărcat niciun set de date.",
    },
    feature: {
      label: "Temă de dovezi",
      meaningPrefix: "Sens",
      score: "Scor",
      evidence: "Deschide dovezile",
      observations: "Observații",
      maximum: "Maxim",
      mean: "Medie",
      ordersOfRange: "Ordine de mărime",
      largestObservations: "Cele mai mari observații",
    },
    scaleInsight: {
      activeScale: "Scala activă",
      sourceNote: "Nota sursei",
      templates: {
        linear: {
          title: "Cea mai mare observație stabilește scala.",
          body: "{topLabel} ajunge la {topValue}, cam {multiple}x media. Pe axa liniară, această înălțime împinge majoritatea observațiilor spre podea.",
          metric: "Valoare maximă față de medie: {multiple}x",
        },
        log: {
          title: "Mijlocul devine vizibil.",
          body: "Valorile acoperă {orders} ordine de mărime. Log Y alocă spațiu vertical rapoartelor, așa că mijlocul nu mai este zdrobit de maxim.",
          metric: "Interval vizibil: {orders} ordine",
        },
        loglog: {
          title: "Structura apare ca formă, nu ca mărime.",
          body: "Dacă linia devine aproape dreaptă, rangul și valoarea se schimbă proporțional. Aici rectitudinea vizuală este {score}, deci este indiciu, nu dovadă.",
          metric: "Indiciu de rectitudine: {score}",
        },
        tail: {
          title: "Întrebarea devine probabilitate.",
          body: "La {threshold}, aproximativ {probability} dintre observații sunt cel puțin atât de mari. Vederea cozii transformă extrema într-o frecvență interpretabilă.",
          metric: "P(valoare >= {threshold}) = {probability}",
        },
      },
    },
    atlas: {
      index: "10 / Arie fără aglomerare",
      title: "Atlasul Scalelor",
      body: "Proiectul conține 27 de sisteme. Răsfoiește-le pe capitole, apoi folosește același buton de scală ca să compari forma.",
      all: "Toate",
      datasetsInView: "seturi de date vizibile",
      datasetsInChapter: "seturi de date în acest capitol",
      visualStraightness: "rectitudine vizuală",
      filterLabel: "Filtrează seturile de date după capitol",
    },
    comparison: {
      index: "11 / Toate sistemele",
      title: "Peretele de comparație",
      body: "Fiecare sistem în același cadru. Scorul de rectitudine măsoară linearitatea vizuală în coordonatele selectate; nu este un test formal de lege de putere.",
      showingPrefix: "Se afișează",
      openWall: "Deschide comparația completă",
    },
    caution: {
      index: "12 / Avertismentul necesar",
      title: "Butonul este o lentilă, nu o dovadă.",
      body: "Logaritmii dezvăluie intervale. Nu fabrică o lege. Aceste exemple reale rămân curbate, în trepte sau amestecate când axele se schimbă.",
      readCarefully: "Citește cu atenție",
      note: "Un scor mare de rectitudine poate fi un indiciu, niciodată un verdict. Trunchierea, amestecurile, regulile de măsurare, valorile discrete și eșantioanele finite pot face o linie să pară convingătoare. Analiza formală are nevoie de potrivire de model și comparație cu alternative.",
    },
    sources: {
      index: "13 / Proveniență",
      title: "Date reale. Surse vizibile.",
      body: "Fiecare grafic este susținut de metadate publice de sursă importate în Convex împreună cu punctele.",
      apaReference: "Referință APA",
      dataAndCitations: "Date și citări",
    },
    closing: {
      kicker: "Rezultatul",
      title: "Lumea nu este medie.",
      copy: "Este inegală, grupată, explozivă și extremă.",
      sequence: {
        linear: "arată giganții.",
        log: "dezvăluie mijlocul ascuns.",
        loglog: "expune o posibilă structură.",
        tail: "arată ce nu trebuie ignorat.",
      },
      finalA: "Datele nu s-au schimbat.",
      finalB: "Scala s-a schimbat.",
      restart: "Rulează din nou experimentul",
    },
    footer: {
      built: "Construit din date publice importate în Convex.",
    },
    chart: {
      linearSide: "Liniar",
      transformedSide: "Transformat",
      frequency: "Frecvență",
      rank: "Rang",
      value: "Valoare",
      rawRank: "Rang (de la cel mai mare la cel mai mic)",
      logRank: "Rang (de la cel mai mare la cel mai mic, scală log)",
      logValue: "scală log",
      tailThreshold: "Prag ({unit}, scală log)",
      tailProbability: "Probabilitate la prag sau peste (scală log)",
      atLeast: "Cel puțin",
    },
    scaleModes: {
      linear: {
        label: "Liniar",
        shortLabel: "Liniar",
        question: "Ce domină?",
        summary: "Rang brut și valoare brută",
      },
      log: {
        label: "Log Y",
        shortLabel: "Log",
        question: "Ce era ascuns?",
        summary: "Rang brut și valoare logaritmică",
      },
      loglog: {
        label: "Log-log",
        shortLabel: "Log-log",
        question: "Există structură de scală?",
        summary: "Rang și valoare logaritmice",
      },
      tail: {
        label: "Coada",
        shortLabel: "Coada",
        question: "Cât de des apar extremele?",
        summary: "Valoare logaritmică și probabilitate de coadă",
      },
    },
    chapters: {
      everyday: {
        title: "Extreme cotidiene",
        intro: "Orarele și mediile descriu un sistem. Întârzierile, golurile și drumurile lungi descriu ce trăiește o persoană.",
      },
      risk: {
        title: "Riscul are coadă",
        intro: "Cele mai multe zile sunt obișnuite. Riscul trăiește în mica parte de observații în care pagubele și consecințele se acumulează rapid.",
      },
      inequality: {
        title: "Inegalitatea are formă",
        intro: "Averea, producția, instituțiile și orașele nu doar diferă. Ocupă intervale atât de largi încât mijlocul dispare pe axe obișnuite.",
      },
      attention: {
        title: "Atenția are coadă",
        intro: "Limba, cercetarea, cunoașterea și software-ul distribuie atenția inegal. Câteva nume poartă o greutate uriașă.",
      },
      life: {
        title: "Viața și universul pe scale log",
        intro: "Logaritmii sunt utili dincolo de legile de putere. Fac vizibile împreună organisme și planete separate de multe ordine de mărime.",
      },
      time: {
        title: "Timpul are coadă",
        intro: "Extremele nu sunt doar lucruri mari. Sunt și intervalele inegale dintre evenimente: izbucniri scurte, tăceri lungi, apoi mișcare bruscă.",
      },
    },
    evidenceGroups: {
      movement: {
        title: "Mișcarea se schimbă când apare coada",
        intro: "Zborurile și taxiurile par obișnuite la mijloc. Schimbă setul de date și întrebarea trece de la traseul tipic la momentele care consumă timp, atenție și cost.",
        switcherLabel: "Alege un set de dovezi despre mișcare",
      },
      physicalRisk: {
        title: "Riscul stă în energia rară",
        intro: "Cutremurele sunt o lecție curată de scală. Multe evenimente sunt mici; sensul distructiv stă în saltul proporțional pe care graficul liniar îl aplatizează.",
        switcherLabel: "Alege un set de dovezi despre risc fizic",
      },
      marketRisk: {
        title: "Piețele își amintesc șocurile",
        intro: "Mediile descriu ziua normală de tranzacționare. Aceste vederi arată mărimea mișcărilor și așteptarea inegală dintre ele.",
        switcherLabel: "Alege un set de dovezi despre risc de piață",
      },
      householdEconomy: {
        title: "Banii nu împart o singură scală",
        intro: "Gospodăriile și țările pot sta în aceeași argumentație doar când scala lasă loc mijlocului și totuși nu ascunde giganții.",
        switcherLabel: "Alege un set de dovezi despre economie și gospodării",
      },
      institutionScale: {
        title: "Instituțiile se concentrează în liniște",
        intro: "Firmele, băncile și piețele datoriei par liste până când scala dezvăluie gravitația bilanțurilor din vârf.",
        switcherLabel: "Alege un set de dovezi despre scara instituțiilor",
      },
      urbanNetworks: {
        title: "Orașele și rețelele formează huburi",
        intro: "Populația și conexiunea se adună inegal. Nu contează doar cine este cel mai mare, ci și cât de repede cade restul.",
        switcherLabel: "Alege un set de dovezi despre orașe sau rețele",
      },
      attentionKnowledge: {
        title: "Atenția alege puține nume",
        intro: "Pagini, cuvinte, lucrări și pachete sunt sisteme de abundență. Butonul de scală arată cum câteva elemente poartă vizibilitatea întregului câmp.",
        switcherLabel: "Alege un set de dovezi despre atenție",
      },
      lifeScale: {
        title: "Viața are nevoie de logaritmi",
        intro: "Înregistrările de specii, corpurile mamiferelor și anii planetari acoperă intervale prea largi pentru axe obișnuite. Scala log ajută să vedem fără să pretindem că fiecare curbă este o lege.",
        switcherLabel: "Alege un set de dovezi despre scara vieții",
      },
    },
    stories: storiesRo,
    cautions: {
      "exoplanets-nasa-orbital-periods": {
        badge: "Scala log ajută",
        text: "Perioadele planetelor acoperă intervale uriașe, dar curba rămâne amestecată. Vizibilitatea utilă nu este același lucru cu o lege.",
      },
      "pollution-openmeteo-nyc-2025": {
        badge: "Interval limitat",
        text: "Vârfurile PM2.5 sunt importante, dar acest extras acoperă un interval prea mic pentru o lectură curată de scală.",
      },
      "taxi-trip-distances-nyc-tlc-2025-01": {
        badge: "Amestecurile contează",
        text: "Cursele locale, cursele spre aeroport și călătoriile lungi rare îndoaie curba în mai multe regimuri.",
      },
    },
    datasetTitles: datasetTitlesRo,
    categories: {
      Attention: "Atenție",
      Economy: "Economie",
      Inequality: "Inegalitate",
      "Life and Universe": "Viață și univers",
      Mobility: "Mobilitate",
      Knowledge: "Cunoaștere",
      Risk: "Risc",
      Society: "Societate",
      Time: "Timp",
    },
    units: {
      acres: "acri",
      citations: "citări",
      connections: "conexiuni",
      days: "zile",
      downloads: "descărcări",
      fatalities: "victime",
      grams: "grame",
      "micrograms per cubic meter": "micrograme pe metru cub",
      miles: "mile",
      minutes: "minute",
      "occurrence records": "înregistrări de apariție",
      occurrences: "apariții",
      people: "persoane",
      percent: "procent",
      "trading days": "zile de tranzacționare",
      "US dollars": "dolari SUA",
      "2022 US dollars": "dolari SUA 2022",
      views: "vizualizări",
      "10^(1.5 * magnitude)": "energie relativă",
    },
  },
} satisfies Record<Language, Translation>;

export const languageLocales: Record<Language, string> = {
  en: "en",
  hu: "hu-HU",
  ro: "ro-RO",
};
